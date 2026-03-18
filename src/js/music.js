const page = window.location.pathname.split("/").pop(); //devolve o nome do documento, separando o título.
const src = page == "index.html" || page == "" ? "./src" : ".."
const songs = [
    {
        id: 1,
        nome: "One Way Dream",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_One_Way_Dream.mp3`,
        next: 2
    },
    {
        id: 2,
        nome: "Break Through It All",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_Break_Through_It_All.mp3`,
        next: 3
    },
    {
        id: 3,
        nome: "Find Your Flame",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_Find_Your_Flame.mp3`,
        next: 4
    },
    {
        id: 4,
        nome: "Undefeatable",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_Undefeatable.mp3`,
        next: 5
    },
    {
        id: 5,
        nome: "Im Here",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_Im_Here.mp3`,
        next: 6
    },
    {
        id: 6,
        nome: "Live And Learn",
        artista: "SEGA SOUND TEAM",
        capa: `${src}/assets/sonicFrontiersCapa.webp`,
        audio: `${src}/assets/audio/Sonic_Frontiers_OST_Live_and_Learn.mp3`,
        next: 1
    }
];

let audio = new Audio();
let replay = false;
let currentSong;
let nextSong;
let playedSongs = 0;

const albumImg = document.getElementById("albumImg");
const songTitle = document.querySelector(".info-text").querySelector("h2");
const songArtist = document.querySelector(".info-text").querySelector("h3");
const durationText = document.getElementById("tempoTotal");
const currentTimeText = document.getElementById("tempoAtual");

function loadSong(id) {
    songs.forEach(song => {
        if(song.id == id) {
            audio.pause();
            audio.currentTime = 0;
            audio.src = song.audio;
            audio.load();
            currentSong = song.id;
            nextSong = song.next;
            localStorage.setItem("currentSong", song.id);
            albumImg.style.backgroundImage = `url(${song.capa})`;
            songTitle.innerText = song.nome;
            songArtist.innerText = song.artista;
            currentTimeText.innerText = "0:00";
    

            audio.onloadeddata = () => {
                const durationTime = audio.duration;
                const minutes = Math.floor(durationTime / 60);
                const seconds = Math.floor(durationTime - (minutes * 60));
                durationText.innerText = `${minutes}:${String(seconds).padStart(2, "0")}`;
            };
        }
    });
}

audio.addEventListener("ended", () => {
    if(!replay) {
        btnPlay.querySelector("img").src = `${src}/assets/play.svg`;
        clearInterval(updateTime);
        selSong(nextSong);
    }
    else {
        audio.currentTime = 0;
        playSong();
        toggleReplay();
    }
});

window.addEventListener("load", () => {
    const songId = localStorage.getItem("currentSong")
    loadSong(songId == null ? 1 : songId);    
});

function selSong(id) {
    loadSong(id);
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
        btnPlay.querySelector("img").src = `${src}/assets/pause.svg`;
        updateTime = setInterval(() => {
            updateCurrentTime();
        }, 100);
    }
    else {
        audio.pause();
        btnPlay.querySelector("img").src = `${src}/assets/play.svg`;
        updateTime = clearInterval(updateTime);
    }
}

function skipSong(d) {
    if(d > 0) {
        selSong(nextSong);
        document.getElementById("btnMusicaAnterior").disabled = false;
        playedSongs++;
    }
    else {
        playedSongs--;
        songs.forEach(song => {
            if(song.next == currentSong) {
                selSong(song.id);
                if(playedSongs == 0) {
                    document.getElementById("btnMusicaAnterior").disabled = true;
                }
            }
        });
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
    btnReplay.querySelector("img").src = `${src}/assets/replay${replay ? "Sel" : ""}.svg`;
}