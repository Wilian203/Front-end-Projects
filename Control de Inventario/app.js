// varibales
const tablaProductos = document.querySelector("tbody");
const formulario = document.querySelector("#formulario");


// Eventos
eventLinsteners();
function eventLinsteners() {
  formulario.addEventListener("submit", agregarProducto);
}

// Clases
class Producto {
  constructor() {
    this.listaProductos = [];
  }

  agregarProductos(producto) {
    this.listaProductos = [...this.listaProductos, producto];
  }

  actualizarCantidades(id) {
    const productos = this.listaProductos.find((producto) => producto.id === id);
    let Cantidad = Number (document.querySelector('#numero').value);
    if(productos){
        productos.cantidad -= Cantidad;
        productos.salida += Cantidad;
    };
    
  };

  eliminarProductos(id){
      this.listaProductos = this.listaProductos.filter(producto => producto.id !== id);
  };
};

class UI {
    mostrarMensaje(mensaje, tipo) {
      const div = document.createElement("div");
      div.classList.add("text-center", "alert");
      div.textContent = mensaje;

      if (tipo === "error") {
        div.classList.add("alert-danger");
      } else {
        div.classList.add("alert-success");
      }

      // agremos el div al html
      document.querySelector(".primario").insertBefore(div, formulario);

      // quitar el div despues de 3s
      setTimeout(() => {
        div.remove();
      }, 3000);
    };

    mostrarProductos(productoObj) {
      this.limpiarHTML(); 
      productoObj.forEach((producto) => {
        const { nombre, cantidad, salida, id } = producto;

        // Crear fila (tr)
        const fila = document.createElement("tr");
        fila.dataset.id = id;

        // Celda: nombre del producto
        const tdNombre = document.createElement("td");
        tdNombre.textContent = nombre;

        // Celda: cantidad
        const tdCantidad = document.createElement("td");
        tdCantidad.textContent = cantidad;

         // Celda: cantidad
        const tdSalida = document.createElement("td");
        tdSalida.textContent = salida;

        // Celda: acciones (botón actulizaar)
        const tdAcciones = document.createElement("td");
        const btnActualizar = document.createElement("button");
        btnActualizar.classList.add("btn", "btn-primary", "btn-sm", );
        btnActualizar.textContent = "Actualizar";
        btnActualizar.addEventListener("click", () => {
          actualizarCantidad(id);
        });

    
        // Celda: acciones (botón borrar)
        const btnBorrar = document.createElement("button");
        btnBorrar.classList.add("btn", "btn-danger", "btn-sm", "ms-2", "opacity-50", 'disabled');
        btnBorrar.textContent = "Borrar";
        btnBorrar.addEventListener("click", () => {
          eliminarProducto(id);
        });

         // Desabilitamos el boton cuando la cantidad es menor o igual a 0
        if(producto.cantidad <=0){
          btnActualizar.classList.add('opacity-50', 'disabled');
          btnBorrar.classList.remove('opacity-50', 'disabled')
        }



        tdAcciones.appendChild(btnActualizar);
        tdAcciones.appendChild(btnBorrar)

        // Agregar celdas a la fila
        fila.appendChild(tdNombre);
        fila.appendChild(tdCantidad);
        fila.appendChild(tdSalida);
        fila.appendChild(tdAcciones);

        // Agregar fila a la tabla
        tablaProductos.appendChild(fila);
      });
    };

    limpiarHTML(){
      while(tablaProductos.firstChild){
        tablaProductos.removeChild(tablaProductos.firstChild);
      }
    }

    sumarCantidades(articulos) {
    articulos = articulos.reduce((total, articulo) => total + articulo.cantidad,0);
    // mostamos en html la suma
    document.querySelector("#total").textContent = articulos;
    };


};

 


// instancias
const productos = new Producto();
const ui = new UI();



// Funciones
function agregarProducto(e) {
  e.preventDefault();

  const nombre = document.querySelector("#name").value;
  const cantidad = Number(document.querySelector("#quantity").value);

  if (nombre === "" || cantidad === "") {
    ui.mostrarMensaje("Ambos campos son obligatorios", "error");
    return;
  }

  if (cantidad <= 0 || isNaN(cantidad)) {
    ui.mostrarMensaje("Cantidad no valida", "error");
    return;
  }

  ui.mostrarMensaje("Producto Agregado Correctamente");

  // creamos el objeto
  const producto = { nombre, cantidad, salida: Number(0), id: Date.now() };

  // le pasmos el objeto al metodo agregarProducto para agregarlo al arreglo
  productos.agregarProductos(producto);

  // le pasmos el arreglo de objetos para mostrarlo al html
  const { listaProductos } = productos;
  ui.mostrarProductos(listaProductos);

  // Le pasamos el objeto al metodo sumar cantidades para luego mostralo al html
  ui.sumarCantidades(listaProductos);

  // Resetemos el formulario
  formulario.reset();
};

function actualizarCantidad(id) {
  productos.actualizarCantidades(id);

  const { listaProductos } = productos;
  // Actualiza el html y solo muestra los productos que no se eliminaron
  ui.mostrarProductos(listaProductos);
  // Recalacula la prodiedad cantidad
  ui.sumarCantidades(listaProductos);

  document.querySelector('#numero').value = '';
};

function eliminarProducto(id){
  productos.eliminarProductos(id)
    const { listaProductos } = productos;
  // Actualiza el html y solo muestra los productos que no se eliminaron
  ui.mostrarProductos(listaProductos);
  // Recalacula la prodiedad cantidad
  ui.sumarCantidades(listaProductos);
};

