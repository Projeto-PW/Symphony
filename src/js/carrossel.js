const carrossel = document.querySelector(".carrossel-list");
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