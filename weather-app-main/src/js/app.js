import { obtenerValorInput } from "./funciones.js";

// variables
const boton = document.querySelector("#boton");
export const resultados = document.querySelector("#resultados");

// eventos
document.addEventListener("DOMContentLoaded", function () {
  boton.addEventListener("click", obtenerValorInput);
});

