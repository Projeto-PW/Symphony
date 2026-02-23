const list = document.getElementById('musicList');
const listItems = document.querySelectorAll('.song');
const step = 75;
let isLooping = false; // Trava de segurança para impedir repetição infinita do loop

function updateList() {
    const listRect = list.getBoundingClientRect();
    const listCenter = listRect.top + listRect.height / 2; // Centro da lista, serve para atualizar tamanhos e medir distâncias
    listItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const centerDist = Math.abs(listCenter - itemCenter); // Distância do item para o centro da lista, em valor absoluto para não ficar negativo
        const distRatio = Math.max(0, 1 - centerDist / (listRect.height / 2)); // Representa a distância em uma escala de 0 para 1, com o valor maior quanto mais próximo do centro
        item.style.setProperty("--scale", .7 + .3 * distRatio ** 2); // Atribui o valor a uma variável CSS
        item.style.opacity = .2 + distRatio * .8;
        distRatio > .95 ? item.classList.add("active") : item.classList.remove("active"); // Se o item estiver perto o bastante, classe 'active' é adicionada
    });
}

function scrollList(d) {
    list.scrollBy({
        top: d * step,
        behavior: "smooth"
    });
}

function loopListIfNeeded() {
    const errorMargin = 10; // Margem de erro para o scroll
    if(list.scrollTop + list.clientHeight >= list.scrollHeight - errorMargin) { // Detecta se chegou no final da lista
        isLooping = true;
        const firstItem = list.firstElementChild;
        list.appendChild(firstItem); // Move o primeiro item ao final da lista
        list.scrollTop -= step; // Subtrai um scroll, para continuar no mesmo item
        isLooping = false;
    }
    else if(list.scrollTop <= errorMargin) {
        isLooping = true;
        const lastItem = list.lastElementChild;
        list.prepend(lastItem);
        list.scrollTop += step;
        isLooping = false;
    }
}

window.addEventListener("load", updateList);
list.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollList(e.deltaY);
});
list.addEventListener("scroll", () => {
    updateList();
    if(!isLooping) {
        loopListIfNeeded();
    }
});
window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowUp") {
        e.preventDefault();
        scrollList(-1);
    }
    if(e.key === "ArrowDown") {
        e.preventDefault();
        scrollList(1);
    }
});