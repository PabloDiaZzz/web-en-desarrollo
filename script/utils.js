document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.no-select').forEach((element) => {
        // Convertir HTMLCollection a Array y luego iterar
        Array.from(element.children).forEach((child) => {
            child.classList.add('no-select');
        });
    });

    document.querySelectorAll('.no-select, .no-select-np').forEach((element) => {
        element.setAttribute('draggable', false);
    })
})