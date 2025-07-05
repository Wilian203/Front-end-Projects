  document.addEventListener("DOMContentLoaded", function () {
  
    swiper();
    mapa();
   

    // seleccionar las variables
    const listaProductos = document.querySelector('#lista-productos');
    const listaCarrito = document.querySelector('#lista-carrito tbody');
    const carrito = document.querySelector('#carrito');
    const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

 
    let articulosDelCarrito = [];

    // eventos
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      articulosDelCarrito = [];
      limpiarHTML();
    });
   

    function agregarProducto(e){
      e.preventDefault();

      if(e.target.classList.contains('agregar-carrito')){
        informacionDelProducto(e.target.parentElement.parentElement);
      };
    };

    function eliminarProducto(e){
      // obtenemos el boton que elimina los cursos
      if(e.target.classList.contains('borrar-curso')){
          const botonid = e.target.getAttribute('data-id');

         articulosDelCarrito = articulosDelCarrito.filter(producto => producto.id !== botonid )
      };

      carritoHTML();      
    };


    function informacionDelProducto(producto){
      const infoProducto = {
        imagen  : producto.querySelector('img').src,
        nombre  : producto.querySelector('h3').textContent,
        precio  : producto.querySelector('p').textContent,
        id      : producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
      };

      const productoExiste =  articulosDelCarrito.find(producto => producto.id === infoProducto.id)
      if(productoExiste){
        productoExiste.cantidad += 1;
      }else{
        articulosDelCarrito = [...articulosDelCarrito,infoProducto];
      };
      
      carritoHTML();
      
    };


    function carritoHTML(){
      limpiarHTML();
      articulosDelCarrito.forEach((producto)=>{
        const{imagen, nombre, precio , id, cantidad} = producto;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
              <img src="${imagen}"/>
          </td>

          <td>${nombre}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>
              <a href="#" class="borrar-curso" data-id="${id}">X</a>
          </td>
        
        `;

        listaCarrito.appendChild(tr);
      });
    };


    function limpiarHTML(){
       // forma rapida
     while(listaCarrito.firstChild) {
          listaCarrito.removeChild(listaCarrito.firstChild);
      };
    };

    function swiper() {
      let swiper = new Swiper(".mySwiper", {
        cssMode: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
      });
    };


    function mapa() {
      const map = L.map('map').setView([18.7357, -70.1627], 8); // Centro de RD

      // Estilo claro minimalista
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      const puntos = [
        { ciudad: 'Santo Domingo', lat: 18.4861, lng: -69.9312, color: "#e63946" },
        { ciudad: 'Santiago', lat: 19.45, lng: -70.7, color: "#f1c40f" },
        { ciudad: 'La Romana', lat: 18.43, lng: -68.97, color: "#2ecc71" },
        { ciudad: 'San Cristóbal', lat: 18.42, lng: -70.11, color: "#9b59b6" },
        { ciudad: 'San Pedro', lat: 18.46, lng: -69.30, color: "#3498db" }
      ];

      puntos.forEach(punto => {
        L.circleMarker([punto.lat, punto.lng], {
          radius: 8,
          color: punto.color,
          fillColor: punto.color,
          fillOpacity: 0.9
        }).addTo(map).bindPopup(`<strong>${punto.ciudad}</strong>`);
      });
    };


    // formulario
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const botonEnviar =  document.querySelector('#boton-enviar');
    const botonResetear =  document.querySelector('#boton-resetar')
    const spinner = document.querySelector('#spinner')

    
    // Datos del formulario para validar todos los campos a la vez y activar el boton de enviar
    const datos = {
      email: '',
      asunto: '',
      mensaje: ''
    };

    // enventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

  
      botonResetear.addEventListener('click', function(e){
      e.preventDefault
      resetearFormulario();
    });

    function enviarEmail(e){
      e.preventDefault();
      spinner.style.opacity = '1';

      setTimeout(()=>{
        spinner.style.opacity = '0';
        resetearFormulario();

        // creamos un mensaje de envido
        const mensajeEnviado =  document.createElement('P');
        mensajeEnviado.textContent = 'Mensaje enviado exitosamente!!!';
        mensajeEnviado.classList.add('mensaje');

        formulario.appendChild(mensajeEnviado);
          setTimeout(()=>{
          mensajeEnviado.remove();
        },3000)
      },3000)
    }
    function validar(e){
        if(e.target.value === ""){
          mostrarAlerta(`El campo ${e.target.id} esta vacio`, e.target.parentElement);
          datos[e.target.name] = '';
          comprobarEmail();
          return;
        };

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
          mostrarAlerta('El email no es valido', e.target.parentElement);
          datos[e.target.name] = '';
          comprobarEmail();
          return;
        };

        limpiarAlerta(e.target.parentElement);

        // una vez que cada input pasen las validaciones llenamos el objeto con los datos
        datos[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    };

    function mostrarAlerta(mensaje, referencia){
      limpiarAlerta(referencia);
      // crear mensaje de error
      const mensajeError = document.createElement('P');
      mensajeError.textContent = mensaje;
      mensajeError.classList.add('error');

      referencia.appendChild(mensajeError);
    }

    function limpiarAlerta(referencia){
        // limpiamos el error para que no se repita
        const errorExiste =  referencia.querySelector('.error')
        if(errorExiste){
          errorExiste.remove();
        }
    };

    function validarEmail(email){
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const resultado = regex.test(email);
      return resultado;
      
    };

    function comprobarEmail(){
        if((Object.values(datos).includes(''))){
            botonEnviar.style.opacity = '0.5';
            botonEnviar.style.cursor = 'not-allowed';
            botonEnviar.disabled = true;
            return;
        }
          botonEnviar.style.opacity = '1';
          botonEnviar.style.cursor = 'pointer';
          botonEnviar.disabled = false;
    };

      function resetearFormulario(){
        datos.email = '';
        datos.asunto = '';
        datos.mensaje = '';
        comprobarEmail();

        formulario.reset();
    }


});

