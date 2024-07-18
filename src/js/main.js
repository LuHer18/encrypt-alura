/* import Swal from 'sweetalert2/dist/sweetalert2.js' */
/* import 'sweetalert2/src/sweetalert2.scss' */

//constante

const keyVowels = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

//variables iniciales
let textInput = document.querySelector(".contenido-input-text");
let textOutPut = document.querySelector(".contenido-output-text");

//contenido activo-inactivo UI
let contentOutPut = document.querySelector(".container-contenido-output");
let circleElement = document.querySelector(".center")
let closedLock = document.getElementById('closed-lock');
let openLock = document.getElementById('open-lock');

//botones
let onEncrypt = document.querySelector("#encrypt");
let onDecrypt = document.querySelector("#decrypt");
let onCopy = document.querySelector("#copy");

//alerta
function customAlert () {
    return Swal.fire({
        titleText: 'Solo letras minusculas y sin acentos.',
        icon: 'warning',
        background: '#051330',
        color: '#F5A900',
        confirmButtonColor: '#F5A900'
      })
}

//validación

function validate(text) {
    let validation = Boolean(text.match(/[A-ZÀ-ÖØ-öø-ÿ\u00E0-\u00FC]/));
    return validation;
}

//funciones de encriptar y desencriptar
function encrypt(text) {
    if (validate(text) == true) {
        customAlert();
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
        customAlert();
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
        closedLock.classList.add("hidden")
        setTimeout(() => {
            openLock.classList.remove('hidden');
          }, 400);
          setTimeout(() => {
            openLock.classList.add('hidden');
            openLock.style.display = 'none';
          }, 800);

    } else {
        onCopy.classList.remove("is-active")
        contentOutPut.classList.remove("content")
        circleElement.classList.remove("hidden")
        closedLock.classList.remove("hidden")
        openLock.classList.add('hidden');
        openLock.style.display = 'block';
    };
}

//funcion copiar

async function copy(text) {
    try {
        await navigator.clipboard.writeText(text)
        Swal.fire({
            titleText: 'Texto copiado en el portapapel',
            icon: 'success',
            background: '#051330',
            color: '#F5A900',
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
            

        })
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


