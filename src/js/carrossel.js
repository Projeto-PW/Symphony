const carrossel = document.querySelector(".carrossel-list");
const selectGame = document.querySelector(".selected-game");
const logoGame = document.getElementById("logoGame");
const descGame = document.getElementById("descGame");
const wikiLink = document.getElementById("wikiLink");
const musicLink = document.getElementById("musicLink");
const games = [
  {
    desc: "A franquia Sonic é uma série de jogos e mídias criada pela Sega, centrada no personagem Sonic the Hedgehog, um ouriço azul conhecido por sua velocidade extraordinária. Lançada em 1991, a franquia surgiu como resposta direta ao sucesso da Mario, da Nintendo, tornando-se rapidamente um dos maiores ícones dos videogames. Ao longo dos anos, a série se expandiu muito além dos jogos de plataforma originais, incluindo desenhos animados, quadrinhos, filmes e diversos gêneros de jogos. A narrativa geralmente acompanha Sonic e seus amigos enfrentando o vilão Dr. Eggman, que busca dominar o mundo com tecnologia avançada. Com uma estética marcante, trilhas sonoras memoráveis e jogabilidade focada em velocidade, a franquia Sonic se consolidou como uma das mais influentes e reconhecidas da cultura pop.",
    logo: "./src/assets/logoSonic.webp",
    wiki: {
      link: "./src/pages/wikiSonic.html",
      img: "./src/assets/sonicGameWikiLink.webp"
    },
    musica: {
      link: "./src/pages/musicasSonic.html",
      img: "./src/assets/sonicGameMusicLink.webp"
    }
  },
  {
    desc: "Revengeance é um jogo de ação desenvolvido pela PlatinumGames em parceria com a Konami, lançado em 2013 como um spin-off da famosa franquia Metal Gear. A história acompanha Raiden, um ciborgue ninja que luta contra organizações militares privadas em um mundo marcado por guerras controladas por interesses econômicos. Diferente dos títulos principais da série, criados por Hideo Kojima, o jogo foca muito mais em combates rápidos e intensos do que em furtividade, introduzindo mecânicas como o corte livre com espada (Blade Mode), que permite fatiar inimigos com precisão. Com uma narrativa que mistura filosofia, política e identidade, além de uma trilha sonora marcante e batalhas épicas, Metal Gear Rising se destacou pelo estilo exagerado e dinâmico, tornando-se um título cult entre fãs de jogos de ação.",
    logo: "./src/assets/logoMetalgear.webp",
    wiki: {
      link: "./src/pages/wikiMetalgear.html",
      img: "./src/assets/metalgearWikiLink.webp"
    },
    musica: {
      link: "./src/pages/musicasMetalgear.html",
      img: "./src/assets/metalgearMusicLink.webp"
    }
  },
  {
    desc: "A franquia Devil May Cry é uma série de jogos de ação desenvolvida principalmente pela Capcom, conhecida por seu estilo acelerado, combate estiloso e narrativa com elementos sobrenaturais. Lançada em 2001, a saga acompanha principalmente Dante, um caçador de demônios carismático que enfrenta criaturas infernais enquanto lida com sua própria origem meio humana e meio demoníaca. Ao longo dos jogos, outros personagens importantes ganham destaque, como Vergil, irmão de Dante, e Nero, um jovem guerreiro com poderes especiais. A franquia se destaca pelo sistema de combate profundo, que recompensa criatividade e combos variados, além de uma estética marcante, trilha sonora intensa e temas que envolvem poder, redenção e conflito familiar. Com o tempo, Devil May Cry se consolidou como uma das principais referências do gênero hack and slash na indústria dos videogames.",
    logo: "./src/assets/logoDmc.webp",
    wiki: {
      link: "./src/pages/wikiDmc.html",
      img: "./src/assets/dmcWikiLink.webp"
    },
    musica: {
      link: "./src/pages/musicasDmc.html",
      img: "./src/assets/dmcMusicLink.webp"
    }
  },
];
let isScrolling = false;

function carrosselScroll(d) {
  if (isScrolling) return;
  isScrolling = true;
  const carrosselItems = document.querySelectorAll(".carrossel-item");
  const itemWidth = carrosselItems[0].offsetWidth;
  const itemGap = parseFloat(getComputedStyle(carrossel).gap);
  const step = itemWidth + itemGap; // Soma da largura do item ao gap
  carrossel.scrollBy({
    left: d * step,
    behavior: "smooth",
  });
  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

function openGame(game) {
  selectGame.style.display = "flex";
  logoGame.src = game.logo;
  descGame.innerText = game.desc;
  wikiLink.href = game.wiki.link;
  wikiLink.querySelector("img").src = game.wiki.img;
  musicLink.href = game.musica.link;
  musicLink.querySelector("img").src = game.musica.img;
}

document.querySelectorAll(".carrossel-item").forEach((item) => {
    item.addEventListener("click", () => {
        const idItem = parseInt(item.id.split("item")[1]) - 1;
        openGame(games[idItem]);
    });
});
