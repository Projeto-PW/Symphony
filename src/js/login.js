const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const btnCancelar = document.querySelectorAll(".btn-cancelar");

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