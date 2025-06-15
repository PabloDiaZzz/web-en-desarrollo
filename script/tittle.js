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

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        document.querySelector('.main-menu').animate({
            opacity: [0, 1],
            visibility: ['hidden', 'visible'],
            backdropFilter: ['blur(0px)', 'blur(30px)'],
            backgroundColor: ['transparent', 'rgba(0, 0, 0, 0.7)'],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menublur').animate({
            left: ['100%', '50%'],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        document.querySelector('.menuico').animate({
            opacity: [0, 1],
        }, {
            easing: "ease",
            duration: 500,
            fill: "both",
        });
        
    } else {
        document.querySelector('.main-menu').animate({
            opacity: [1, 0],
            visibility: ['visible', 'hidden'],
            backdropFilter: ['blur(30px)', 'blur(0px)'],
            backgroundColor: ['rgba(0, 0, 0, 0.7)', 'transparent'],
        }, {
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
            botones.animate({
                display: ['none', 'flex'],
                width: [0, calcAuto('botones')[0]],
            }, {
                delay: 200,
                allowDiscrete: true,
                easing: "ease-in",
                duration: 600,
                fill: "both",
            });

        }
        tittle.classList.add('side');
    } else {
        sub.classList.remove('none');
        if (botonesAnimados) {
            botones.classList.remove('show');
            botonesAnimados = false;
            botones.animate({
                width: [calcAuto('botones'), '0'],
                display: ['flex', 'none'],
            }, {
                allowDiscrete: true,
                easing: "ease-in",
                duration: 600,
                fill: "both",
            });

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