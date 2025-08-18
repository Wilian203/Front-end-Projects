// variables
const listaProductos = document.querySelector('#lista-productos')
const tbody = document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#carrito');

let articulos = [];


// Eventos
eventListeners();
function eventListeners(){
    listaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProdcto);
};

// Funciones
function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        informacionDelProducto(e.target.parentElement);
    };

    
};

function eliminarProdcto(e){
    if(e.target.classList.contains('borrar-producto')){
        const botonId = e.target.getAttribute('data-id');
        articulos = articulos.filter(articulo => articulo.id !== botonId);
    };

    carritoHTML();
   
}

function informacionDelProducto(producto){
    const info = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        cantidad: 1,
       id: producto.getAttribute('data-id'),
    };

    // Aumentamos la cantidad si existe un producto en el carrito y volvemos agregar el mismo
    const existe = articulos.find(articulo => articulo.id === info.id);
    if(existe){
        existe.cantidad +=1;
    }else{
         // una vez tenga la informacion del producto lo agrego al carrito
        articulos = [...articulos, info];
    }
   

    // agregamos la info al html
    carritoHTML();

};



function carritoHTML(){
    limpiarHTML();
    // Recorremos el arreglo para ir agregando cada producto al td
    articulos.forEach(producto=>{
        // destructuramos el objeto
        const{imagen, titulo, precio, cantidad, id} = producto;
        // crear el td
        const tr = document.createElement('tr');
        tr.innerHTML =
        `
        <td>
            <img loading="lazy" src= "${imagen}" alt="imagen">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a class="borrar-producto" data-id ="${id}">X</a></td>
        
        `;
        
        // una vez estructurado el html lo agregamos al tbody
        tbody.appendChild(tr);
    });
};

function limpiarHTML(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
    };
};