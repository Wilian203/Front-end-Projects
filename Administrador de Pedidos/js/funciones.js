import { Notificacion, adminPedidos } from "./classes/Clases.js";
import { datosObj, edicion } from "./classes/varibales.js";
import { formulario, formularioBtn, clienteInput, productoSelect, cantidadInput, precioInput ,estadoSelect } from "./classes/selectores.js";

// instancias
const adminPedido = new adminPedidos();


// Funciones
export function datosPedido(e) {
  e.preventDefault();

  // ingresar los datos del formulario al objeto
  datosObj[e.target.name] = e.target.value;
}

export function validarPedido(e) {
  e.preventDefault();
  // convertimos los valores en un arreglo para validar que el formulario no tenga campos vacios
  if (Object.values(datosObj).some((dato) => dato.trim() === "")) {
    new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
    });
    return;
  };


  if(edicion.value){
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
  edicion.value = false;

  formularioBtn.textContent = 'Agregar Pedido';
};

export function reiniciarObjeto (){
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

export function editarPedido(pedido){
  // como el objeto queda vacio porque lo reiniciamos cuando demos click editar lo volvemos a llenar con la 
  // informacion que coloco
  // el admin para llenar los inputs.
  Object.assign(datosObj, pedido);

  // llenar los inputs
  clienteInput.value = pedido.cliente;
  productoSelect.value = pedido.producto;
  cantidadInput.value = pedido.cantidad;
  precioInput.value = pedido.precio;
  estadoSelect.value = pedido.estado;

  edicion.value = true;

  formularioBtn.textContent = 'Guardar Cambios';
};

export function reinicarTotal(){
   document.querySelector('#totalDia').textContent = 'RD$ 0.00'
};
