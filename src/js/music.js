const page = window.location.pathname.split("/").pop(); //devolve o nome do documento, separando o título. Se for index, vai retornar ""
const songs = [
    {
        nome: "Keys to the Kingdom",
        artista: "Linkin Park",
        capa: `${page == "" ? "./src/assets/capaTeste.webp" : "../assets/capaTeste.webp"}`,
        audio: `${page == "" ? "./src/assets/audio/Teste.mp3" : "../assets/audio/Teste.mp3"}`
    },
    {
        nome: "Come As You Are",
        artista: "Nirvana",
        capa: `${page == "" ? "./src/assets/capaTeste2.webp" : "../assets/capaTeste2.webp"}`,
        audio: `${page == "" ? "./src/assets/audio/Teste2.mp3" : "../assets/audio/Teste2.mp3"}`
    }
];

var songIndex = 0;
let audio = new Audio();
let replay = false

const albumImg = document.getElementById("albumImg");
const songTitle = document.querySelector(".info-text").querySelector("h2");
const songArtist = document.querySelector(".info-text").querySelector("h3");
const durationText = document.getElementById("tempoTotal");
const currentTimeText = document.getElementById("tempoAtual");

function loadSong(song) {
    audio.pause();
    audio.currentTime = 0;
    audio.src = songs[song].audio;
    audio.load();
    albumImg.style.backgroundImage = `url(${songs[song].capa})`;
    songTitle.innerText = songs[song].nome;
    songArtist.innerText = songs[song].artista;
    currentTimeText.innerText = "0:00";

    audio.addEventListener("loadedmetadata", () => {
        const durationTime = audio.duration;
        const minutes = Math.floor(durationTime / 60);
        const seconds = Math.floor(durationTime - (minutes * 60));
        durationText.innerText = `${minutes}:${String(seconds).padStart(2, "0")}`;
    });

    audio.addEventListener("ended", () => {
        if(!replay) {
            btnPlay.querySelector("img").src = "./src/assets/play.svg";
            clearInterval(updateTime);
            selSong(songIndex + 1);
        }
        else {
            audio.currentTime = 0;
            playSong();
            toggleReplay();
        }
    });
}

window.addEventListener("load", () => {
    loadSong(songIndex);    
});

function selSong(index) {
    const nextIndex = songIndex + index;

    if(nextIndex < 0 || nextIndex >= songs.length) {
        alert(`Não há mais músicas ${index >= songs.length ? "depois" : "antes"} dessa`);
        return;  
    }
    songIndex = nextIndex;
    loadSong(songIndex);
    playSong();
}

const timeline = document.querySelector(".timeline");
const timelineDiv = timeline.closest("div");
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
        btnPlay.querySelector("img").src = `.${page == "" ? "./src" : "."}/assets/pause.svg`;
        updateTime = setInterval(() => {
            updateCurrentTime();
        }, 100);
    }
    else {
        audio.pause();
        btnPlay.querySelector("img").src = `.${page == "" ? "./src" : "."}/assets/play.svg`;
        updateTime = clearInterval(updateTime);
    }
}

timelineDiv.addEventListener("pointermove", () => {
    document.querySelector(".time-music").classList.add("hover")
});

timelineDiv.addEventListener("pointerleave", () => {
    document.querySelector(".time-music").classList.remove("hover")
});

timelineDiv.addEventListener("click", (e) => {
    const rect = timeline.getBoundingClientRect();
    const timelineWidth = timeline.clientWidth;
    const distance = e.clientX - rect.left;
    const duration = audio.duration;
    audio.currentTime = (duration * distance) / timelineWidth;
    updateCurrentTime();
});

const btnReplay = document.getElementById("btnReplay");

function toggleReplay() {
    replay = !replay;
    btnReplay.querySelector("img").src = `.${page == "" ? "./src" : "."}/assets/replay${replay ? "Sel" : ""}.svg`;
}