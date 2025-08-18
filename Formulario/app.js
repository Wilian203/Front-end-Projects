// varibales
let inputNombre = document.querySelector('#nombre');
let inputEmail = document.querySelector('#email');
let inputPassword = document.querySelector('#password');
const formulario = document.querySelector('#formularioRegistro');

// eventos
inputNombre.addEventListener('input', validar);
inputPassword.addEventListener('input', validar);
inputEmail.addEventListener('input', validar);
formulario.addEventListener('submit', enviarMensaje);

// objeto que almacena los datos
const datos = {
    nombre:'',
    email:'',
    password:'',
};

// Funciones
function validar(e){
    // validar que los campos no esten vacios y si lo estan se muestra un mensaje de error
    if(e.target.value.trim() === ''){
        mostrarMensajeError(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        datos[e.target.name] = '';
        evaluarFormulario();
        return;
    }

    // validamos que el input que vamos a evaluar sea el de id email y comprobamos que sea un email valido
   if (e.target.id === 'email' && !comprobarEmail(e.target.value)) {
        mostrarMensajeError(`Debes ingresar un email válido`, e.target.parentElement);
        datos[e.target.name] = '';
        evaluarFormulario();
        return;
    }

    // validamos que el input sea el de password y establecemos un minimo de 6 caracteres
    if(e.target.id === 'password' && e.target.value.length < 6){
        mostrarMensajeError(`Minimo 6 caracteres permitidos`, e.target.parentElement);
        datos[e.target.name] ='';
        evaluarFormulario();
        return;
    }

    // una vez pase la validacion eliminamos el mensaje o la alerta
    limpiarAlerta(e.target.parentElement);

    // llenamos el objeto una vez las verificaciones sean correactas
    datos[e.target.name] = e.target.value.trim();
    evaluarFormulario();
};

function enviarMensaje(e){
    e.preventDefault();
    // limpiarmos el formulario
    resetarFormulario();
    // creamos el mensaje a mostar cuando el formulario este completo
    const p = document.createElement('p');
    p.classList.add('mensaje-exito');
    p.textContent= 'Mensaje Enviado Exitosamente!!!!!'
    const contenedor = document.querySelector('.form-container');
    contenedor.appendChild(p);

    evaluarFormulario();

};


function mostrarMensajeError(mensaje, referencia){
    // limpiamos el html previo para que no se repita la alerta
    limpiarAlerta(referencia);
    // creamos el elemeto html para mostrar el mensaje de error
    const span = document.createElement('span');
    span.classList.add('error-message');
    span.textContent = mensaje;

    // mostarmos el error en el formulario
   referencia.appendChild(span);

};

function limpiarAlerta(referencia){
    const alerta = referencia.querySelector('.error-message')
    if(alerta){
        alerta.remove();
    }
};

// funcion que valida que sea un email valido
function comprobarEmail(email){
    const regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return regexEmail.test(email);

};

function resetarFormulario(){
    // limpiamos el objeto
    datos.nombre = '';
    datos.email = '';
    datos.password = '';
 
    // limpiamos los imputs
    inputNombre.value = ''
    inputEmail.value = '';
    inputPassword.value = '';
};

function evaluarFormulario(){
   const boton = document.querySelector('.btn-submit');
   if(Object.values(datos).includes('')){
     boton.disabled = true;
     boton.classList.remove('activo');
     return;
   };

   boton.disabled = false;
   boton.classList.add('activo')
   
};