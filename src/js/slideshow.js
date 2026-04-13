const slides = ["./src/assets/dmcSlide.svg", "./src/assets/metalgearSlide.svg", "./src/assets/sonicSlide.svg", "./src/assets/ultrakillSlide.svg", "./src/assets/ghostSlide.svg", "./src/assets/personaSlide.svg"];
const progressBar = document.querySelector(".slideshow-progress");
const progress = progressBar.querySelector("span");
let slidesLoaded = 0;
let slideLoop = 0;
let scrollLoop;
scrollLoop = setInterval(() => {
    slideLoop++;
    if(slideLoop >= slides.length) {
        slideLoop = 0;
    }
    autoScroll(slideLoop, true);
}, 2000);

for(let i = 0; i < slides.length; i++) {
    const img = new Image();
    img.src = slides[i];
    img.onload = () => {
        slidesLoaded++;
        if(slidesLoaded == slides.length) {
            initSlides();
            // Primeiro as imagens são carregadas. Quando todas já foram carregadas, são associadas a um item no slideshow.
        }
    }
}

function initSlides() {
    for(let i = 0; i < slides.length; i++) {
        const newSlide = document.createElement("span");
        const newCounter = document.createElement("span");
        document.querySelector(".slideshow-images").appendChild(newSlide);
        document.querySelector(".slideshow-counter").appendChild(newCounter);
        newSlide.style.backgroundImage = `url(${slides[i]})`
        newCounter.id = `counter${i}`;
        newCounter.addEventListener("click", () => autoScroll(i, true));
        if(i == 0) {
            newCounter.classList.add("selected");
        }
    }
    progress.style.width = `${100 / slides.length}%`;
}

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
    slideLoop = index;
    slide.classList.add("selected");
    autoScrolling = true;
    slideshow.scrollTo({
        left: index * slideWidth,
        behavior: smooth ? "smooth" : "auto"
    });
    waitScrollEnd(slideshow, () => {
        slideLoop = index;
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
    let index = Math.floor((xPosition / rect.width) * slides.length);
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