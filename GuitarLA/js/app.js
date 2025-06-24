// variables
const listaProductos = document.querySelector('#lista-productos');
const tbody = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const carrito = document.querySelector('#carrito');

let articulosDelCarrito = [];
 eventListeners();
function eventListeners(){
  listaProductos.addEventListener('click', agregarProducto)
  carrito.addEventListener('click', eliminarCurso);

  vaciarCarritoBtn.addEventListener('click',()=>{
    articulosDelCarrito= [];
    limpiarHtml();
  })
};

function agregarProducto(e){
  e.preventDefault();
  if(e.target.classList.contains('producto__agregar-carrito')){
      leerDatos(e.target.parentElement.parentElement.parentElement)
  }
};




function leerDatos(dato){
  const informacionDeLosDatos = {
    imagen: dato.querySelector('.swiper-slide-active img').src,
    titulo: dato.querySelector('h3').textContent,
    precio: dato.querySelector('.producto__precio').textContent,
    cantidad: dato.querySelector('.producto__cantidad').value,
    id: dato.querySelector('.swiper-slide-active').getAttribute('data-id')
  };


  const articuloExiste = articulosDelCarrito.find(articulo => articulo.id === informacionDeLosDatos.id);
  if(articuloExiste){
    articuloExiste.cantidad = parseInt(articuloExiste.cantidad) + parseInt(informacionDeLosDatos.cantidad);
  }else{
      articulosDelCarrito = [...articulosDelCarrito, informacionDeLosDatos];
  }

  
  carritoHTML();
 
};

function eliminarCurso(e) {
    e.preventDefault();
      //obnetenemos el elemnento con esta clase que seria el boton de eliminar   
    if (e.target.classList.contains('borrar-curso')) {
      // obtenemos el id del boton
      const articuloId = e.target.getAttribute('data-id');

      //  recorremos el arreglo y validamos que el curso que quiero eliminar sea distinto al de los demas
      // para luego crear un nuevo arreglo sin modificar el original y que venga sin el curso eliminao
     articulosDelCarrito = articulosDelCarrito.filter(articulo => articulo.id !== articuloId);

     carritoHTML();
  };
}

function carritoHTML(){
  limpiarHtml();
  articulosDelCarrito.forEach(articulo =>{
    const{imagen,titulo,precio,cantidad, id} = articulo;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td> 
        <img src= "${imagen}" width ="150">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    
    `;
    tbody.appendChild(tr);
   
  });

};

function limpiarHtml(){
   // forma rapida
     while(tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
      };
};








carrusel();
function carrusel(){
  const nombre = document.querySelector('.producto__nombre');
    let swiper = new Swiper(".mySwiper", {
       pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // cuando cambie el slide obtenenemos el activo y cambiamos el nombre de la guitara con el data-nombre
      on:{
        slideChange:function(){
          // obtenemos el slide activo
          const slideActivo= this.slides[this.activeIndex];
          // obtenemos el nombre de la guitarra en el slide activo
          const nombreGuitarra = slideActivo.getAttribute('data-nombre');
          nombre.textContent = nombreGuitarra;
        }
      }

    });
};

