import {
    OverlayScrollbars,
    ScrollbarsHidingPlugin,
    SizeObserverPlugin,
    ClickScrollPlugin
} from 'https://esm.sh/overlayscrollbars';

import Lenis from 'https://esm.sh/lenis';

export { enableScroll, disableScroll };

const lenis = new Lenis({
    duration: 1.3,
    smooth: true,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

document.querySelector('.main-menu').addEventListener('wheel', (e) => {
    e.stopPropagation();
    e.preventDefault();
}, { passive: false });

document.querySelector('.main-menu').addEventListener('touchmove', (e) => {
    e.stopPropagation();
    e.preventDefault();
}, { passive: false });

const osInstance = OverlayScrollbars(document.body, {
    scrollbars: {
        visibility: 'auto',
        autoHide: 'scroll',
        autoHideDelay: 250,
    }
});

function enableScroll() {
    osInstance.options({ scrollbars: { visibility: 'auto', autoHide: 'scroll', autoHideDelay: 250 } })
}

function disableScroll() {
    osInstance.options({ scrollbars: { visibility: 'hidden', autoHide: 'always', autoHideDelay: 0 } })
}

requestAnimationFrame(raf)
