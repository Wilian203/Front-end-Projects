// varibales
const listaAutos = document.querySelector("#lista-autos");
const listaEnergy = document.querySelector('#lista-energy')
const listaChargin = document.querySelector('#lista-charging');
const modalElement = document.getElementById('modal-id');

document.addEventListener("DOMContentLoaded", function () {
  modelos();
  swiper();
  mapa();
  
  if(listaAutos){
      listaAutos.addEventListener('click', mostrarModal);
      mostrarAutos();
  };

  if(listaEnergy){
    listaEnergy.addEventListener('click', mostrarModal)
    mostrarEnegy();
  };

  if(listaChargin){
     listaChargin.addEventListener('click', mostrarModal)
     mostrarChargins();
  };

});


function modelos() {
  // seleccionamos el contenedor que contiene las imagenes
  const carousel = document.querySelector("#carouselExampleIndicators");
  // seleccionamos el nombre a cambiar
  const nombremodelo = document.querySelector("#modelo");

  if (carousel && nombremodelo) {
    // el evento slid.bs.carousel es un evento de boostrap dispara despues que el carousel cambia de slide
    carousel.addEventListener("slid.bs.carousel", function () {
      // identicamos en que div esta la clase activa. osea que imagen se esta moestrando
      const activeItem = document.querySelector(".carousel-item.active");
      // seleccionamos el atributo personalizado que contiene el nombre de cada modelo
      const modelo = activeItem.getAttribute("data-modelo");
      // le asignamos el nombre del modelo actual
      nombremodelo.textContent = modelo;
    });
  }
}

function swiper() {
  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

function mapa() {
  const mapContainer = document.getElementById("map");
  if (!mapContainer) return; // Salir si no existe el div

  const map = L.map("map").setView([39.8283, -98.5795], 4);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      subdomains: "abcd",
      maxZoom: 19,
    }
  ).addTo(map);

  const puntos = [
    { state: "California", lat: 36.7783, lng: -119.4179, color: "red" },
    { state: "Florida", lat: 27.9944, lng: -81.7603, color: "gray" },
    { state: "Texas", lat: 31.9686, lng: -99.9018, color: "red" },
    { state: "New York", lat: 43.2994, lng: -74.2179, color: "gray" },
    { state: "Pennsylvania", lat: 41.2033, lng: -77.1945, color: "red" },
    { state: "Virginia", lat: 37.4316, lng: -78.6569, color: "gray" },
    { state: "New Jersey", lat: 40.0583, lng: -74.4057, color: "red" },
    { state: "North Carolina", lat: 35.7596, lng: -79.0193, color: "gray" },
    { state: "Washington", lat: 47.7511, lng: -120.7401, color: "red" },
    { state: "Illinois", lat: 40.6331, lng: -89.3985 },
  ];

  puntos.forEach((punto) => {
    L.circleMarker([punto.lat, punto.lng], {
      radius: 5,
      color: punto.color || "blue",
      fillColor: punto.color || "blue",
      fillOpacity: 1,
    }).addTo(map);
  });
}

function mostrarAutos() {
  listaAutos.innerHTML = '';
  if (autos.length > 0) {
    autos.forEach((auto) => {
      const { imagen, titulo, precio, id } = auto;
      const div = document.createElement("div");
      div.classList.add("col-12", "col-md-4");
      div.innerHTML = `
        <div class="car" data-id = ${id}>
            <div class="car__imagen">
                <img class="img-fluid" loading ="lazy" src="${imagen}"width ="500"height ="300">
            </div>
            <div class="car__contenido">
                <h3 class="mt-4 car__titulo">${titulo}</h3>
                <p class="car__precio">$${precio} USD</p>
                <a class="car__btn mostrar-modal" id=${id} href="#">More info</a>
            </div>
        </div>
    `;
      listaAutos.appendChild(div);
    });
  }else{
    const error = document.createElement('p');
    error.classList.add("text-center", "text-danger", "mt-4", "fs-1");
    error.textContent = 'No hay carros disponibles';
    listaAutos.appendChild(error);
  };
};

function mostrarEnegy(){
    listaEnergy.innerHTML = '';
    if (energy.length > 0) {
      energy.forEach((energy) => {
        const { imagen, titulo, precio, id } = energy;
        const div = document.createElement("div");
        div.classList.add("col-12", "col-md-4");
        div.innerHTML = `
          <div class="car" data-id = ${id}>
              <div class="car__imagen">
                  <img class="img-fluid" loading ="lazy" src="${imagen}"width ="500"height ="300">
              </div>
              <div class="car__contenido">
                  <h3 class="mt-4 car__titulo">${titulo}</h3>
                  <p class="car__precio">$${precio} USD</p>
                  <a class="car__btn mostrar-modal" id=${id} href="#">More info</a>
              </div>
          </div>
      `;
        listaEnergy.appendChild(div);
      });
    }else{
      const error = document.createElement('p');
      error.classList.add("text-center", "text-danger", "mt-4", "fs-1");
      error.textContent = 'No hay productos de energia disponibles';
      listaEnergy.appendChild(error);
    };
};

function mostrarChargins(){
   listaChargin.innerHTML = '';
    if (chargins.length > 0) {
      chargins.forEach((chargin) => {
        const { imagen, titulo, precio, id } = chargin;
        const div = document.createElement("div");
        div.classList.add("col-12", "col-md-4");
        div.innerHTML = `
          <div class="car" data-id = ${id}>
              <div class="car__imagen">
                  <img class="img-fluid" loading ="lazy" src="${imagen}"width ="500"height ="300">
              </div>
              <div class="car__contenido">
                  <h3 class="mt-4 car__titulo">${titulo}</h3>
                  <p class="car__precio">$${precio} USD</p>
                  <a class="car__btn mostrar-modal" id=${id} href="#">More info</a>
              </div>
          </div>
      `;
        listaChargin.appendChild(div);
      });
    }else{
      const error = document.createElement('p');
      error.classList.add("text-center", "text-danger", "mt-4", "fs-1");
      error.textContent = 'No hay productos de energia disponibles';
      listaChargin.appendChild(error);
    };
}

function mostrarModal(e){
  e.preventDefault();
  if(e.target.classList.contains('mostrar-modal')){
      const modalElement = document.querySelector('#modal-id');
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      const referencia = e.target.parentElement.parentElement;
      if(referencia.dataset.id === e.target.id){
          const imagen = referencia.querySelector('img').src;
          const imagenModal = document.querySelector('.imagen');
          imagenModal.src = imagen;
          
      };  
      infoModal(e.target.id)
  };
};

function infoModal(id){
    const idBoton = parseInt(id); 
    const autoFiltrado = autos.filter(auto => auto.id === idBoton);
    const energyFiltro = energy.filter(ener => ener.id == idBoton);
    const charginFiltro = chargins.filter(chargin => chargin.id === idBoton);
    if(autoFiltrado){
        autoFiltrado.forEach(auto=>{
        const{descripcion, titulo} = auto

        const modalTitulo = document.querySelector('#exampleModalLabel');
        modalTitulo.textContent = titulo;

        const descripcionModal = document.querySelector('#descripcion');
        descripcionModal.textContent = descripcion;
      });
    };

    if(energyFiltro){
        energyFiltro.forEach(energy=>{
        const{descripcion, titulo} = energy

        const modalTitulo = document.querySelector('#exampleModalLabel');
        modalTitulo.textContent = titulo;

        const descripcionModal = document.querySelector('#descripcion');
        descripcionModal.textContent = descripcion;
      });
    };

    if(charginFiltro){
        charginFiltro.forEach(energy=>{
        const{descripcion, titulo} = energy

        const modalTitulo = document.querySelector('#exampleModalLabel');
        modalTitulo.textContent = titulo;

        const descripcionModal = document.querySelector('#descripcion');
        descripcionModal.textContent = descripcion;
      });
   };

};
