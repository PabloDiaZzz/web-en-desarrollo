import { enableScroll, disableScroll } from './scroll.js';

const header = document.querySelector('#sticky-parallax-header');
const tittle = document.querySelector('.header-tittle');
const sub = document.querySelector('.header-subtittle');
const botones = document.querySelector('.botones');
const menu = document.querySelector('.menu');
const trigger60 = window.innerHeight * 0.6;
const trigger80 = window.innerHeight * 0.8;
const trigger85 = window.innerHeight * 0.85;
const trigger88 = window.innerHeight * 0.88;
let botonesAnimados = false;
let menuAnimado = false;
let wheelHandler = null;

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        disableScroll();
        wheelHandler = (e) => {
            e.stopPropagation();
            e.preventDefault(); 
        };
        document.body.addEventListener('wheel', wheelHandler, { passive: false });
        document.querySelector('.main-menu').animate({
            backdropFilter: ['blur(0px)', 'blur(50px)'],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menublur').animate({
            left: ['100%', '50%'],
        }, {
            delay: 200,
            easing: "ease",
            duration: 850,
            fill: "both",
        });
        document.querySelector('.menuico').animate({
            opacity: [0, 1],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menuico-img').animate({
            opacity: [0, 1],
        }, {
            delay: 200,
            easing: "ease",
            duration: 850,
            fill: "both",
        });
        document.querySelectorAll('.tittle-menu').forEach((opt) => {
            const n = Array.from(document.querySelectorAll('.tittle-menu')).indexOf(opt)
            opt.style.visibility = 'visible';
            opt.animate({
                opacity: [0, 1],
                transform: ['translateY(-20px)', 'translateY(0px)'],
            }, {
                delay: (600 + (n * 150)),
                easing: "ease",
                duration: 500,
                fill: "both",
            });
        });
        document.getElementById('back-tittles').animate({
            opacity: [0, 1],
            transform: ['translateY(-20px)', 'translateY(0px)'],
        }, {
            delay: 600 + (Array.from(document.querySelectorAll('.checkbox-menu')).indexOf(document.querySelector('.checkbox-menu:checked')) * 150),
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.separador').animate({
            width: [0, '90%'],

        }, {
            delay: 600,
            easing: "ease",
            duration: 5000,
            fill: "both",
        });
    } else {
        if (wheelHandler) {
            document.body.removeEventListener('wheel', wheelHandler);
        }
        enableScroll();
        document.querySelector('.main-menu').animate({
            backdropFilter: ['blur(50px)', 'blur(0px)'],
        }, {
            delay: 250,
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menublur').animate({
            left: ['50%', '100%'],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menuico').animate({
            opacity: [1, 0],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menuico-img').animate({
            opacity: [1, 0],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
    }
});

window.addEventListener('scroll', () => {

    if (window.scrollY >= trigger60) {
        if (!menuAnimado && !menu.classList.contains('active')) {
            menu.classList.remove('show');
            menuAnimado = true;
        }
    } else {
        if (menuAnimado && !menu.classList.contains('active')) {
            menu.classList.add('show');
            menuAnimado = false;
        }
    }

    if (window.scrollY >= trigger80) {
        sub.classList.add('none');
        if (!botonesAnimados) {
            botones.classList.add('show');
            botonesAnimados = true;
            const autoWidth = calcAuto('botones')[0];
            if (autoWidth != 0) {
                botones.animate({
                    display: ['none', 'flex'],
                    width: [0, autoWidth],
                }, {
                    delay: 200,
                    allowDiscrete: true,
                    easing: "ease-in",
                    duration: 600,
                    fill: "both",
                });
            }

        }
        tittle.classList.add('side');
    } else {
        sub.classList.remove('none');
        if (botonesAnimados) {
            botonesAnimados = false;
            const autoWidth = calcAuto('botones')[0];
            if (autoWidth != 0) {
                botones.classList.remove('show');
                botones.animate({
                    width: [autoWidth, '0'],
                    display: ['flex', 'none'],
                }, {
                    allowDiscrete: true,
                    easing: "ease-in",
                    duration: 600,
                    fill: "both",
                });
            }
        }
        tittle.classList.remove('side');
    }
});

header.style.position = 'fixed';
header.style.top = 0;

document.body.style.paddingTop = '100vh';

window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.scrollY >= trigger88) {
            botones.classList.add('show');
            sub.classList.add('none');
            botonesAnimados = true;
        }
    }, 100);
});

function calcAuto(cls) {
    const clone = document.querySelector(`.${cls}`).cloneNode(true);
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.style.width = 'auto';
    clone.style.height = 'auto';
    clone.style.pointerEvents = 'none';
    document.querySelector(`.${cls}`).parentElement.appendChild(clone);

    const width = clone.offsetWidth + 'px';
    const height = clone.offsetHeight + 'px';

    clone.remove();
    return [width, height];
}