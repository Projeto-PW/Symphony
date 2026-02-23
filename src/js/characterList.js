const list = document.getElementById('characterList');
const listItems = document.querySelectorAll('.character');
const totalItems = listItems.length;
let activeIndex = 0;

function updateList() {
    listItems.forEach((item, index) => {
        let offset = index - activeIndex; // Desvio que cada item deverá ter no carrosel
        if(offset > totalItems / 2)
            offset -= totalItems;
        if(offset < -totalItems / 2)
            offset += totalItems;
        // As condicionais acima corrigem o desvio para o valor correto
        const scale = Math.pow(1.5, -Math.abs(offset)); // Escala final do item
        const z = -Math.abs(offset) * 100; // Profundidade do item
        item.style.transform = `
            translate(-50%, -50%)
            translateX(${offset * (offset == 1 ? 350 : 300)}px) ${/* Deslocamento do item baseado no desvio */""}
            translateZ(${z}px)
            scale(${scale})
        `;
        item.style.opacity = Math.exp(-0.2 * offset ** 2);
        item.style.top = `${50 - 15 * Math.abs(offset)}%`;
        item.classList.remove("active");
        if(index == activeIndex) {
            item.classList.add("active");
        }
    });
}
updateList();

listItems.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        if(index !== activeIndex) {
            e.preventDefault();
            activeIndex = index;
            updateList()
        }
    });
});

function moveList(d) {
    activeIndex += d;
    console.log(activeIndex);
    if(activeIndex < 0)
        activeIndex = totalItems - 1;
    if(activeIndex >= totalItems)
        activeIndex = 0;
    console.log(activeIndex);
    updateList();
}

window.addEventListener("keydown", (e) => {
    if(e.key === "ArrowLeft") {
        e.preventDefault();
        moveList(-1);
    }
    if(e.key === "ArrowRight") {
        e.preventDefault();
        moveList(1);
    }
});