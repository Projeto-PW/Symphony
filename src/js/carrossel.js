const carrossel = document.querySelector(".carrossel-list");
const selectGame = document.querySelector(".selected-game");
let isScrolling = false;

function carrosselScroll(d) {
    if(isScrolling) return;
    isScrolling = true;
    const carrosselItems = document.querySelectorAll(".carrossel-item");
    const itemWidth = carrosselItems[0].offsetWidth;
    const itemGap = parseFloat(getComputedStyle(carrossel).gap);
    const step = itemWidth + itemGap; // Soma da largura do item ao gap
    carrossel.scrollBy({
        left: d * step,
        behavior: "smooth"
    });
    setTimeout(() => { isScrolling = false }, 500);
}

function openGame() {
    selectGame.style.display = "flex";
}

document.querySelectorAll(".carrossel-item").forEach(item => {
    item.addEventListener("click", openGame());
});