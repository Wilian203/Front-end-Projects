// variabales
const listaProductos = document.querySelector('#lista-productos');
const tbody = document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let carritoProductos = [];

eventos();
function eventos(){
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto)
    vaciarCarritoBtn.addEventListener('click', () =>{
        carritoProductos = [];
        limpiarHTML();

    })
};

function agregarProducto(e){
   e.preventDefault();  
    if(e.target.classList.contains('agregar-carrito')){
        const contenedorDelProducto = e.target.parentElement.parentElement;
        informacionDelProducto(contenedorDelProducto);
    };
};

function informacionDelProducto(producto){
   const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        cantidad: 1,
        id: producto.querySelector('.producto').getAttribute('data-id')
   };

   const productoExiste = carritoProductos.find(producto => producto.id ===  infoProducto.id);

   if(productoExiste){
      productoExiste.cantidad += 1;
   }else{
     carritoProductos = [...carritoProductos, infoProducto];
   }

   carritoHTML();
  

};

function eliminarProducto(e){
    e.preventDefault();
  if(e.target.classList.contains('borrar-producto')){
    const productoID = e.target.getAttribute('data-id');
    // Uso filter en vez de find porque filter no crea un nuevo arreglo y al momento de agregar productos al arreglo nuevamente
    // no me deja mientras que filter elimina el producto que deseo eliminar y me crear un nuevo arreglo
    carritoProductos = carritoProductos.filter(producto => producto.id !== productoID);
    carritoHTML();
 
  };
};

function carritoHTML(){
    limpiarHTML();
    carritoProductos.forEach(producto=>{
        const{imagen, nombre, precio, cantidad, id} = producto;
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
            <img src="${imagen}"/>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
         <td>
            <a href="#" class="borrar-producto" data-id="${id}">X</a>
        </td>
        `;

        tbody.appendChild(tr);
    });
};

function limpiarHTML(){
    // forma rapida
     while(tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
      };
};