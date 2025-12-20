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

const progress = document.querySelector(".slideshow-progress").querySelector("span");
for(let i = 0; i < slides.length; i++) {
    const newSlide = document.createElement("span");
    const newCounter = document.createElement("span");
    document.querySelector(".slideshow-images").appendChild(newSlide);
    document.querySelector(".slideshow-counter").appendChild(newCounter);
    newSlide.innerText = slides[i].nome;
    newSlide.style.background = slides[i].cor;
    newCounter.id = `counter${i}`;
    newCounter.addEventListener("click", () => autoScroll(i));
    if(i == 0) {
        newCounter.classList.add("selected");
    }
}
progress.style.width = `${100 / slides.length}%`;

let autoScrolling = false;

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

function autoScroll(index) {
    const slide = document.getElementById(`counter${index}`);
    const slideWidth = slideshow.clientWidth;
    for(let i = 0; i < slides.length; i++) {
        document.getElementById(`counter${i}`).classList.remove("selected");
    }
    slide.classList.add("selected");
    autoScrolling = true;
    slideshow.scrollTo({
        left: index * slideWidth,
        behavior: "smooth"
    });
    waitScrollEnd(slideshow, () => {
        autoScrolling = false;
    })
}

let timeout;
const slideshow = document.querySelector(".slideshow-images");
slideshow.addEventListener("scroll", () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const slideWidth = slideshow.clientWidth;
        const progressBarWidth = document.querySelector(".slideshow-progress").clientWidth;
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
        console.log(distance);
    }, 10);
});
