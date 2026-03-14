const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const invalidEmail = document.getElementById("invalidEmail");
const invalidPassword = document.getElementById("invalidPassword");
const users = [
    {
        email: "adm@adm.com",
        senha: "adm123"
    }
]

inputEmail.addEventListener("input", () => {
    if(inputEmail.value.length > 0)
        inputEmail.closest("div").querySelector(".btn-cancelar").classList.add("on");
    else
        inputEmail.closest("div").querySelector(".btn-cancelar").classList.remove("on");
});
inputSenha.addEventListener("input", () => {
    if(inputSenha.value.length > 0)
        inputSenha.closest("div").querySelector(".btn-cancelar").classList.add("on");
    else
        inputSenha.closest("div").querySelector(".btn-cancelar").classList.remove("on");
});

function limparTexto(btn) {
    btn.closest("div").querySelector("input").value = "";
    btn.classList.remove("on");
}

function login() {
    users.forEach(user => {
        if(inputEmail.value == user.email) {
            if(inputSenha.value == user.senha) {
                window.location.href = "../../index.html";
            }
            else {
                inputSenha.value = "";
                invalidPassword.style.display = "inline-block";
            }
        }
        else {
            inputEmail.value = "";
            invalidEmail.style.display = "inline-block";
            if(inputSenha.value != user.senha) {
                inputSenha.value = "";
                invalidPassword.style.display = "inline-block";
            }
        }
    })
}