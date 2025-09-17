document.addEventListener('DOMContentLoaded', function(){

const datos= {
    nombre:'',
    telefono:'',
    email:'',
    mensaje: '',
    
}

// Variables
const inputNombre = document.getElementById('nombre');
const inputTelefono = document.getElementById('telefono');
const inputEmail = document.getElementById('email');
const inputMensaje = document.getElementById('mensaje');
const formulario = document.querySelector('.formulario')

const modal = document.querySelector('#modal');

// eventos

inputNombre.addEventListener('input', validar);
inputTelefono.addEventListener('input', validar);
inputEmail.addEventListener('input', validar);
inputMensaje.addEventListener('input', validar);

formulario.addEventListener('submit',(e)=>{
   e.preventDefault();

   const { nombre, telefono, email, mensaje } = datos;

    // Validamos todos los campos
    if(nombre.trim() === '' || telefono.trim() === '' || email.trim() === '' || mensaje.trim() === ''){
        mostrarAlerta('Todos los campos son obligatorios', formulario); // Puedes mostrar alerta general
        return;
    }

    // Si todo está correcto, mostramos el modal
    mensajeEnviado();
   
});


function validar(e){
    if(e.target.value.trim() === ''){
       mostrarAlerta(`El campo ${e.target.id} esta vacio`,e.target.parentElement);
        return;
    }
    limpiarAlerta(e.target.parentElement); 
    datos[e.target.id] = e.target.value.trim(); // Guardamos el valor válido

};

function mostrarAlerta(mensaje,referencia){
    limpiarAlerta(referencia);
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    referencia.appendChild(alerta)

}

function limpiarAlerta(referencia){
    const alertaExistente = referencia.querySelector('.alerta');
    if(alertaExistente){
        alertaExistente.remove();
    };
};

function mensajeEnviado(){
    inputNombre.value = '';
    inputMensaje.value = '';
    inputTelefono.value= '';
    inputEmail.value = '';

    modal.classList.add('activo');

    setTimeout(()=>{
        modal.remove();
    },3000)
}
});