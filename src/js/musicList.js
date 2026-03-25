const list = document.getElementById('musicList');
const listItems = document.querySelectorAll('.song');
const totalItems = listItems.length;
const step = window.innerWidth <= 768 ? 55 : 75;
let activeIndex;
let isLooping = false; // Trava de segurança para impedir repetição infinita do loop

function updateList() {
    const listRect = list.getBoundingClientRect();
    const listCenter = listRect.top + listRect.height / 2; // Centro da lista, serve para atualizar tamanhos e medir distâncias
    listItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const centerDist = Math.abs(listCenter - itemCenter); // Distância do item para o centro da lista, em valor absoluto para não ficar negativo
        const distRatio = Math.max(0, 1 - centerDist / (listRect.height / 2)); // Representa a distância em uma escala de 0 para 1, com o valor maior quanto mais próximo do centro
        item.style.setProperty("--scale", .7 + .3 * distRatio ** 2); // Atribui o valor a uma variável CSS
        item.style.opacity = .2 + distRatio * .8;
        if(distRatio > .95) {
            item.classList.add("active") // Se o item estiver perto o bastante, classe 'active' é adicionada
            activeIndex = index;
        }
        else {
            item.classList.remove("active"); 
        }
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

window.addEventListener("load", () => {
    updateList();
    list.scrollTop = step;
});
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
listItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        if(item.classList.contains("active")) {
            const songId = item.id.split("-")[1];
            selSong(songId);
        }
        else {
            let distance = index - activeIndex;
            if(distance > totalItems / 2) distance -= totalItems;
            if(distance < -totalItems / 2) distance += totalItems;
            let d = distance / Math.abs(distance);
            for(let i = 0; i < Math.abs(distance); i++) {
                scrollList(d);
            }
        }
    })
})