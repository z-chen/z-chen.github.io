var slides_to_show = 3;
var photo_list_index = 1;
var photo_sets;

function loadImages(callback) {
  [].forEach.call(this.querySelectorAll('img'),function(img){
    var _img = new Image,  _src = img.getAttribute('data-src');
    _img.onload = function () {
      img.src = _src;
      img.classList.add('loaded');
      callback && callback(img);
    }
    if (img.src !== _src) {
        _img.src = _src;
    }
  });
}

function makeSlide(src, title) {
    let container = document.createElement('div');
    let img = document.createElement('img')
    let img_title = document.createElement('h3')
    img.setAttribute('data-src', src);
    img_title.innerHTML = title;
    container.appendChild(img);
    container.appendChild(img_title);
    return container
}

function setPhotoList(photosets, photo_set_key, carousel_id) {
    let num_slides = document.querySelectorAll('#' + carousel_id + ' .glider-slide').length;
    let glider = Glider(document.querySelector('#' + carousel_id));
    for (var i=0; i < num_slides; i++) {
        glider.removeItem(0);
    }
    glider.addItem(document.createElement('div'));
    photosets[photo_set_key].forEach(e => glider.addItem(makeSlide(e.src, e.title)));
    glider.addItem(document.createElement('div'));
    // updatePhotoListTitle(photo_list_key);
}

function initializePhotoCarousel(carousel_id) {
    carousel_elem = document.querySelector('#' + carousel_id);
    carousel_elem.setAttribute('style', 'display: inherit');
    window._ = new Glider(carousel_elem, {
        slidesToShow: slides_to_show,
        slidesToScroll: 1,
        draggable: true,
        scrollLock: true,
        duration: 1.0,
        dragVelocity: 2.5,
        eventPropagate: true,
        arrows: {
            prev: '.content .glider-prev',
            next: '.content .glider-next',
        },
    });

    var glider = Glider(carousel_elem);
    if (glider.slides.length > 0) {
        var num_preload = Math.min(glider.slides.length, slides_to_show);
        for (var i = 0; i <= num_preload; ++i) {
            loadImages.call(glider.slides[i], function() {
                glider.refresh(true);
            });
        }
    }

    carousel_elem.addEventListener('glider-slide-visible', function(event) {
      var imgs_to_anticipate = 3;
      var glider = Glider(this);
      for (var i = 0; i <= imgs_to_anticipate; ++i) {
        var index = Math.min(event.detail.slide + i, glider.slides.length - 1),
          glider = glider;
        loadImages.call(glider.slides[index], function () {
          glider.refresh(true);
        })
      }
    });

};

function initializeSelector(photosets) {
    let selector_elem;
    for (const [key, _] of Object.entries(photosets).reverse()) {
        selector_elem = document.createElement('div');
        selector_elem.classList.add('selector-item');
        selector_elem.innerHTML = key;
        document.querySelector('.selector').appendChild(selector_elem);
    }
    return selector_elem.innerHTML;
}

function handleSelectorClick(e) {
    let parent = e.target.parentNode;
    if (!parent.classList.contains('open') && !e.target.classList.contains('active')) {
        return;
    }

    // Made selection
    if (parent.classList.contains('open') && !e.target.classList.contains('active')) {
        document.querySelector('.selector .selector-item.active').classList.remove('active');

        let new_elem = e.target.cloneNode(true);
        new_elem.classList.add('active');
        new_elem.addEventListener('click', handleSelectorClick);
        e.target.remove();
        setPhotoList(photo_sets, new_elem.innerHTML, 'photo-carousel');
        parent.appendChild(new_elem);
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

window.addEventListener('load', function () {
    initializePhotoCarousel('photo-carousel');
    document.querySelector('.glider').addEventListener('wheel', e => {
        e.preventDefault();
        let delta = 0;
        if (Math.abs(e.deltaY) >= Math.abs(e.deltaX)) {
            delta = e.deltaY;
        } else {
            delta = e.deltaX;
        }
        delta = Math.min(5 * delta, 200);
        delta = Math.max(delta, -200);
        console.log(delta);
        document.querySelector('.glider').scrollLeft += delta;
    });
    fetch('assets/photos/manifest.json')
      .then(response => response.json())
      .then(data => {
            photo_sets = data;
            active_photo_set = initializeSelector(photo_sets);
            if(window.location.hash) {
                var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
                hash = decodeURI(hash);
                if (Object.hasOwn(photo_sets, hash)) {
                    active_photo_set = hash;
                }
            }
            setPhotoList(photo_sets, active_photo_set, 'photo-carousel');
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
      });
    document.querySelector('.darkmode').addEventListener('click', e => {
        if (!document.querySelector('body').classList.contains('dark')){
            document.querySelector('body').classList.add('dark');
        }
    })
    document.querySelector('.lightmode').addEventListener('click', e => {
        if (document.querySelector('body').classList.contains('dark')){
            document.querySelector('body').classList.remove('dark');
        }
    })
});

document.addEventListener('keydown', (e) => {
    var glider = Glider(document.querySelector('#photo-carousel'));
    switch (e.code) {
        case 'ArrowRight':
            glider.arrows['next'].click()
            break;

        case 'ArrowLeft':
            glider.arrows['prev'].click()
            break;
    };
});


