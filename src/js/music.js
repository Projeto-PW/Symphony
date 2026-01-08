const songs = [
    {
        nome: "Keys to the Kingdom",
        artista: "Linkin Park",
        capa: "./src/assets/capaTeste.webp",
        audio: new Audio("./src/assets/audio/Teste.mp3")
    }
];

const audio = songs[0].audio;
audio.load();
const albumImg = document.getElementById("albumImg");
const songTitle = document.querySelector(".info-text").querySelector("h2");
const songArtist = document.querySelector(".info-text").querySelector("h3");
const durationText = document.getElementById("tempoTotal");
const currentTimeText = document.getElementById("tempoAtual");
albumImg.style.backgroundImage = `url(${songs[0].capa})`;
songTitle.innerText = songs[0].nome;
songArtist.innerText = songs[0].artista;
currentTimeText.innerText = "0:00";

audio.addEventListener("loadedmetadata", () => {
    const durationTime = audio.duration;
    const minutes = Math.floor(durationTime / 60);
    const seconds = Math.floor(durationTime - (minutes * 60));
    durationText.innerText = `${minutes}:${String(seconds).padStart(2, "0")}`;
});

const timeline = document.querySelector(".timeline");
const timeball = document.querySelector(".time-ball");

function updateCurrentTime() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const timelineWidth = timeline.clientWidth;
    const distance = (currentTime * timelineWidth) / duration;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime - (minutes * 60));
    currentTimeText.innerText = `${minutes}:${String(seconds).padStart(2, "0")}`;
    timeline.querySelector(".current-time").style.width = `${distance}px`;
    timeball.style.left = `${distance}px`;
}

let updateTime;
function playSong() {
    const btnPlay = document.getElementById("btnPlay");
    if(audio.paused) {
        audio.play();
        btnPlay.querySelector("img").src = "./src/assets/pause.svg";
        updateTime = setInterval(() => {
            updateCurrentTime();
        }, 100);
    }
    else {
        audio.pause();
        btnPlay.querySelector("img").src = "./src/assets/play.svg";
        updateTime = clearInterval(updateTime);
    }
}

timeline.addEventListener("pointermove", () => {
    document.querySelector(".time-music").classList.add("hover")
});

timeline.addEventListener("pointerleave", () => {
    document.querySelector(".time-music").classList.remove("hover")
});

timeline.addEventListener("click", (e) => {
    const rect = timeline.getBoundingClientRect();
    const timelineWidth = timeline.clientWidth;
    const distance = e.clientX - rect.left;
    const duration = audio.duration;
    audio.currentTime = (duration * distance) / timelineWidth;
    updateCurrentTime();
})

audio.addEventListener("ended", () => {
    btnPlay.querySelector("img").src = "./src/assets/play.svg";
});