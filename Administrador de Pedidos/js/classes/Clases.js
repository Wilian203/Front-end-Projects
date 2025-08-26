import { editarPedido } from "../funciones.js";
// Clases
 export class Notificacion {
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

export class adminPedidos {
  constructor() {
    this.listaPedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    this.mostrarPedidos();
  }

  listarPedido(pedido) {
    this.listaPedidos = [...this.listaPedidos, pedido];
     // Guardar pedidos en localStorage
    localStorage.setItem('pedidos', JSON.stringify(this.listaPedidos));
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
