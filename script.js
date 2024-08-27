const botonEncriptar = document.querySelector(".btn-encriptar");
const botonDesencriptar = document.querySelector(".btn-desencriptar");
const botoncopiar = document.querySelector(".btn-copiar");
const textoEncriptar = document.querySelector(".cajatexto");
const alerta = document.querySelector(".texto-alerta");
const resultado = document.querySelector(".evaluar");
const imgmuneco = document.getElementById("img-muneco");
const textoInfouno = document.getElementById("textoInfouno");
const textoInfodos = document.getElementById("textoInfodos");
const tarjeta = document.getElementById("tarjeta-contenedor");

function mostrarAlerta(mensaje) {
    alerta.style.background = "#0A3871";
    alerta.style.color = "#FFFF";
    alerta.style.fontWeight = "800";
    alerta.textContent = mensaje;
    setTimeout(() => {
        alerta.removeAttribute("style");
    }, 1500);
}

function validarTexto(texto) {
    let txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    if (texto === "") {
        mostrarAlerta("El campo de texto no debe estar vacío");
        return false;
    } else if (texto !== txt) {
        mostrarAlerta("No debe tener acentos y caracteres especiales");
        return false;
    } else if (texto !== texto.toLowerCase()) {
        mostrarAlerta("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

function procesarTexto(texto, encriptar = true) {
    if (encriptar) {
        return texto.replace(/e/mg, "enter")
                    .replace(/i/mg, "imes")
                    .replace(/a/mg, "ai")
                    .replace(/o/mg, "ober")
                    .replace(/u/mg, "ufat");
    } else {
        return texto.replace(/enter/mg, "e")
                    .replace(/imes/mg, "i")
                    .replace(/ai/mg, "a")
                    .replace(/ober/mg, "o")
                    .replace(/ufat/mg, "u");
    }
}

function actualizarUI(textoProcesado) {
    resultado.innerHTML = textoProcesado;
    imgmuneco.style.display = "none";
    textoInfouno.style.display = "none";
    textoInfodos.style.display = "none";
    botoncopiar.style.visibility = "visible";
    botoncopiar.style.display = "block";
    tarjeta.classList.add("ajustar");
}

botonEncriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = textoEncriptar.value;
    if (validarTexto(texto)) {
        actualizarUI(procesarTexto(texto));
    }
});

botonDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = textoEncriptar.value;
    if (validarTexto(texto)) {
        actualizarUI(procesarTexto(texto, false));
    }
});

botoncopiar.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText(resultado.value)
        .then(() => {
            console.log("Texto copiado al portapapeles");
        })
        .catch(err => {
            console.error("Error al copiar texto: ", err);
        });
});
