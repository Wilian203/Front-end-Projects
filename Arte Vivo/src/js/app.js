document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});


// variables
const nombre = document.querySelector('#nombre');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('.formulario');


const datos ={
    nombre: '',
    email: '',
    mensaje: ''
}

// eventos
nombre.addEventListener('input', validarCampo);
email.addEventListener('input', validarCampo);
mensaje.addEventListener('input', validarCampo);

// galeria de imagenes
function crearGaleria() {
    const galeria = document.querySelector('.galeria__imagenes');
    let cantidadDeImagenes = 4;

    for(let i = 1; i <= cantidadDeImagenes; i++){
        
         const contenedor = document.createElement('DIV');
         contenedor.classList.add('galeria__item'); 
 
        
         const imagen = document.createElement('PICTURE');
         imagen.innerHTML = ` 
            <source srcset = "build/img/productos/${i}.avif"type="image/avif" alt="producto">
            <source srcset = "build/img/productos/${i}.webp"type="image/webp" alt="producto">
            <img loading ="lazy" src="build/img/productos/${i}.jpg"width ="500" height ="300" alt="producto">
            `
 
        
         const parrafo = document.createElement('P');
         parrafo.textContent = `Item ${i}`;
 
        
         contenedor.appendChild(imagen);
         contenedor.appendChild(parrafo);
 
         
         galeria.appendChild(contenedor);
    };
};

// validar formulario


formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    const{nombre, email , mensaje} = datos;

    if(nombre === '' || email === '' | mensaje === ''){
       limpiarError(e.target.parentElement);
       const parrafo = document.createElement('P');
       parrafo.textContent = 'Debes llenar todos los campos';
       parrafo.classList.add('error');
       formulario.appendChild(parrafo)
       return;
    }

    limpiarCampos();
    limpiarError(e.target.parentElement);
    mostrarModal();




   
})

function validarCampo(e){
    if(e.target.value === ''){
      mostrarError(`El campo ${e.target.id} esta vacio`, e.target.parentElement);
      return;
    };

    if(e.target.id === 'email'){
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
       if(!emailRegex.test(e.target.value.trim())){
            mostrarError('Ingrese un email valido', e.target.parentElement)
            return;
       };
    };


    limpiarError(e.target.parentElement);

    datos[e.target.id] = e.target.value;
    console.log(datos)
};


function mostrarError(mensaje,referencia){
    limpiarError(referencia);
    const parrafo = document.createElement('P');
    parrafo.textContent = mensaje;
    parrafo.classList.add('error');
    
    referencia.appendChild(parrafo);

}

function limpiarError(referencia){
    const error = referencia.querySelector('.error');

    if(error){
        error.remove();
    }
};

function limpiarCampos(){
    nombre.value = '';
    email.value = '';
    mensaje.value = '';


};

function mostrarModal() {
    const modal = document.getElementById('mensajeModal');
    modal.classList.add('show');
  
    // Ocultar el modal después de 4 segundos (puedes cambiar este tiempo)
    setTimeout(() => {
      modal.classList.remove('show');
    }, 4000);
  }
  
 

