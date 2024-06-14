var active_photo_set;
var imageIndex = 0;
var photo_sets;

var imageElement, nextImageElement, imageFillElement, nextImageFillElement;
var wrapper, content, title, topGradient, bottomGradient;
var loadNextImageTimer;
var collectionsToShow = ["Moab", "Yosemite", "California", "Animals", "Travel"]

// Display image
var config = {
    auto_advance: 20 * 1000,
    filter: "saturate(110%) contrast(110%)",
    fill_filter: "grayscale(0.1) brightness(0.75) blur(12px)",
    caption: true,
    crossfade: true,
    maxWidth: Number.MAX_SAFE_INTEGER,
    maxHeight: Number.MAX_SAFE_INTEGER,
    size: "cover",
    fadeEdges: true,
};

Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
};

function onImageLoaded(imageData, element) {
    return () => {
    resetNextImageTimer();
    title.style.display = "none";
    element.className = `displayed-photo ${config.crossfade ? "crossfade-image" : ""}`;
    element.style.opacity = 1;
    if (element.naturalWidth / element.naturalHeight > element.width / element.height) {
        var old_height = element.height;
        var new_height = (element.naturalHeight / element.naturalWidth) * element.width;
        element.style.height = new_height + "px";
        element.style['margin-top'] = ((old_height - new_height) / 2) + "px";
        element.style['mask-image'] = "linear-gradient(rgba(0, 0, 0, 0.8) 0%, black 10%, black 90%, rgba(0, 0, 0, 0.8) 100%)";
    } else {
        var old_width = element.width;
        var new_width = (element.naturalWidth / element.naturalHeight) * element.height;
        element.style.width = new_width + "px";
        element.style['margin-left'] = ((old_width - new_width) / 2) + "px";
        element.style['mask-image'] = "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, black 10%, black 90%, rgba(0, 0, 0, 0.8) 100%)";
    }

    setTimeout(() => {
        var title = imageData.title;
        if (title) {
            self.title.innerHTML = title;
            self.title.style.display = "initial";
        }
        if (imageElement !== null) {
            content.removeChild(imageElement);
        }
        imageElement = nextImageElement;
        nextImageElement = null;
    }, config.crossfade ? 0 : 0);
    };
}

function onImageFillLoaded(imageData, element) {
    return () => {
    element.className = `background-fill ${config.crossfade ? "crossfade-image" : ""}`;
    element.style.opacity = 1;
    element.id = "fill_node";

    setTimeout(() => {
        if (imageFillElement !== null) {
        content.removeChild(imageFillElement);
        }
        imageFillElement = nextImageFillElement;        
        nextImageFillElement = null;
    }, config.crossfade ? 0 : 0);
    };
}

function createImage(imageData) {
    var img = document.createElement("img");
    img.style.filter = config.filter;
    img.style["object-fit"] = 'contain';
    img.style.opacity = 0;
    img.onload = onImageLoaded(imageData, img);
    img.src = imageData['src'];
    return img;
}

function createFillImage(imageData) {
    var img_fill = document.createElement("img");
    img_fill.style.filter = config.fill_filter;
    img_fill.style["object-fit"] = "cover";
    img_fill.style.opacity = 0;
    img_fill.onload = onImageFillLoaded(imageData, img_fill);
    img_fill.src = imageData['src'];
    return img_fill;
}

function loadImage(index) {
    resetNextImageTimer();
    if (nextImageElement !== null) {
      nextImageElement.onload = null;
      content.removeChild(nextImageElement);
      nextImageElement = null;
    }

    if (nextImageFillElement !== null) {
      nextImageFillElement.onload = null;
      content.removeChild(nextImageFillElement);
      nextImageFillElement = null;
    }

    const imageList = photo_sets[active_photo_set];
    const nextImageData = imageList[index];

    if (nextImageData !== null) {
      nextImageElement = createImage(nextImageData);
      content.insertBefore(nextImageElement, title);
      nextImageFillElement = createFillImage(nextImageData);
      content.insertBefore(nextImageFillElement, nextImageElement);    
    }

    document.querySelectorAll('.indicator-item.active').forEach((e) => {
        e.classList = ['indicator-item'];
    })
    document.querySelector(".page-indicator").childNodes[index].classList.add("active");

}

function resetNextImageTimer() {
    if (config.auto_advance > 0) {
      clearTimeout(loadNextImageTimer);
      loadNextImageTimer = setTimeout(() => {
            imageIndex = (imageIndex + 1).mod(photo_sets[active_photo_set].length);
            loadImage(imageIndex);},
        config.auto_advance);
    // var progress = 0;    
    // clearInterval(loadNextImageTimer);
    // loadNextImageTimer = setInterval(() => {
    //         if (progress === 100) {
    //             progress = 0;
    //             imageIndex = (imageIndex + 1).mod(photo_sets[active_photo_set].length);
    //             loadImage(imageIndex);
    //         } else {
    //             progress += 0.5;
    //             var fill = "linear-gradient(to right, var(--foreground-text) " + progress + "%, var(--foreground-faint) " + (progress + 1) + "%)";
    //             document.querySelectorAll('.indicator-item.active').forEach((e) => {
    //                 e.style["background-image"] = fill;
    //             })
    //         }
    //     }, config.auto_advance / 200);
    }
}

function initializePhotoBox(parent) {
    wrapper = document.createElement("div");
    wrapper.className = "photo-wrapper";
    parent.appendChild(wrapper);

    content = document.createElement("div");
    wrapper.appendChild(content);
    
    title = document.createElement("div");
    title.className = "title";
    content.appendChild(title);

    if (config.fadeEdges) {
        topGradient = document.createElement("div");
        topGradient.className = "top-gradient";
        content.appendChild(topGradient);

        bottomGradient = document.createElement("div");
        bottomGradient.className = "bottom-gradient";
        content.appendChild(bottomGradient);
    }
    content.className = "content-fill";
    imageElement = null;
    nextImageElement = null;
    imageFillElement = null;
    nextImageFillElement = null;

    // Check for window resize
    const resizeObserver = new ResizeObserver((entries) => {
        loadImage(imageIndex);
    });
    resizeObserver.observe(wrapper);
      
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

        // Clear page indicators and add new one
        document.querySelector('.slide-widget>.page-indicator').remove();
        var num_items = photo_sets[photo_set_key].length;
        document.querySelector('.slide-widget').appendChild(initializeSlideIndicator(num_items));
        
        imageIndex = 0;
        loadImage(0);
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

// Photo slide selector
function initializeSlideIndicator(num_slides) {
    var container = document.createElement('div');
    container.classList.add('page-indicator');
    container.style['max-width'] = "min(" + (num_slides * 25) + "px, 50vw)";
    var children = []
    function _make_closure(index) {
        return function () {
            imageIndex = index;
            loadImage(imageIndex);
        }
    }
    for (var i = 0; i < num_slides; i++) {
        var indicator = document.createElement('span');
        if (i == 0){
            indicator.classList.add('active')
        }
        indicator.classList.add('indicator-item');
        indicator.addEventListener('click', _make_closure(i));
        container.appendChild(indicator);
    }
    return container;
}

// Load images
window.addEventListener('load', function () {
    var parent = document.getElementsByClassName('main-content')[0];    
    fetch('assets/photos/manifest.json')
      .then(response => response.json())
      .then(data => {
            photo_sets = data;
            if(window.location.hash) {
                active_photo_set = window.location.hash.slice(1);
                console.log(active_photo_set);
                initializeSelector(photo_sets, active_photo_set);
            } else {
                active_photo_set = initializeSelector(photo_sets);
            }
            initializePhotoBox(parent);
            setPhotoList(photo_sets, active_photo_set);
            const num_items = photo_sets[active_photo_set].length;
            document.querySelectorAll('.selector .selector-item').forEach(
                elem => {elem.addEventListener('click', handleSelectorClick, false)});
            document.querySelectorAll('.selector .selector-item').forEach(
                elem => { if (elem.innerHTML == active_photo_set) elem.classList.add('active'); });

            document.querySelector('.slide-widget').appendChild(initializeSlideIndicator(num_items));
                
            document.querySelector('.screen').addEventListener('click', e => {
                selector = document.querySelector('.selector');
                if (selector.classList.contains('open')) {
                    selector.classList.remove('open');
                    document.querySelector('.screen').classList.remove('active');
                }
            });
            loadImage(0);
      });
    document.querySelector('.prev-image').addEventListener('click', e => {
        imageIndex = (imageIndex - 1).mod(photo_sets[active_photo_set].length);
        loadImage(imageIndex);        
    })
    document.querySelector('.next-image').addEventListener('click', e => {
        imageIndex = (imageIndex + 1).mod(photo_sets[active_photo_set].length);
        loadImage(imageIndex);        
    })    
});

document.addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            imageIndex = (imageIndex + 1).mod(photo_sets[active_photo_set].length);
            loadImage(imageIndex);
            break;

        case 'ArrowLeft':
            imageIndex = (imageIndex -1).mod(photo_sets[active_photo_set].length);
            loadImage(imageIndex);
            break;
    };
});

