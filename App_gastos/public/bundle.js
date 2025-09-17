'use strict';

// variables
const btnAgregarGasto = document.querySelector(".agregar-gasto__btn");
const formulario = document.querySelector("#formulario-gasto__form");
const listaGastos = document.querySelector(".gastos");
 
let clone;
let editando = false;
// fecha
const hoy = new Date();
const opciones = { day: "numeric", month: "long", year: "numeric" };
const fechaFormateada = hoy
  .toLocaleDateString("es-ES", opciones)
  .replace(/ de /g, " ");


// eventos
eventListeners();
function eventListeners() {
  btnAgregarGasto.addEventListener("click", mostrarFomulario);
  formulario.addEventListener("submit", validarForm);
  listaGastos.addEventListener('click', mostrarBotones);
}
// clases
class AdministrarGastos {
  constructor(ui) {
    this.gastos = [];
    this.ui = ui;
  };

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
  };

  editarGasto(gastoActualizado){
    this.gastos =  this.gastos.map(gasto => gasto.id === gastoActualizado.id ? gastoActualizado : gasto);
    this.ui.motrarHTML(this.gastos);
    this.ui.sumarGastos(this.gastos); // renderiza inmediatamente
  };

  eliminarGasto(gastoEliminar){
    this.gastos = this.gastos.filter(gasto => gasto.id !== gastoEliminar.id);
     this.ui.motrarHTML(this.gastos);
     this.ui.sumarGastos(this.gastos); 
  };
}
class UI {
  imprimirAlerta(mensaje) {
    const parrafoMensaje = document.createElement("P");
    parrafoMensaje.textContent = mensaje;
    parrafoMensaje.classList.add("alerta");

    const alerta = formulario.querySelector(".alerta");
    alerta?.remove();

    formulario.appendChild(parrafoMensaje);

    setTimeout(() => {
      parrafoMensaje.remove();
    }, 3000);

    const formularioInputs = document.querySelectorAll(
      ".formulario-gasto__input"
    );
    formularioInputs.forEach((input) => {
      input.classList.add("formulario-gasto__input--error");
    });
  }''

  motrarHTML(gastos) {
    this.limpiarHTML();
    gastos.forEach((gasto) => {
      const { inputDescripcion, inputPrecio, id, fecha } = gasto;

     //formatemaos el precio a la moneda local
     const formatoRD = new Intl.NumberFormat("es-DO", {
            style: "currency",
            currency: "DOP"
      });   
      listaGastos.innerHTML += `
      <div class="gasto mb-1" data-id="${id}">
				<div class="gasto__info">
					<div>
						<p class="gasto__nombre">${inputDescripcion}</p>
						<p class="gasto__cantidad">${formatoRD.format(inputPrecio)}</p>
					</div>
					<p class="gasto__fecha">${fecha}</p>
				</div>
				<div class="gasto__acciones">
					<button class="gasto__btn editar" data-accion="editar-gasto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-pencil-square"
							viewBox="0 0 16 16"
							>
							<path
								d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
							/>
							<path
							fill-rule="evenodd"
							d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
							/>
						</svg>
						<span>Editar</span>
					</button>
					<button class="gasto__btn gasto__btn--rojo eliminar" data-accion="eliminar-gasto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							class="bi bi-trash3-fill"
							viewBox="0 0 16 16"
						>
							<path
								d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
							/>
						</svg>
						<span>Eliminar</span>
					</button>
				</div>
			</div>  
       `;

       clone = {...gasto};
    });
   
  };

  limpiarHTML(){
    while(listaGastos.firstChild){
        listaGastos.removeChild(listaGastos.firstChild);
    }  };

  sumarGastos(gastos){
    gastos = gastos.reduce((total, gasto) => total + gasto.inputPrecio, 0);
    const formatoRD = new Intl.NumberFormat("es-DO", {
            style: "currency",
            currency: "DOP"
      });   
    document.querySelector('#total-gastado').textContent = formatoRD.format(gastos);
  }
 
}
// instacias
const ui = new UI();
const adminGastos = new AdministrarGastos(ui);

// funciones
function mostrarFomulario() {
  document
    .querySelector(".formulario-gasto")
    .classList.toggle("formulario-gasto--active");
  btnAgregarGasto.classList.toggle("agregar-gasto__btn--active");
}
function validarForm(e) {
  e.preventDefault();
   const inputDescripcion = document.querySelector("#descripcion").value.trim();
  const inputPrecio = Number(document.querySelector("#precio").value.trim());
  if (inputDescripcion === "" || inputPrecio === "") {
    ui.imprimirAlerta("Ambos campos con obligatorios");
    return;
  }
  if (inputPrecio <= 0 || isNaN(inputPrecio)) {
    ui.imprimirAlerta("Precio no válido");
    document
      .querySelectorAll(".formulario-gasto__input")[0]
      .classList.remove("formulario-gasto__input--error");
    return;
  }
  // resteamos el formulario y ocultamos el formulario
  formulario.reset();

  document.querySelector(".formulario-gasto").classList.remove("formulario-gasto--active");

  btnAgregarGasto.classList.remove("agregar-gasto__btn--active");
  // creamos un objeto para guardar la informacion del formulario

  let gasto;
  
  if(editando){
    gasto = { inputDescripcion, inputPrecio, id: clone.id, fecha:fechaFormateada };
    adminGastos.editarGasto({...gasto});
    editando = false; 
    document.querySelector('.formulario-gasto__btn').textContent = 'Agregar Gasto';
   
  }else {
    gasto = { inputDescripcion, inputPrecio, id: Date.now(), fecha:fechaFormateada };
    // le pasamos el objeto a la clase de administradorGastos
    adminGastos.nuevoGasto(gasto);
    //renderizamos los gastos   
  
  }
  // nos traemos el arreglo de objetos para renderizarlo  
  const { gastos } = adminGastos;
 
 //renderizamos los gastos   
  ui.motrarHTML(gastos);
  //pasamos el arreglo a sumargastos para sumar los gastos    
  ui.sumarGastos(gastos);
}
function mostrarBotones(e) {
  
    const gasto = e.target.closest('.gasto');
    // si el scrooll no esta en su posicion inicial mostramos la informacion
   if(gasto.scrollLeft > 0){
        gasto.querySelector('.gasto__info').scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
        // si esta en la posicion inicial mostramos los botones
   }else {
        gasto.querySelector('.gasto__acciones').scrollIntoView({
            behavior: 'smooth',
            inline: 'start',
            block: 'nearest'
        });
   }
   editar(gasto);
   eliminar(gasto);
}
function editar(referencia){

  const btnEditar = referencia.querySelector('.editar');

  btnEditar.addEventListener('click', ()=>{
   const {inputDescripcion, inputPrecio} = clone; 

     document.querySelector("#descripcion").value = inputDescripcion;

     document.querySelector("#precio").value = inputPrecio;
    
      //activamos el formulario para que suba
      document.querySelector(".formulario-gasto").classList.add("formulario-gasto--active");
      document.querySelector('.formulario-gasto__btn').textContent = 'Editar Gasto';

      editando = true;

  });
}
function eliminar(referencia){
  const btnEliminar = referencia.querySelector('.eliminar');

  btnEliminar.addEventListener('click',()=>{
     adminGastos.eliminarGasto({...clone});
  });
}
//# sourceMappingURL=bundle.js.map
