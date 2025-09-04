
function imprimirAlerta(mensaje, tipo) {
  const divMensaje = document.createElement("DIV");
  divMensaje.classList.add("alert", "text-center", "fw-bold", "mt-4");
  divMensaje.textContent = mensaje;

  const alerta = formulario.querySelector(".alert");
  alerta?.remove();

  if (tipo === "error") {
    divMensaje.classList.add("alert-danger");
  } else {
    divMensaje.classList.add("alert-success");
  }

  formulario.appendChild(divMensaje);

  setTimeout(() => {
    divMensaje.remove();
  }, 3000);
}
