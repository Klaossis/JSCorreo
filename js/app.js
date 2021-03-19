// Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//Listeners
eventListeners();
function eventListeners() {
    // Cuando la app arranca
    document.addEventListener("DOMContentLoaded", iniciarApp);

    // Campos del formulario
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);
    
    // Enviar Email
    formulario.addEventListener("submit", enviarEmail);

    // Reinicia el formulario
    btnReset.addEventListener("click", resetearFormulario);
}


// Funciones 
function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// Valida el formulario
function validarFormulario(e) {
    // console.log(e.target.value);
    if (e.target.value.length > 0) {

        // Elimina el mensaje de error
        const error = document.querySelector("p.error");
        if(error) {error.remove();}

        // si todo los campos estan listos y el correo funciona
        e.target.classList.remove("border-red-500");
        e.target.classList.add("border", "border-green-500");

    } else {
        e.target.classList.remove("border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
    }

    // Comprobacion de que el email sea valido con una expresion regular.
    if (e.target.type === "email") {
        if (er.test(e.target.value)) {
            // Elimina el mensaje de error
            const error = document.querySelector("p.error");
            if(error) {error.remove();}

            // si todo los campos estan listos y el correo funciona
            e.target.classList.remove("border-red-500");
            e.target.classList.add("border", "border-green-500");
        } else {
            e.target.classList.remove("border-green-500");
            e.target.classList.add("border", "border-red-500");
            mostrarError("El email no es valido");
        }
    }
    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") { 
        btnEnviar.disable = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");        
    }

}

// mostrar

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border", "border-red-500", "background-color-100", "text-red-500", "p-3",
        "mt-5", "text-center", "error");

    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
        // formulario.insertBefore(mensajeError, document.querySelector(".mb-10"));
    }

}

// Envia el Email
function enviarEmail(e){
    e.preventDefault();

    // Mostrar el spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    // Despues de 2 segundos oculta el spinner y mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = "none";

        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje se envio correctamente.";
        parrafo.classList.add("text-center", "my-10","p-2", "bg-green-500","text-white", "font-bold", "uppercase")

        // Insertar el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)

        setTimeout( () => {
            parrafo.remove(); // Elimina el mensaje de exito.
            resetearFormulario();
        },5000);
    }, 2000);

}

function resetearFormulario(){
    formulario.reset();
    iniciarApp();
}