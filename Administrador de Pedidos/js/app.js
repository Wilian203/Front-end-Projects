import { clienteInput,productoSelect,cantidadInput,precioInput,estadoSelect,
formulario,btnReinicar } from "./classes/selectores.js";
import { datosPedido, validarPedido, reinicarTotal } from "./funciones.js";
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
};




