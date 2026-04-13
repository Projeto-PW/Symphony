const participantes = [
    {
        nome: "Guilherme Ferreira Angelim",
        cargo: "Designer e diretor de ideias criativas",
        desc: "Estudante de análise e desenvolvimento de sistemas: segundo ano. Realizou a criação do design do projeto e coordenou ideias criativas.",
        foto: "../assets/Guilherme-icone.svg",
        background: "../assets/BG-gui.svg",
        gif: "../assets/gui-gif.gif",
        cor: "#FFBB00",
        linkedin: {
            img: "../assets/linkedin-laranja.svg",
            link: "https://www.linkedin.com/in/guilherme-ferreira-angelim-669224361/"
        },
        insta: {
            img: "../assets/insta-laranja.svg",
            link: "https://www.instagram.com/angelim._ofc/?next=%2F"
        },
        git: {
            img: "../assets/git-laranja.svg",
            link: "https://github.com/guilherme-angelim"
        }
    },
    {
        nome: "Henry Rodrigues Visone",
        cargo: "Designer",
        desc: "Estudante de análise e desenvolvimento de sistemas: segundo ano. Auxiliou no desenvolvimento do design da página",
        foto: "../assets/Henry-icone.svg",
        background: "../assets/BG-henry.svg",
        gif: "../assets/henry-gif.gif",
        cor: "#91FFDC",
        linkedin: {
            img: "../assets/linkedin-ciano.svg",
            link: "https://www.linkedin.com/in/henry-visone-4797b6364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        },
        insta: {
            img: "../assets/insta-transparente.svg",
            link: "#"
        },
        git: {
            img: "../assets/git-ciano.svg",
            link: "https://github.com/HenryVisone"
        }
    },
    {
        nome: "João Pedro Tirso",
        cargo: "Desenvolvedor Back-End",
        desc: "Estudante de análise e desenvolvimento de sistemas: segundo ano. Realizou o desenvolvimento dos bastidores do site(Back-End)",
        foto: "../assets/Tirso-icone.svg",
        background: "../assets/BG-tirso.svg",
        gif: "../assets/tirso-gif.gif",
        cor: "#009DFF",
        linkedin: {
            img: "../assets/linkedin-azul.svg",
            link: "https://www.linkedin.com/in/joão-pedro-tirso-844859380/"
        },
        insta: {
            img: "../assets/insta-azul.svg",
            link: "https://www.instagram.com/jptirso/"
        },
        git: {
            img: "../assets/git-azul.svg",
            link: "https://github.com/JPTirso"
        }
    },
    {
        nome: "Pedro Santaella",
        cargo: "Lider e desenvolvedor Back-End",
        desc: "Estudante de análise e desenvolvimento de sistemas: segundo ano. Coordenou a equipe e auxiliou no desenvolvimento back-end.",
        foto: "../assets/Santaella-icone.svg",
        background: "../assets/BG-santaella.svg",
        gif: "../assets/santaella-gif.gif",
        cor: "#048C00",
        linkedin: {
            img: "../assets/linkedin-verde.svg",
            link: "https://www.linkedin.com/in/pedro-santaella-616b51361?utm_source=share_via&utm_content=profile&utm_medium=member_android"
        },
        insta: {
            img: "../assets/insta-verde.svg",
            link: "https://www.instagram.com/pedrosantaella7?igsh=cTZ2OXlsa29ld2N5"
        },
        git: {
            img: "../assets/git-verde.svg",
            link: "https://github.com/pedr0xl77"
        }
    },
    {
        nome: "Lucas de Comi Côrte",
        cargo: "Vice-líder e desenvolvedor Full-Stack",
        desc: "Estudante de análise e desenvolvimento de sistemas: segundo ano. Auxiliou na organização interna da equipe, realizou o desenvolvimento da interface visual (front-end) e a funcionalidade do site (back-end)",
        foto: "../assets/Lucas-icone.svg",
        background: "../assets/BG-lucas.svg",
        gif: "../assets/Lucas-gif.gif",
        cor: "#048C00",
        linkedin: {
            img: "../assets/linkedin-verde.svg",
            link: "https://www.linkedin.com/in/lucas-de-comi-c%C3%B4rte-7090ba363/"
        },
        insta: {
            img: "../assets/insta-verde.svg",
            link: "https://www.instagram.com/lukinhas.insta/"
        },
        git: {
            img: "../assets/git-verde.svg",
            link: "https://github.com/LucasDeComi"
        }
    }
];
const container = document.querySelector(".desenvolvedores-container");

participantes.forEach(card => {
    const newCard = document.createElement("div");
    newCard.classList.add("dev-card");
    newCard.style.background = `url(${card.background}) center/cover no-repeat`;
    newCard.innerHTML = `
        <img src="${card.foto}" alt="foto do desenvolvedor" class="foto-dev">
        <div class="conteudo">
            <div class="text">
                <h1 class="nome">${card.nome}</h1>
                <h2 class="cargo" style="color: ${card.cor}">${card.cargo}</h2>

                <p>${card.desc}</p>

                <div class="nav-icones">
                    <ul>
                        <li><a href="${card.linkedin.link}" ${card.linkedin.link == "#" ? "" : "target='_blank'"}><img src="${card.linkedin.img}" class="icons"></a></li>
                        <li><a href="${card.insta.link}" ${card.insta.link == "#" ? "" : "target='_blank'"}><img src="${card.insta.img}" class="icons"></a></li>
                        <li><a href="${card.git.link}" ${card.git.link == "#" ? "" : "target='_blank'"}><img src="${card.git.img}" class="icons"></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <img src="${card.gif}" class="gif">
    `;
    container.append(newCard);
});