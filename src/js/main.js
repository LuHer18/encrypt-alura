//constante

const keyVowels = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

//variables iniciales
let textInput = document.querySelector(".contenido-input-text");
let textOutPut = document.querySelector(".contenido-output-text");

//contenido activo-inactivo UI
let contentOutPut = document.querySelector(".container-contenido-output");
let circleElement = document.querySelector(".center")
let lockContainer = document.querySelector(".lock-container")

//botones
let onEncrypt = document.querySelector("#encrypt");
let onDecrypt = document.querySelector("#decrypt");
let onCopy = document.querySelector("#copy");


//validación

function validate(text) {
    let validation = Boolean(text.match(/[A-ZÀ-ÖØ-öø-ÿ\u00E0-\u00FC]/));
    return validation;
}

//funciones de encriptar y desencriptar
function encrypt(text) {
    if (validate(text) == true) {
        alert('Solo letras minusculas y sin acentos.');
        textInput.value = '';
        return '';
    } else {
        for (let i = 0; i < keyVowels.length; i++) {
            text = text.replaceAll(keyVowels[i][0], keyVowels[i][1]);
        }
        return text;
    }


}

function decrypt(text) {

    if (validate(text) == true) {
        alert('Solo letras minusculas y sin acentos.');
        textInput.value = '';
        return '';
    } else {
        for (let i = 0; i < keyVowels.length; i++) {
            text = text.replaceAll(keyVowels[i][1], keyVowels[i][0]);
        }
        return text;
    }
}

//funcion para mostrar elemento de la interfaz
function showContent() {
    if (textOutPut.value != "") {
        onCopy.classList.add("is-active")
        contentOutPut.classList.add("content")
        circleElement.classList.add("hidden")
        lockContainer.classList.add("hidden")

    } else {
        onCopy.classList.remove("is-active")
        contentOutPut.classList.remove("content")
        circleElement.classList.remove("hidden")
        lockContainer.classList.remove("hidden")
    };
}

//funcion copiar

async function copy(text) {
    try {
        await navigator.clipboard.writeText(text)
        alert('Contenido copiado al portapapeles')
    } catch (err) {
        alert('Error al copiar')
    }
}

//eventos de botones


onEncrypt.addEventListener("click", () => {
    textOutPut.value = encrypt(textInput.value);
    showContent();
})
onDecrypt.addEventListener("click", () => {
    validate(textInput.value);
    textOutPut.value = decrypt(textInput.value);
    showContent();
})
onCopy.addEventListener("click", () => {
    copy(textOutPut.value);
})


