document.addEventListener('DOMContentLoaded', ()=>{
    eventos();
    mostrarArticulos(productos);
    enlaceActivo();

    carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML();

});

// codigo del carrito

// variables
const listaProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector('#lista-carrito');
const vaciarCarritoBtn =  document.querySelector('#vaciar-carrito');
const carrito = document.querySelector('#carrito')

let carritoProductos = [];

// eventos
function eventos(){
    listaProductos.addEventListener('click', agregarCarrito)
    carrito.addEventListener('click', eliminarProducto)

    vaciarCarritoBtn.addEventListener('click', ()=>{
        carritoProductos = [];
        carritoHTML();
    })
};


function agregarCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        leerDatosDelProducto(e.target.parentElement.parentElement);  
    };
};


function eliminarProducto(e){
    if(e.target.classList.contains('delete-btn')){
        const botonid = e.target.getAttribute('data-id');
        carritoProductos = carritoProductos.filter(producto => producto.id !== botonid )
    };

    carritoHTML();
};

function leerDatosDelProducto(producto){
   const informacionProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.producto__precio').textContent,
        cantidad: 1,
        id: producto.querySelector('a').getAttribute('data-id')

   };

    const productoExiste = carritoProductos.find((producto)=> producto.id === informacionProducto.id);
    if(productoExiste){
        productoExiste.cantidad += 1;
     
    }else{
        //agregar los productos al carrito    
        carritoProductos = [...carritoProductos, informacionProducto];
    }
    
  carritoHTML();
};

function carritoHTML(){
    limpiarHTML();
    carritoProductos.forEach(producto =>{
        const{imagen, titulo, precio, cantidad, id} = producto;
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
            <img src="${imagen}"/>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><button class="delete-btn" data-id="${id}">Eliminar</button></td>
        
        `; 
        //Motramos el contendio en el HTML
        listaCarrito.appendChild(tr);    
    });

    sincronizarStorage();

};

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));

};


function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    };

};


// codigo de filtro
const enlacesFiltro =  document.querySelectorAll('.navegacion__enlace');
const entrada = document.querySelector('#entrada');



const busqueda = {
    marca: '',
    categoria: '',
};


entrada.addEventListener('input',(e)=>{
    busqueda.marca = e.target.value;
    filtrarProductos();
});


enlacesFiltro.forEach(enlace =>{
    enlace.addEventListener('click', (e =>{
        const categoria = e.target.dataset.categoria;
        busqueda.categoria = categoria;
        filtrarProductos();
    }));

});

function mostrarArticulos(productos){
    limpiarProductos();
    productos.forEach(producto =>{
        const{imagen, titulo, stock, precio, id} = producto;

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        
           <div class="producto__imagen">
                <img src="${imagen}" alt="producto">
            </div>
            <div class="producto__contenido">
                <h3 class="producto__titulo">${titulo}</h3>
                <p class="producto__precio">USD$  ${precio}</p>
                <p class="producto__stock">Stock: <span>${stock}</span></p>
                <a href="#" class="producto__btn agregar-carrito" data-id="${id}">Agregar al carrito</a>
            </div>
        `;

        listaProductos.appendChild(div);
    });
};

function limpiarProductos() {
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    };
};


function filtrarProductos(){
    const filtro = productos.filter(filtrarCategoria).filter(filtrarMarca)
    // antes de mostrar los productos filtrados limpio el error
    limpiarError();
    if(filtro.length){
         mostrarArticulos(filtro)
         
    }else{
       mostrarMensaje();
    }
   
};

function mostrarMensaje(e){
    limpiarProductos();
    limpiarError();
    const p = document.createElement('p')
    p.textContent = 'Este producto no existe';
    p.classList.add('error');
    mensaje.appendChild(p);
};


function limpiarError(){
    const mensaje = document.querySelector('#mensaje')

    const errorExsite = mensaje.querySelector('.error');
    
    if(errorExsite){
        errorExsite.remove();
    };
};


function filtrarCategoria(producto){
    const{categoria} = busqueda;
    if(categoria){
        return producto.categoria.toLowerCase() === categoria.toLowerCase();
    }

    return producto;
};

function filtrarMarca(producto){
    const {marca} = busqueda;
    if(marca){
        return producto.marca.toLowerCase() === marca.toLowerCase();
    };

    return producto;
};


function enlaceActivo(){
    const enlances = document.querySelectorAll('.navegacion__enlace');
   enlances.forEach(enlace =>{
        enlace.addEventListener('click',(e)=>{
            e.preventDefault();
            // quitamos la clase a todos los enlaces una vez recorrido
           enlances.forEach(en => en.classList.remove('navegacion__enlace--active'))

          //agregamos la clase solo al enlace clickeado    
           enlace.classList.add('navegacion__enlace--active')
        });
   });
};