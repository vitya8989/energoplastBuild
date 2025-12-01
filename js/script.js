$('.js_input_tel').inputmask('+7 (999) 999 99-99');

$('.select').SumoSelect({
    nativeOnDevice: [],
});

if (document.querySelectorAll('a[href^="#"]').length > 0) {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            let href = this.getAttribute('href').substring(1);
            if (href.length) {
                e.preventDefault();
                const scrollTarget = document.getElementById(href);
                let topOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - topOffset;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

const headerSearch = document.querySelectorAll('.js_header_search');

if (headerSearch.length) {
    headerSearch.forEach((searchBlock) => {
        const headerSearchInput = searchBlock.querySelector('.js_header_search_input');
        const clearHeaderSearchInput = searchBlock.querySelector('.js_header_search_form_clear');
        headerSearchInput.addEventListener('focus', () => {
            if (window.innerWidth < 1200) {
                searchBlock.classList.add('focus');
            }
        });
        headerSearchInput.addEventListener('input', () => {
            if (headerSearchInput.value !== '') {
                clearHeaderSearchInput.classList.add('show');
            } else {
                clearHeaderSearchInput.classList.remove('show');
            }
        })
        headerSearchInput.addEventListener('blur', () => {
            if (window.innerWidth < 1200 && headerSearchInput.value === '') {
                searchBlock.classList.remove('focus');
            }
        });
        clearHeaderSearchInput.addEventListener('click', () => {
            headerSearchInput.value = '';
            headerSearchInput.focus();
            clearHeaderSearchInput.classList.remove('show');
        });
    })
}

const burger = document.querySelector('.js_burger');
const nav = document.querySelector('.js_nav');

if (burger && nav) {

    burger.addEventListener('click', () => {
        nav.classList.toggle('menu_opened');
        burger.classList.toggle('menu_opened');
        document.body.classList.toggle('scroll_lock');
    });

    const navDropdownLinks = nav.querySelectorAll('.js_nav_dropdown_link');
    if (navDropdownLinks.length) {
        navDropdownLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    link.classList.toggle('open');
                    if (link.classList.contains('open')) {
                        link.nextElementSibling.style.maxHeight = `${link.nextElementSibling.scrollHeight}px`
                    } else {
                        link.nextElementSibling.style.maxHeight = 0;
                    }
                }
            })
        });
    }
}

const cookiesPopup = document.querySelector('.js_cookies_popup');

if (cookiesPopup) {
    const cookiesPopupClose = cookiesPopup.querySelector('.js_close_cookies_popup');

    cookiesPopupClose.addEventListener('click', () => {
        cookiesPopup.classList.remove('cookies_popup_opened');
    })
}

const callbackPopup = document.querySelector('.js_callback_popup');
const openCallbackPopupBtns = document.querySelectorAll('.js_open_callback_popup');

if (callbackPopup && openCallbackPopupBtns.length) {
    const callbackBodyForm = document.querySelector('.js_callback_body_form');
    const callbackBodyThanks = document.querySelector('.js_callback_body_thanks');
    const topForm = callbackPopup.querySelector('.js_callback_top_form');
    const middleForm = callbackPopup.querySelector('.js_callback_middle_form');
    const footerForm = callbackPopup.querySelector('.js_callback_footer_form');
    const callbackPopupClose = callbackPopup.querySelectorAll('.js_callback_popup_close');

    openCallbackPopupBtns.forEach((btn) => {
       btn.addEventListener('click', () => {
           callbackPopup.classList.add('callback_popup_opened');
           document.body.classList.add('scroll_lock');
           callbackBodyForm.classList.add('active');

           if (btn.dataset.form === 'footer' && footerForm) {
               footerForm.classList.add('active');
           }
           if (btn.dataset.form === 'middle' && middleForm) {
               middleForm.classList.add('active');
           }
           if (btn.dataset.form === 'top' && topForm) {
               topForm.classList.add('active');
               if (burger.classList.contains('menu_opened')) {
                   nav.classList.toggle('menu_opened');
                   burger.classList.toggle('menu_opened');
               }
           }
       });
    });

    const closePopup = () => {
        callbackPopup.classList.remove('callback_popup_opened');
        document.body.classList.remove('scroll_lock');
        callbackBodyForm.classList.remove('active');
        callbackBodyThanks.classList.remove('active');
        footerForm.classList.remove('active');
        middleForm.classList.remove('active');
        topForm.classList.remove('active');
    }
    callbackPopupClose.forEach((close) => {
        close.addEventListener('click', () => {
            closePopup();
        });
    });
    callbackPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.callback_popup__body')) {
            closePopup();
        }
    })

    const forms = callbackPopup.querySelectorAll('form');
    if (forms.length) {
        forms.forEach((form) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                callbackBodyForm.classList.remove('active');
                footerForm.classList.remove('active');
                middleForm.classList.remove('active');
                topForm.classList.remove('active');
                callbackBodyThanks.classList.add('active');
            })
        });
    }
}

const mainTopSlider = document.querySelector('.js_main_top_slider');
if (mainTopSlider) {
    const mainTopSliderInstance = new Swiper(mainTopSlider, {
        slidesPerView: 'auto',
        spaceBetween: 8,
        pagination: {
            el: '.js_main_top_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            1024: {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: false,
            },
        }
    });


    if (window.innerWidth >= 1024) {
        mainTopSliderInstance.on('reachEnd', function() {
            mainTopSliderInstance.autoplay.stop();

            setTimeout(() => {
                mainTopSliderInstance.slideTo(0);
                mainTopSliderInstance.autoplay.start();
            }, 7000);
        });

    }

    const mainTopControls = document.querySelector('.js_main_top_controls');

    if (mainTopControls) {
        const mainTopActiveSlide = document.querySelector('.js_main_top_active_slide');
        const mainTopSlidesCount = document.querySelector('.js_main_top_slides_count');

        const formatSlideNumber = (number) => {
            return number > 9 ? `${number}` : `0${number}`;
        };

        const totalSlides = mainTopSliderInstance.slides.length;
        mainTopSlidesCount.textContent = formatSlideNumber(totalSlides);

        const updateActiveSlide = () => {
            const realIndex = mainTopSliderInstance.realIndex + 1;
            mainTopActiveSlide.textContent = formatSlideNumber(realIndex);
        };

        updateActiveSlide();

        mainTopSliderInstance.on('slideChange', updateActiveSlide);
    }
}

const casesSlider = document.querySelector('.js_cases_slider');
if (casesSlider) {
    new Swiper(casesSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: ".js_cases_slider_next",
            prevEl: ".js_cases_slider_prev",
        },
        pagination: {
            el: '.js_cases_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    });
}

const newsSlider = document.querySelector('.js_news_slider');
if (newsSlider) {
    new Swiper(newsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: ".js_news_slider_next",
            prevEl: ".js_news_slider_prev",
        },
        pagination: {
            el: '.js_news_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    });
}

const caseTopSlider = document.querySelector('.js_case_top_slider');
if (caseTopSlider) {
    new Swiper(caseTopSlider, {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: ".js_case_top_slider_next",
            prevEl: ".js_case_top_slider_prev",
        },
        pagination: {
            el: '.js_case_top_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
    });
}

const accordionsGroup = document.querySelectorAll('.js_accordions');

if (accordionsGroup.length) {
    accordionsGroup.forEach((accordionGroup) => {
        const accordionsHeads = accordionGroup.querySelectorAll('.js_accordion_head');

        accordionGroup.querySelectorAll('.accordion').forEach(acc => {
            if (acc.classList.contains('active')) {
                acc.querySelector('.js_accordion_body').style.maxHeight = `${acc.querySelector('.js_accordion_body').scrollHeight}px`;
            }
        });

        accordionsHeads.forEach(head => {
            head.addEventListener('click', function() {
                const accordion = this.closest('.accordion');
                const isActive = accordion.classList.contains('active');

                // Закрываем все аккордеоны
                accordionGroup.querySelectorAll('.accordion').forEach(acc => {
                    acc.classList.remove('active');
                    acc.querySelector('.js_accordion_body').style.maxHeight = 0;
                });

                // Если аккордеон не был активен - открываем его
                if (!isActive) {
                    accordion.classList.add('active');
                    accordion.querySelector('.js_accordion_body').style.maxHeight = `${accordion.querySelector('.js_accordion_body').scrollHeight}px`;
                }
            });
        });
    });
}

const caseRecommendSlider = document.querySelector('.js_case_recommend_slider');
if (caseRecommendSlider) {
    new Swiper(caseRecommendSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: ".js_case_recommend_slider_next",
            prevEl: ".js_case_recommend_slider_prev",
        },
        pagination: {
            el: '.js_case_recommend_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        }
    });
}

const catalogUsefulSlider = document.querySelector('.js_catalog_useful_slider');
if (catalogUsefulSlider) {
    new Swiper(catalogUsefulSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: ".js_catalog_useful_slider_next",
            prevEl: ".js_catalog_useful_slider_prev",
        },
        pagination: {
            el: '.js_catalog_useful_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        }
    });
}

const productTopSlider = document.querySelector('.js_product_top_slider');
if (productTopSlider) {
    const productTopSliderInstance = new Swiper(productTopSlider, {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.js_product_top_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    const thumbnails = document.querySelectorAll('.js_product_top_slider_thumb');

    if (thumbnails.length && thumbnails.length === productTopSliderInstance.slides.length) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));

                thumbnails.forEach(t => t.classList.remove('active'));

                this.classList.add('active');

                productTopSliderInstance.slideToLoop(slideIndex);
            });
        });

        productTopSliderInstance.on('slideChange', function() {
            const activeIndex = productTopSliderInstance.activeIndex;

            thumbnails.forEach(t => t.classList.remove('active'));

            if (thumbnails[activeIndex]) {
                thumbnails[activeIndex].classList.add('active');
            }
        });
    }
}

const tooltips = document.querySelectorAll('.js_tooltip');

if (tooltips.length) {
    tooltips.forEach((tooltip) => {
        const tooltipBtn = tooltip.querySelector('.js_tooltip_btn');
        const tooltipBody = tooltip.querySelector('.js_tooltip_body');
        const tooltipClose = tooltipBody.querySelector('.js_tooltip_close');

        tooltipBtn.addEventListener('click', () => {
            tooltipBody.classList.toggle('tooltip_opened');
        });
        tooltipClose.addEventListener('click', () => {
            tooltipBody.classList.remove('tooltip_opened');
        });
    })
}

const productAlsoSlider = document.querySelector('.js_product_also_slider');
if (productAlsoSlider) {
    new Swiper(productAlsoSlider, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: {
            nextEl: ".js_product_also_slider_next",
            prevEl: ".js_product_also_slider_prev",
        },
        pagination: {
            el: '.js_product_also_slider_pagination',
            type: 'bullets',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    });
}

const mainAssociationsSlider = document.querySelector('.js_main_associations_slider');
if (mainAssociationsSlider) {
    new Swiper(mainAssociationsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.js_main_associations_next',
            prevEl: '.js_main_associations_prev',
        },
        pagination: {
            el: '.js_main_associations_pagination',
            type: 'bullets',
            clickable: true,
        },
    });
}

const mainAwardsSlider = document.querySelector('.js_main_awards_slider');
if (mainAwardsSlider) {
    new Swiper(mainAwardsSlider, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.js_main_awards_next',
            prevEl: '.js_main_awards_prev',
        },
        pagination: {
            el: '.js_main_awards_pagination',
            type: 'bullets',
            clickable: true,
        },
    });
}

const openImagePopupBtns = document.querySelectorAll('.js_open_image_popup');
const imagePopup = document.querySelector('.js_image_popup');

if (openImagePopupBtns.length && imagePopup) {
    const imagePopupClose = imagePopup.querySelector('.js_image_popup_close');
    const imagePopupLogo = imagePopup.querySelector('.js_image_popup_logo');
    const imagePopupText = imagePopup.querySelector('.js_image_popup_text');
    const imagePopupImg = imagePopup.querySelector('.js_image_popup_img');

    openImagePopupBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            imagePopupLogo.src = btn.dataset.logo ? btn.dataset.logo : '#';
            imagePopupText.textContent = btn.dataset.text ? btn.dataset.text : '';
            imagePopupImg.src = btn.dataset.image ? btn.dataset.image : '#';

            if (!imagePopupLogo.src) {
                imagePopupLogo.style.display = 'none';
            } else {
                imagePopupLogo.style.display = 'block';
            }
            imagePopup.classList.add('popup_image_opened');
            document.body.classList.add('scroll_lock');
        });
    });
    imagePopupClose.addEventListener('click', () => {
        imagePopup.classList.remove('popup_image_opened');
        document.body.classList.remove('scroll_lock');
    });
    imagePopup.addEventListener('click', (e) => {
        if (!e.target.closest('.image_popup__body')) {
            imagePopup.classList.remove('popup_image_opened');
            document.body.classList.remove('scroll_lock');
        }
    })
}

const filterAccordionHeads = document.querySelectorAll('.js_filter_accordion_head');

if (filterAccordionHeads.length) {
    filterAccordionHeads.forEach((head) => {
        if (head.classList.contains('active')) {
            head.nextElementSibling.style.maxHeight = `${head.nextElementSibling.scrollHeight}px`
        }
        head.addEventListener('click', () => {
            head.classList.toggle('active');
            if (head.classList.contains('active')) {
                head.nextElementSibling.style.maxHeight = `${head.nextElementSibling.scrollHeight}px`
            } else {
                head.nextElementSibling.style.maxHeight = 0;
            }
        });
    });
}

const mobFilterOpen = document.querySelector('.js_mob_filter_open');

if (mobFilterOpen) {
    const mobFilter = document.querySelector('.js_mob_filter');
    const mobFilterClose = mobFilter.querySelectorAll('.js_mob_filter_close');
    mobFilterOpen.addEventListener('click', () => {
        mobFilter.classList.add('filter_opened');
        document.body.classList.add('scroll_lock');
    });
    mobFilterClose.forEach((close) => {
       close.addEventListener('click', () => {
           mobFilter.classList.remove('filter_opened');
           document.body.classList.remove('scroll_lock');
       });
    });
}
