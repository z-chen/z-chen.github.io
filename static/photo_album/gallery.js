var active_photo_set;
var photo_sets;
var gallery, photobox, photobox_container;
var collectionsToShow = ["Moab", "Yosemite", "California", "Animals", "Travel"]

Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};

function debounce(func, timeout=25){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}  

function loadAllImages() {
    const imageList = photo_sets[active_photo_set];
    document.querySelectorAll('.figure').forEach(n => n.remove());
    for (var index=0; index < imageList.length; index++) {
        gallery.appendChild(createGalleryTile(imageList[index], index));
    }
}

function openPhotobox(index, src) {
    return () => {
        activatePhotoBox(index, src);
    }        
}

function createGalleryTile(imageData, index) {
    var div = document.createElement("div");
    div.classList = ['figure'];
    var img = document.createElement("img");
    img.style.opacity = 0;
    img.onload = onGalleryImageLoaded(img);
    img.src = imageData['src'];
    div.appendChild(img);
    div.addEventListener('click', openPhotobox(index, div));
    return div;
}

function resize_gallery_tile(element) {
    const aspect_ratio = element.naturalWidth / element.naturalHeight;
    const parent = element.parentElement;
        
    if (aspect_ratio > 3) {  // Pano
       parent.classList.add('pano');
    } else if (aspect_ratio > 2) { // Long
        parent.classList.add('long');
    } else if (aspect_ratio > 1) { // Landscape
       parent.classList.add('landscape');
    } else {
       parent.classList.add('portrait');
    }
    num_cols = parseInt(getComputedStyle(parent)['grid-column-end'].slice(5));
    num_rows_spanned = Math.ceil(num_cols / (aspect_ratio * 0.95));
    parent.style['grid-row'] = 'auto / span ' + num_rows_spanned        

}

function onGalleryImageLoaded(element) {
    return () => {        
        element.className = "crossfade-image";
        element.style.opacity = 1;
        element.style['display'] = 'block';
        resize_gallery_tile(element);
    }
}

function activatePhotoBox(index, src) {
    var rect = src.getBoundingClientRect();

    photobox.dataset.index = index;
    const imageData = photo_sets[active_photo_set][index];
    const img = document.createElement("img");
    const img_fill = document.createElement("img");
    const title_element = document.createElement("div");

    title_element.className = "title";

    img.classList.add("photobox-display")
    img.style['transform'] = "translate(" + rect.left + "px, " + rect.top + "px)";
    img.onload = onPhotoboxLoaded(imageData, img, false);
    img.src = imageData['src'];

    img_fill.classList.add("photobox-fill")
    img_fill.style['transform'] = "translate(" + rect.left + "px, " + rect.top + "px)";
    img_fill.onload = onPhotoboxLoaded(imageData, img_fill, true);
    img_fill.src = imageData['src'];

    photobox_container.replaceChildren(img_fill, img, title_element);
    // photobox_container.replaceChildren(img_fill, title_element);
}

function resize_photobox_display(element) {
    dismiss_btn = photobox.querySelector('.dismiss-btn');
    if (element.naturalWidth / element.naturalHeight > photobox.clientWidth / photobox.clientHeight) {
        var old_height = photobox.clientHeight;
        var new_height = (element.naturalHeight / element.naturalWidth) * photobox.clientWidth;
        element.style["width"] = photobox.clientWidth;
        element.style["height"] = new_height + "px";
        element.style['margin-top'] = ((old_height - new_height) / 2) + "px";
        dismiss_btn.style['top'] = (((old_height - new_height) / 2) + 20) + "px";
        element.style['margin-left'] = 0;
        dismiss_btn.style['right'] = "20px";
        element.style['mask-image'] = "linear-gradient(rgba(0, 0, 0, 0.8) 0%, black 10%, black 90%, rgba(0, 0, 0, 0.8) 100%)";
    } else {
        var old_width = photobox.clientWidth;
        var new_width = (element.naturalWidth / element.naturalHeight) * photobox.clientHeight;
        element.style["width"] = new_width + "px";
        element.style["height"] = photobox.clientHeight;
        element.style['margin-left'] = ((old_width - new_width) / 2) + "px";
        dismiss_btn.style['right'] = (((old_width - new_width) / 2) + 20) + "px";
        element.style['margin-top'] = 0;
        dismiss_btn.style['top'] = "20px";
        element.style['mask-image'] = "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, black 10%, black 90%, rgba(0, 0, 0, 0.8) 100%)";
    }
}

function onPhotoboxLoaded(imageData, element, is_fill) {
    return () => {
        element.style['transform'] = "translate(0, 0)";        
        if (!is_fill) {
            if (photobox.classList.contains("hidden")) {
                toggleHide(photobox);
                // toggleHide(gallery);        
            }
            resize_photobox_display(element);
            var title = imageData.title;
            if (title) {
                const title_element = photobox_container.querySelector('.title');
                title_element.innerHTML = title;
                title_element.style.display = "initial";
            }
        } else {
            element.addEventListener('click', () => {toggleHide(photobox)});
        }
        element.classList.add("loaded");
    }
}

// Album selector
function setPhotoList(photosets, photo_set_key) {
    active_photo_set = photo_set_key;
}

function initializeSelector(photosets, active_photo_set) {
    let selector_elem;
    let active_elem;
    for (var i = 0; i < collectionsToShow.length; i++) {
        var key = collectionsToShow[i];
        selector_elem = document.createElement('div');
        selector_elem.classList.add('selector-item');
        selector_elem.innerHTML = key;
        if (key === active_photo_set){
            active_elem = selector_elem;
        } else {
            document.querySelector('.selector').appendChild(selector_elem);
        }
    }
    if (active_elem !== undefined) {
        document.querySelector('.selector').prepend(active_elem);
    }
    return collectionsToShow[0];
}

function handleSelectorClick(e) {
    let parent = e.target.parentNode;
    let widget = parent.parentNode;
    if (!parent.classList.contains('open') && !e.target.classList.contains('active')) {
        return;
    }

    // Made selection
    if (parent.classList.contains('open') && !e.target.classList.contains('active')) {
        var photo_set_key = e.target.innerHTML;
        document.querySelector('.selector .selector-item.active').classList.remove('active');
        let new_elem = e.target.cloneNode(true);
        new_elem.classList.add('active');
        new_elem.addEventListener('click', handleSelectorClick);
        e.target.remove();
        setPhotoList(photo_sets, photo_set_key);
        parent.prepend(new_elem);
        loadAllImages();
    }

    // Toggle menu
    if (parent.classList.contains('open')) {
        parent.classList.remove('open');
        document.querySelector('.screen').classList.remove('active');
    } else {
        parent.classList.add('open');
        document.querySelector('.screen').classList.add('active');
    }
}

function toggleHide(elem) {
    if (elem.classList.contains('hidden')) {
        elem.classList.remove('hidden');
        document.body.style['overflow'] = 'hidden';
        document.body.style['overflow-x'] = 'inherit';
    } else {
        elem.classList.add('hidden');
        document.body.style['overflow'] = 'visible';
    }
}

// Load images
window.addEventListener('load', function () {
    photobox = document.getElementsByClassName('photobox')[0];
    gallery = document.getElementsByClassName('gallery')[0];
    fetch('assets/photos/manifest.json')
      .then(response => response.json())
      .then(data => {
            photo_sets = data;
            if(window.location.hash) {
                active_photo_set = window.location.hash.slice(1);
                initializeSelector(photo_sets, active_photo_set);
            } else {
                active_photo_set = initializeSelector(photo_sets);
            }

            setPhotoList(photo_sets, active_photo_set);
            document.querySelectorAll('.selector .selector-item').forEach(
                elem => {elem.addEventListener('click', handleSelectorClick, false)});
            document.querySelectorAll('.selector .selector-item').forEach(
                elem => { if (elem.innerHTML == active_photo_set) elem.classList.add('active'); });
                
            document.querySelector('.screen').addEventListener('click', e => {
                selector = document.querySelector('.selector');
                if (selector.classList.contains('open')) {
                    selector.classList.remove('open');
                    document.querySelector('.screen').classList.remove('active');
                }
            });

            photobox_container = document.createElement("div");
            photobox_container.classList.add("image-container");
            photobox.appendChild(photobox_container);
            photobox.querySelector('.dismiss-btn').addEventListener('click', () => {toggleHide(photobox)});

            window.onresize = debounce(() => {
                if (!photobox.classList.contains('hidden')) {
                    element = photobox.querySelector('.photobox-display');
                    resize_photobox_display(element);
                } else {
                    gallery.querySelectorAll('.figure').forEach((p) => resize_gallery_tile(p.querySelector('img')));
                }
            });
            loadAllImages();
      });
});

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'Escape':
            toggleHide(photobox);
            // toggleHide(gallery);
    };
});

