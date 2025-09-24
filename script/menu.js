const bkgnd = document.getElementById('back-tittles');
let timeoutMove

export { hideOptions }

const menu = document.querySelector('.menu');
const handleFirstClick = () => {
    document.getElementById('opt-menu-1').setAttribute('checked', '');
    moveBkgndTo(document.getElementById('opt-menu-1'));
    menu.removeEventListener('click', handleFirstClick);
};
menu.addEventListener('click', handleFirstClick);

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.checkbox-menu').forEach((e) => {
        e.addEventListener('change', (event) => {
            document.querySelectorAll('.opcion').forEach(opt => {
                opt.animate({
                    display: ['flex', 'none'],
                }, {
                    duration: 0,
                    fill: 'both',
                })
            });

            if (event.target.checked) {
                moveBkgndTo(event.target);
                const optionId = event.target.id.replace('opt-menu-', '');
                const content = document.querySelector(`.opt-${optionId}`);
                if (content) {
                    content.animate({
                        display: ['none', 'flex'],
                    }, {
                        duration: 0,
                        fill: 'both',
                    });
                }
            }

        });
    })
    window.addEventListener('resize', () => {
        const checked = document.querySelector('.checkbox-menu:checked');
        if (checked) {
            setBkgndTo(checked);
            clearTimeout(timeoutMove)
            timeoutMove = setTimeout(setBkgndTo(checked), 500);
        }
    });
})

function hideOptions(e) {
    document.querySelectorAll('.opcion').forEach(opt => {
        opt.animate({
            display: ['flex', 'none'],
        }, {
            duration: 0,
            fill: 'both',
        })
    });

    if (e.checked) {
        moveBkgndTo(e);
        const optionId = e.id.replace('opt-menu-', '');
        const content = document.querySelector(`.opt-${optionId}`);
        if (content) {
            content.animate({
                display: ['none', 'flex'],
            }, {
                duration: 0,
                fill: 'both',
            });
        }
    }
}

function moveBkgndTo(check) {
    const label = check.nextElementSibling;
    bkgnd.animate({
        left: [getComputedStyle(bkgnd).left, label.offsetLeft + 'px'],
        width: [getComputedStyle(bkgnd).width, `calc(${getComputedStyle(label).width != 'auto' ? getComputedStyle(label).width : '100%'}*1.3)`, getComputedStyle(label).width],
        height: [getComputedStyle(bkgnd).height, `calc(${getComputedStyle(label).height != 'auto' ? getComputedStyle(label).height : '100%'}/1.5)`, getComputedStyle(label).height],

    }, {
        allowDiscrete: true,
        easing: "ease-in-out",
        duration: 300,
        fill: "both",
    })
}

function setBkgndTo(check) {
    const label = check.nextElementSibling;
    bkgnd.style.left = label.offsetLeft + 'px';
    bkgnd.animate({
        left: [, label.offsetLeft + 'px'],
        width: [, `calc(${getComputedStyle(label).width}*1.5)`, getComputedStyle(label).width],
        height: [, `calc(${getComputedStyle(label).height}/1.5)`, getComputedStyle(label).height],
    }, {
        duration: 1,
        fill: "both",
    })
}
