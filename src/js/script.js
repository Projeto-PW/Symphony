//PROGRAMAÇÃO DO SLIDER
const slides = [
    {
        nome: "slide 1",
        cor: "#fff"
    },
    {
        nome: "slide 2",
        cor: "#eee"
    },
    {
        nome: "slide 3",
        cor: "#ddd"
    },
    {
        nome: "slide 4",
        cor: "#ccc"
    },
    {
        nome: "slide 5",
        cor: "#bbb"
    },
    {
        nome: "slide 6",
        cor: "#aaa"
    },
    {
        nome: "slide 7",
        cor: "#999"
    },
];

const progressBar = document.querySelector(".slideshow-progress");
const progress = progressBar.querySelector("span");
for(let i = 0; i < slides.length; i++) {
    const newSlide = document.createElement("span");
    const newCounter = document.createElement("span");
    document.querySelector(".slideshow-images").appendChild(newSlide);
    document.querySelector(".slideshow-counter").appendChild(newCounter);
    newSlide.innerText = slides[i].nome;
    newSlide.style.background = slides[i].cor;
    newCounter.id = `counter${i}`;
    newCounter.addEventListener("click", () => autoScroll(i, true));
    if(i == 0) {
        newCounter.classList.add("selected");
    }
}
progress.style.width = `${100 / slides.length}%`;

let autoScrolling = false;
let waiting = false;

function waitScrollEnd(element, callback) {
    let lastScroll = element.scrollLeft;
    let notScrolling = 0;
    const checkScroll = setInterval(() => {
        if(element.scrollLeft == lastScroll) {
            notScrolling++;
            if(notScrolling > 3) { // não scrolla há mais de 60ms
                clearInterval(checkScroll);
                callback();
            }
        }
        else {
            notScrolling = 0;
            lastScroll = element.scrollLeft;
        }
    }, 20)
}

const slideshow = document.querySelector(".slideshow-images");
function autoScroll(index, smooth) {
    const slide = document.getElementById(`counter${Math.floor(index)}`);
    const slideWidth = slideshow.clientWidth;
    for(let i = 0; i < slides.length; i++) {
        document.getElementById(`counter${i}`).classList.remove("selected");
    }
    slide.classList.add("selected");
    autoScrolling = true;
    slideshow.scrollTo({
        left: index * slideWidth,
        behavior: smooth ? "smooth" : "auto"
    });
    waitScrollEnd(slideshow, () => {
        autoScrolling = false;
        waiting = false;
    })
}

let timeout;
slideshow.addEventListener("scroll", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const slideWidth = slideshow.clientWidth;
        const progressBarWidth = progressBar.clientWidth;
        const progressWidth = progress.clientWidth;
        let index = slideshow.scrollLeft / slideWidth;
        const maxDistance = progressBarWidth - progressWidth;
        const distance = (index / (slides.length - 1)) * maxDistance;
        if(index >= slides.length) {
            index = slides.length - 1;
        }
        if(!autoScrolling) {
            for(let i = 0; i < slides.length; i++) {
                document.getElementById(`counter${i}`).classList.remove("selected");
            }
            document.getElementById(`counter${Math.round(index)}`).classList.add("selected");
        }
        progress.style.left = `${distance}px`;
    }, 10);
});


function moveBar(e, smooth) {
    const rect = progressBar.getBoundingClientRect();
    let xPosition = e.clientX - rect.left;
    xPosition = Math.max(0, Math.min(xPosition, rect.width)); //limita o movimento aos limites da progressBar
    let index = (xPosition / rect.width) * slides.length;
    autoScroll(index, smooth);
};

progressBar.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    progressBar.setPointerCapture(e.pointerId); //Enquanto o pointer estiver ativo, todos os movimentos só afetam a progressBar
    waiting = true;
    moveBar(e, true);
});

progressBar.addEventListener("pointermove", (e) => {
    if(e.buttons !== 1 || waiting) return; //Se é diferente de 1, significa que nada está pressionado
    e.preventDefault();
    moveBar(e, false);
});

progressBar.addEventListener("pointerup", (e) => {
    progressBar.releasePointerCapture(e.pointerId); //Devolve o controle dos movimentos ao navegador
});

// PROGRAMAÇÃO DO CARROSSEL
const carrossel = document.querySelector(".carrossel-list");
let isScrolling = false;

function carrosselScroll(d) {
    if(isScrolling) return;
    isScrolling = true;
    const carrosselItems = document.querySelectorAll(".carrossel-item");
    const itemWidth = carrosselItems[0].offsetWidth;
    const step = itemWidth + 32; // Soma da largura do item ao gap
    carrossel.scrollBy({
        left: d * step,
        behavior: "smooth"
    });
    setTimeout(() => { isScrolling = false }, 500);
}