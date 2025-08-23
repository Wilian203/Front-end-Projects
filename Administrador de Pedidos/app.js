// Variables
const formulario = document.querySelector("#formPedido");
const contenedorPedidos = document.querySelector("#contenedorPedidos");
const clienteInput = document.querySelector("#cliente");
const productoSelect = document.querySelector("#producto");
const cantidadInput =  document.querySelector("#cantidad");
const precioInput = document.querySelector("#precio");
const estadoSelect = document.querySelector("#estado");
const formularioBtn =document.querySelector('#formPedido button[type="submit"]');
const btnReinicar = document.querySelector('#reinicar');


let edicion = false;

// objeto en donde se guardaran los datos
const datosObj = {
  id: Date.now().toString(),
  cliente: "",
  producto: "",
  cantidad: "",
  precio: "",
  estado: "",
  hora: new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
};

// Eventos
eventListneres();
function eventListneres() {
  clienteInput.addEventListener("change", datosPedido);
  productoSelect.addEventListener("change", datosPedido);
  cantidadInput.addEventListener("change", datosPedido);
  precioInput.addEventListener("change", datosPedido);
  estadoSelect.addEventListener("change", datosPedido);
  formulario.addEventListener("submit", validarPedido);
  btnReinicar.addEventListener('click', reinicarTotal);
}

// Clases

class Notificacion {
  constructor({ texto, tipo }) {
    this.texto = texto;
    this.tipo = tipo;

    // mandamos a llamar el metodo que el html de la alerta
    this.alerta();
  }

  alerta() {
    const div = document.createElement("DIV");
    div.classList.add("text-center", "fw-bold", "alert");
    div.textContent = this.texto;
    const alertaNotificacion = document.querySelector(".alert");
    alertaNotificacion?.remove();

    if (this.tipo === "error") {
      div.classList.add("alert-danger");
    } else {
      div.classList.add("alert-success");
    }
    // agregamos el mensaje de alerta al html
    document
      .querySelector(".card-body")
      .insertBefore(div, document.querySelector(".card-body").firstChild);

    // despues de 3segundos quitamos la alerta
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}

class adminPedidos {
  constructor() {
    this.listaPedidos = [];
  }

  listarPedido(pedido) {
    this.listaPedidos = [...this.listaPedidos, pedido];
    console.log(this.listaPedidos);
    this.mostrarPedidos();
  }

  sumarCantidades(pedido){
    const ventasTotales = this.listaPedidos.reduce((acumulador, pedido) => {
      const cantidad = Number(pedido.cantidad);
      const precio = Number(pedido.precio);
      const total = cantidad * precio;
      return acumulador + total;
    }, 0);

    if(pedido.estado === 'Entregado'){
      const totalEl = document.querySelector('#totalDia'); 
      // Convertir lo que ya tenga en pantalla a número (quitando el $ si lo tiene)
      const valorActual = Number(totalEl.textContent.replace('$', '')) || 0;
      // Nuevo total acumulado
      const nuevoTotal = valorActual + ventasTotales;
      totalEl.textContent = `$${nuevoTotal}`;
    };
  };

  mostrarPedidos() {
    this.limpiarHTML();
    if(this.listaPedidos.length === 0){
      contenedorPedidos.innerHTML = `
        <div class="empty-state rounded-3 p-4 text-center">
                <div class="mb-2">📦</div>
                <h3 class="h6">No hay pedidos</h3>
        </div>
      `;
    }
    this.listaPedidos.forEach((pedido) => {
      const div = document.createElement("DIV");
      div.classList.add("pedido-card", 'mt-5');
      div.innerHTML =`
        <h3>Pedido # ${pedido.id}</h3>
        <div class="estado pendiente">${pedido.estado}</div>
        <div class="pedido-detalle"><span>Cliente:</span> ${pedido.cliente}</div>
        <div class="pedido-detalle"><span>Orden:</span> ${pedido.producto}</div>
        <div class="pedido-detalle"><span>Cantidad:</span> ${pedido.cantidad}</div>
        <div class="pedido-detalle"><span>Precio:</span> ${pedido.precio}</div>
        <div class="pedido-detalle"><span>Hora:</span> ${pedido.hora}</div>
        <div class="acciones">
            <button class="editar">Editar</button>
            <button class="eliminar">Finalizar</button>
        </div>
      
      `;
      contenedorPedidos.appendChild(div);
      const clone = structuredClone(pedido);
      // Selecciona el botón dentro de la tarjeta actual
      const btnEditar = div.querySelector('.editar');
      btnEditar.onclick = () => {
        editarPedido(clone);
      };

      // Lo mismo para eliminar
      const btnEliminar = div.querySelector('.eliminar');
      btnEliminar.onclick = () => this.eliminar(pedido.id);
      
    });
  };

  editar(listaActulizada){
     this.listaPedidos = this.listaPedidos.map(pedido => pedido.id === listaActulizada.id ? listaActulizada : pedido);
     this.mostrarPedidos();
  };

  eliminar(id){
    this.listaPedidos = this.listaPedidos.filter(pedido => pedido.id !== id);
    this.mostrarPedidos();
  }


  limpiarHTML(){
    while(contenedorPedidos.firstChild){
        contenedorPedidos.removeChild(contenedorPedidos.firstChild);
    };
  };
};

// instancias
const adminPedido = new adminPedidos();

// Funciones
function datosPedido(e) {
  e.preventDefault();

  // ingresar los datos del formulario al objeto
  datosObj[e.target.name] = e.target.value;
}

function validarPedido(e) {
  e.preventDefault();
  // convertimos los valores en un arreglo para validar que el formulario no tenga campos vacios
  if (Object.values(datosObj).some((dato) => dato.trim() === "")) {
    new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
    });
    return;
  };


  if(edicion){
    adminPedido.editar({...datosObj});
    new Notificacion({
        texto: "Guardado Correctamente",
        tipo: "exito",
    });
  }
  else{
    new Notificacion({
      texto: "Pedido agregado correctamente",
      tipo: "exito",
    });
    // una vez se pase la validacion le pasamos una copia al arreglo que esta en la clase de adminPedidos
    adminPedido.listarPedido({ ...datosObj });
  };

  adminPedido.sumarCantidades({...datosObj});

  

  // Resetamos el formulario
  formulario.reset();
  // Reiniciamos el objeto
  reiniciarObjeto();
  // volvemos a pasar la edicion a false para crear ordenes nuevas
  edicion = false;

  formularioBtn.textContent = 'Agregar Pedido';
};

function reiniciarObjeto (){
    Object.assign(datosObj,{
          id: Date.now().toString(),
          cliente: "",
          producto: "",
          cantidad: "",
          precio: "",
          estado: "",
          hora: new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    });
};

function editarPedido(pedido){
  // como el objeto queda vacio porque lo reiniciamos cuando demos click editar lo volvemos a llenar con la informacion que coloco
  // el admin para llenar los inputs.
  Object.assign(datosObj, pedido);

  // llenar los inputs
  clienteInput.value = pedido.cliente;
  productoSelect.value = pedido.producto;
  cantidadInput.value = pedido.cantidad;
  precioInput.value = pedido.precio;
  estadoSelect.value = pedido.estado;

  edicion = true;

  formularioBtn.textContent = 'Guardar Cambios';
};

function reinicarTotal(){
   document.querySelector('#totalDia').textContent = 'RD$ 0.00'
};

