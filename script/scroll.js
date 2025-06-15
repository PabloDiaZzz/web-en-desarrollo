import {
    OverlayScrollbars,
    ScrollbarsHidingPlugin,
    SizeObserverPlugin,
    ClickScrollPlugin
} from 'https://esm.sh/overlayscrollbars';

const lenis = new Lenis({
    duration: 1.3,
    smooth: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

const mainMenu = document.querySelector('.main-menu');

mainMenu.addEventListener('wheel', (e) => {
  e.stopPropagation();  // Evita que el evento suba al body
  e.preventDefault(); 
}, { passive: false });

const os = OverlayScrollbars(document.body, {
    scrollbars: {
        autoHide: 'scroll',
        autoHideDelay: 250,
    }
});

requestAnimationFrame(raf)
