// variables
const contador = document.querySelector(".contador");
const valor = document.querySelector(".valor");
const menu = document.querySelector("#menu");
const btnCerrar = document.querySelector(".close-btn");
const imagenes = document.querySelectorAll(".carrousel img");
const contenido = document.querySelector(".contenido");
const contenidoCarrito = document.querySelector('.cart-content');

let carrito = [];

// Eventos
eventListeners();
function eventListeners() {
  contador.addEventListener("click", incrementoDescremento);
  menu.addEventListener("click", mostrarMenu);
  btnCerrar.addEventListener("click", cerrarMenu);
  contenido.addEventListener("click", agregarCarrito);
  cambiarImagen();
}

// Funciones
function incrementoDescremento(e) {
  let resultado = parseInt(valor.textContent);
  if (e.target.classList.contains("plus")) {
    resultado++;
    valor.textContent = resultado;
    return;
  };

  if (e.target.classList.contains("minus") && resultado >= 1) {
    resultado--;
    valor.textContent = resultado;
    return;
  };
};

function mostrarMenu() {
  document.querySelector(".sidebar").classList.add("active");
  document.querySelector(".overlay").classList.add("active");
};

function cerrarMenu() {
  document.querySelector(".sidebar").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");
};

function cambiarImagen() {
  imagenes.forEach((imagen) => {
    imagen.addEventListener("click", () => {
      const ruta = imagen.src;
      document.querySelector(".galeria img").src = ruta;

      //  le quitamos el borde de todas las imágenes primero
      imagenes.forEach((img) => {
        img.style.border = "none";
      });

      // agregamos bordes
      imagen.style.border = "2px solid #ff7d1a";
    });
  });
};

function agregarCarrito(e) {
  if (e.target.closest(".agregar-carrito")) {
    const ubicacion = e.target.closest('.contenido');
    infoCarrito(ubicacion);
  };
};

function infoCarrito(contenido) {
  const precioElemento = contenido.querySelector(".precio");
  // Opción sencilla: tomar solo el primer nodo de texto antes del <span>
  const precioTexto = precioElemento.firstChild.textContent.trim(); // "$125.00"
  // Quitar el símbolo $ y convertir a número
  const precioNumero = parseFloat(precioTexto.replace("$", ""));

  const info = {
    id: Date.now(),
    imagen: contenido.querySelector(".galeria img").src,
    titulo: contenido.querySelector("h2").textContent,
    precio: precioNumero,
    cantidad:Number( contenido.querySelector('.contador span').textContent)
  };

    //agregar la informacion del objeto al carrito
    carrito = [...carrito, info];   

    // llamamos la funcion que crea la estructura del html
    carritoHTML();

};

function carritoHTML(){
  // limpiamos el html previo
    limpiarHTML();

    // valido si el carrito esta vacio para nuevamente mustrar el mensaje;
    if(carrito.length === 0){
      contenidoCarrito.innerHTML = '<p>Your cart is empty</p>';
      return;
    };

    carrito.forEach(item =>{
        const{id , imagen, titulo, precio, cantidad} = item;
        const resultado  = precio * cantidad;

        const div = document.createElement('DIV');
        div.classList.add('cart-item');
        div.dataset.id = id;

        div.innerHTML = `
            <img src="${imagen}" alt="Sneakers">
            <div class="cart-item-details">
                <p>${titulo}</p>
                <p>$${precio} x ${cantidad} <strong>$${resultado}</strong></p>
            </div>
            <button class="delete-btn">🗑</button>
        `;

        // boton elimiar
       const btnElimnar = div.querySelector('.delete-btn');
       btnElimnar.onclick = ()=>{
          eliminarProducto(id)
       }
      contenidoCarrito.appendChild(div);
       
    });

    // crear boton checkout
      const button = document.createElement('BUTTON');
      button.classList.add('checkout-btn');
      button.textContent = 'Checkout';
      contenidoCarrito.appendChild(button);

      // una vez agregado al carrito reseteamos la cantidad a 0
      valor.textContent = '0'
};

function limpiarHTML(){
    while(contenidoCarrito.firstChild){
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    };
};

function eliminarProducto(id){
  carrito = carrito.filter(item => item.id !== id);
  carritoHTML();
};
