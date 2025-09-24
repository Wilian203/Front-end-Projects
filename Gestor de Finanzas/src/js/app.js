// variables
const resultado = document.querySelector('#resultado');
const loginForm = document.querySelector('#loginForm');
const formulario = document.querySelector('#formulario');
const categoriaFiltro = document.querySelector('#categoriaFiltro');
const formularioBTN = document.querySelector('#formulario [type ="submit"]');


let startModal;
let chart;

// eventos
eventListener();
function eventListener(){
  document.addEventListener('DOMContentLoaded', ()=>{
    startModal = new bootstrap.Modal(document.getElementById('startModal'));
   startModal.show();
    if(loginForm){
      loginForm.addEventListener('submit',preguntarPresupuesto);
    };
  });

  if(formulario){
    formulario.addEventListener('submit',validarFormulario);
  };

  categoriaFiltro.addEventListener('change', filtroCategoria);
 
};

// clases
class AdminPresupuesto{
  constructor(presupuesto){
    this.presupuesto = Number( presupuesto)
    this.balanceActual = Number( presupuesto)
    this.gastos = []
  };

  nuevoGasto(gasto){
    this.gastos = [...this.gastos, gasto];
    this.sumarGastos();
    this.calcularBalanceActual();
  };

   eliminar(id){
    this.gastos = this.gastos.filter(gasto => gasto.id !== id);
    this.sumarGastos();
    this.calcularBalanceActual();
  };

  sumarGastos(){
    const totalGastado = this.gastos.reduce((total,gasto) => total + gasto.monto, 0)
    document.querySelector('#gastoTotal').textContent = `$${totalGastado}`;
  };

  calcularBalanceActual(){
    const totalGastos = this.gastos.reduce((total,gasto) => total + gasto.monto, 0);
    this.balanceActual = this.presupuesto - totalGastos;
  };

 
};


class UI{
  mostrarPresupuestoHTML(datosPresupuesto){
    const{presupuesto, balanceActual} = datosPresupuesto;
    document.querySelector('#ingreso').textContent = `RD $${presupuesto}`;
    document.querySelector('#balance').textContent = `RD $${balanceActual}`;
  };

  gastosHTML(gastos){
    this.limpiarHTML();

    // si no hay gastos mostramos el mensaje de inicio
    if(gastos.length <= 0){
      resultado.innerHTML = '<p class="text-center text-secondary">¡No hay transacciones aún. Agrega tu primera transacción arriba!</p>';
    };

    gastos.forEach(gasto => {
      const{descripcion, monto, id, categoria, fecha} = gasto;

      // construimos el html

     // Crear card
    const card = document.createElement('div');
    card.className = "card mb-2";

    // Inyectar el contenido con innerHTML
    card.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center" data-id =${id}>
        <div>
          <h5 class="card-title">${descripcion} 
            <span class="badge bg-light text-danger border border-danger">${categoria}</span>
          </h5>
          <p class="card-text text-muted mb-0">${fecha}</p>
        </div>
        <div class="d-flex align-items-center contenedor">
          <span class="fw-bold text-danger me-3">$  ${monto}</span>
          <i class="bi bi-trash text-danger eliminar"></i>
        </div>
      </div>
      `;
      resultado.appendChild(card);
      const contenedor = document.querySelectorAll('.contenedor');
      contenedor.forEach(btnEliminar =>{
         btnEliminar.addEventListener('click', (e)=>{
            if(e.target.classList.contains('eliminar')){
              eliminarGasto(id);
            };
         });
      });

    });
      
  };

  actualizarBalanceActual(balanceActual){
    document.querySelector('#balance').textContent = `RD $${balanceActual}`;
  };

  limpiarHTML(){
    while(resultado.firstChild){
      resultado.removeChild(resultado.firstChild);
    };
  };
};


// instancias
let presupuesto;
const ui = new UI();

// funciones
function preguntarPresupuesto(e){
  e.preventDefault();
  const presupuestoUsuario = Number(document.querySelector('#presupuesto').value);

  if(presupuestoUsuario === '' || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
    mensajeLogin('Debe ingresar un presupuesto válido', 'error');
    loginForm.reset();
     return;
  };

  // una vez pase la validacion cerramos el modal
  startModal.hide();

  // le pasamos el presupuesto a la clase
  presupuesto = new AdminPresupuesto(presupuestoUsuario)
  
  ui.mostrarPresupuestoHTML(presupuesto);
 
};

function validarFormulario(e){
  e.preventDefault();
  const descripcion = document.querySelector('#descripcion').value.trim();
  const monto = Number(document.querySelector('#monto').value.trim());
  const categoria = document.querySelector('#categoria').value.trim();
  const fecha = document.querySelector('#fecha').value.trim();

 if(descripcion === '' || monto === '' || categoria === '' || fecha === '' ){
    mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
 };

 if(isNaN(monto) || monto <=0){
     mostrarMensaje('Debe ingresar un monto válido', 'error');
     return;
 };
 
 mostrarMensaje('Gasto agregado correctamente');
  const gasto = {descripcion, monto, categoria, fecha , id:Date.now()};

  presupuesto.nuevoGasto(gasto);
 
  const{gastos, balanceActual} = presupuesto;
  // le pasamos los gastos para rendereizar en html

  ui.gastosHTML(gastos);

  // actualizar balance actual
  ui.actualizarBalanceActual(balanceActual);

  // actualizar gráfico
  renderizarGrafico(gastos);  
  formulario.reset();
  desactivarBtn();
};

function mensajeLogin(mensaje){
  const divMensaje = document.createElement('DIV');
  divMensaje.classList.add('alert','w-100', 'mt-5', 'text-center', 'alert-danger');
  divMensaje.textContent = mensaje
  
  const existe = document.querySelector('.alert');
  existe ?.remove();

  loginForm.appendChild(divMensaje);

    setTimeout(()=>{
    divMensaje.remove();
  },3000)

};

function mostrarMensaje(mensaje,tipo){
  const divMensaje = document.createElement('DIV');
  divMensaje.classList.add('alert','w-100', 'mt-5', 'text-center');
  divMensaje.textContent = mensaje
  
  const existe = document.querySelector('.alert');
  existe ?.remove();

  if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
  }else{
    divMensaje.classList.add('alert-success');
  };

  formulario.appendChild(divMensaje);

  
  setTimeout(()=>{
    divMensaje.remove();
  },3000)
};

function eliminarGasto(id){
  presupuesto.eliminar(id);
  const{gastos, balanceActual} = presupuesto;
  ui.gastosHTML(gastos);
  // actualizar balance actual
  ui.actualizarBalanceActual(balanceActual);
  
  // actualizar gráfico
  renderizarGrafico(gastos);

  desactivarBtn();

};

// Función para renderizar el gráfico
function renderizarGrafico(gastos) {
  const ctx = document.getElementById('gastosChart').getContext('2d');

  // Extraemos categorías y montos
  const categorias = gastos.map(g => g.categoria);
  const montos = gastos.map(g => g.monto);

  // Si el gráfico ya existe, lo destruimos antes de crear uno nuevo
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categorias,
      datasets: [{
        label: 'Gastos',
        data: montos,
        backgroundColor: ['#f44336', '#ff9800', '#2196f3', '#4caf50', '#9c27b0'], // Colores
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// filtarmos las categorias
function filtroCategoria(e){
  const{gastos} = presupuesto;
  const categoria = e.target.value;
  if( categoria === ''){
     ui.gastosHTML(gastos);
  }else{
    filtrarPorCategaria(categoria)
  }
};

function filtrarPorCategaria(categoria){
  const gastosFiltrados = presupuesto.gastos.filter(gasto => gasto.categoria === categoria);
  ui.gastosHTML(gastosFiltrados);
};

function desactivarBtn(){
  const{balanceActual} = presupuesto;
  if(balanceActual <= 0){
    formularioBTN.classList.add('disabled');
    mostrarMensaje('Presupuesto Agotado', 'error');
    return;
  };
  formularioBTN.classList.remove('disabled')

};

