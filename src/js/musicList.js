const list = document.getElementById('musicList');
const listItems = document.querySelectorAll('.song');

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

window.addEventListener("load", updateList);
list.addEventListener("scroll", updateList);