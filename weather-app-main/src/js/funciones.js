import { consultarPlace } from "./consultarApis.js";
import { resultados } from "./app.js";
// funciones
export function obtenerValorInput() {
  const inputPlace = document.querySelector("#place");
  const valor = inputPlace.value.trim();
  consultarPlace(valor);
}
export function crearHTML(resultado, name, country) {
  const fechaFormateada = fecha();
  const iconoImagen = obtenerIcono(resultado.current.weather_code)
  limpiarHTML();
  resultados.innerHTML = `
            <div class="col-md-8">
            <div class="contenido-imagen">
              <img
                class="img-fluid"
                src="assets/images/bg-today-large.svg"
                alt="imagen"
              />
              <div class="info-imagen">
                <div class="info-flex">
                  <div class="informacion">
                    <h3 class="text-white">${name}, ${country}</h3>
                    <p class="text-white">${fechaFormateada}</p>
                  </div>
                  <div class="grado">
                    <img
                      class="img-fluid w-25"
                      src="${iconoImagen}"
                      alt=""
                    />
                    <h2 class="text-white">${resultado.current.temperature_2m.toFixed(
                      0
                    )}°</h2>
                  </div>
                </div>
              </div>
            </div>
            <!-- Contenedor principal -->
          <div class="container text-white py-4" >
            <!-- Información actual -->
            <div class="row text-center mb-4">
              <div class="col-md-3 mb-3">
                <div class="card ">
                  <div class="card-body">
                    <h6 class="text-uppercase">Feels Like</h6>
                    <h3 class="fw-bold">${resultado.current.apparent_temperature.toFixed(
                      0
                    )}°</h3>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h6 class="text-uppercase">Humidity</h6>
                    <h3 class="fw-bold">${
                      resultado.current.relative_humidity_2m
                    }%</h3>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <div class="card ">
                  <div class="card-body">
                    <h6 class="text-uppercase">Wind</h6>
                    <h3 class="fw-bold">${(
                      resultado.current.wind_speed_10m * 2.237
                    ).toFixed(0)} mph</h3>
                  </div>
                </div>
              </div>

              <div class="col-md-3 mb-3">
                <div class="card">
                  <div class="card-body">
                    <h6 class="text-uppercase">Precipitation</h6>
                    <h3 class="fw-bold">${(
                      resultado.current.precipitation / 2.4
                    ).toFixed(0)} in</h3>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pronóstico diario -->
            <h5 class="text-uppercase mb-3">Daily forecast</h5>
            <div class="row text-center justify-content-between">
              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Tue</p>
                    <img
                      src="assets/images/icon-overcast.webp"
                      alt="rain"
                      width="40"
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[0].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[0].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Wed</p>
                    <img
                      src="assets/images/icon-overcast.webp"
                      alt="rain"
                      width="40"
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[1].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[1].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Thu</p>
                    <img
                      src="assets/images/icon-sunny.webp"
                      alt="sun"
                      width="40"
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[2].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[2].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Fri</p>
                    <img
                      src="assets/images/icon-partly-cloudy.webp"
                      alt="cloud"
                      width="40"
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[3].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[3].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Sat</p>
                    <img
                      src="assets/images/icon-storm.webp"
                      alt="storm"
                      width="40"    
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[4].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[4].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>

              <div class="col-6 col-sm-4 col-md-2 mb-3">
                <div class="card p-2">
                  <div class="card-body">
                    <p class="fw-bold mb-2 dia">Sun</p>
                    <img
                      src="assets/images/icon-fog.webp"
                      alt="cloud"
                      width="40"
                    />
                    <p class="mb-0">${resultado.daily.temperature_2m_max[5].toFixed(
                      0
                    )}°</p>
                    <small class="text-secondary">${resultado.daily.temperature_2m_min[5].toFixed(
                      0
                    )}°</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <!-- col -->

          <aside class="col-md-4 auto">
            <div class="container">
              <div
                class="card bg-dark text-white rounded-4 shadow-sm p-3 ">
                <div
                  class="d-flex justify-content-between align-items-center mb-3"
                >
                  <h6 class="mb-0">Hourly forecast</h6>
                  <div class="dropdown">
                    <button
                      class="btn btn-sm btn-outline-secondary dropdown-toggle text-white"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Tuesday
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark">
                      <li><a class="dropdown-item" href="#">Monday</a></li>
                      <li><a class="dropdown-item" href="#">Tuesday</a></li>
                      <li><a class="dropdown-item" href="#">Wednesday</a></li>
                    </ul>
                  </div>
                </div>

                <!-- Lista de pronóstico por hora -->
                <div class="list-group list-group-flush ">
                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-overcast.webp"
                        alt="cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >3PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[0].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-partly-cloudy.webp"
                        alt="sun-cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora">4PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[1].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-sunny.webp"
                        alt="sunny"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >5PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[2].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-overcast.webp"
                        alt="cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >6PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[3].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-snow.webp"
                        alt="cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >7PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[4].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-fog.webp"
                        alt="wind"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora"  >8PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[5].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-rain.webp"
                        alt="cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >9PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[6].toFixed(
                      0
                    )}°</span>
                  </div>

                  <div
                    class="list-group-item bg-transparent border-0 d-flex justify-content-between align-items-center text-white"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        src="assets/images/icon-overcast.webp"
                        alt="cloud"
                        width="28"
                        class="me-3"
                      />
                      <span class="hora" >10PM</span>
                    </div>
                    <span>${resultado.hourly.temperature_2m[7].toFixed(
                      0
                    )}°</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
  `;

  dias(resultado);
  horas(resultado);
};
function fecha() {
  // formatear fecha
  const hoy = new Date();
  const opciones = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return hoy.toLocaleDateString("en-US", opciones);
};
function obtenerIcono(weatherCode) {
  const iconMap = {
    0: "assets/images/icon-sunny.webp",          // Clear sky
    1: "assets/images/icon-sunny.webp",          // Mainly clear
    2: "assets/images/icon-partly-cloudy.webp",  // Partly cloudy
    3: "assets/images/icon-overcast.webp",       // Overcast
    45: "assets/images/icon-fog.webp",           // Fog
    48: "assets/images/icon-fog.webp",
    51: "assets/images/icon-rain.webp",          // Drizzle
    53: "assets/images/icon-rain.webp",
    55: "assets/images/icon-rain.webp",
    61: "assets/images/icon-rain.webp",          // Rain
    63: "assets/images/icon-rain.webp",
    65: "assets/images/icon-rain.webp",
    71: "assets/images/icon-snow.webp",          // Snow
    73: "assets/images/icon-snow.webp",
    75: "assets/images/icon-snow.webp",
    80: "assets/images/icon-storm.webp",         // Showers
    81: "assets/images/icon-storm.webp",
    82: "assets/images/icon-storm.webp",
    95: "assets/images/icon-storm.webp",         // Thunderstorm
    96: "assets/images/icon-storm.webp",
    99: "assets/images/icon-storm.webp"
  };

  return iconMap[weatherCode] || "assets/images/icon-partly-cloudy.webp";
}
function dias(resultado) {
  // cambiamos los dias automaticamente con los dias de la api
  const diasHTML = document.querySelectorAll(".dia");
  resultado.daily.time.forEach((fecha, i) => {
    const dayName = new Date(fecha).toLocaleDateString("en-US", {
      weekday: "short",
    });

    // obtengo el código del día
    const code = resultado.daily.weather_code[i];;
    const icono = obtenerIcono(code);

    if (diasHTML[i]){
      diasHTML[i].textContent = dayName;
      const img = diasHTML[i].closest(".card").querySelector("img");
      if (img){
        img.src = icono;
      }; 
    };
  });
};
function horas(resultado) {
  // Seleccionamos todos los elementos del HTML donde irá la hora
  const horasHTML = document.querySelectorAll(".hora");
console.log(resultado.timezone)
  // zona horaria del pais consultado
  const timezone = resultado.timezone;

  // Recorremos las horas que devuelve la API
  resultado.hourly.time.forEach((hora, i) => {
    // Formateamos cada hora al estilo 3 PM, 4 PM, etc.
    const hourFormatted = new Date(hora).toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: timezone,
    });
    
     const code = resultado.hourly.weather_code[i];;
     const icono = obtenerIcono(code);

    // Si existe un elemento HTML para esa posición, le asignamos la hora formateada
    if (horasHTML[i]){
      horasHTML[i].textContent = hourFormatted;
      console.log(horasHTML[i]);
      
      const img = horasHTML[i].closest('.d-flex').querySelector('img');
      if(img){
        img.src = icono
      };
    } ;
  });
};
export function mostrarError(mesanje) {
  const h2 = document.createElement("H2");
  h2.className = "col text-center text-white";
  h2.textContent = mesanje;

  limpiarHTML();
  resultados.appendChild(h2);

  setTimeout(() => {
    h2.remove();
  }, 3000);
};
 export function mostrarMensajeErrorConexion(){
  const div = document.createElement('DIV');
  div.className = 'col m-auto text-center';

  const img = document.createElement('IMG');
  img.src = '/assets/images/icon-error.svg';
  img.className = 'img-fluid w-full';
  img.alt = 'icono de error';

  const h2 = document.createElement('H2');
  h2.className = 'text-center text-white';
  h2.textContent = 'Something went  wrong';

  const p = document.createElement('P');
  p.className = 'text-center text-secondary';
  p.textContent = "We couldn't connect to the server (API error).Please try again in a few moments";

  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(p);

  limpiarHTML();
  resultados.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 5000);
};
function limpiarHTML() {
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }
};
export function spinner() {
  // Crear el contenedor principal
  const contenedor = document.createElement("div");
  contenedor.className =
    "d-flex justify-content-center align-items-center spiner";
  contenedor.style.height = "100px";

  const existe = document.querySelector('.spiner');
  existe ?.remove();

  // Crear el spinner
  const spinner = document.createElement("div");
  spinner.className = "spinner-border text-light";
  spinner.setAttribute("role", "status");

  // Crear el texto oculto (accesibilidad)
  const span = document.createElement("span");
  span.className = "visually-hidden";
  span.textContent = "Loading...";

  // Anidar los elementos
  spinner.appendChild(span);
  contenedor.appendChild(spinner);

  // Insertarlo en el contenedor principal de resultados (o donde tú quieras)
  resultados.appendChild(contenedor);
};
export function ocultarSpinner() {
  const existe = resultados.querySelector(".spiner");
  existe?.remove();
};
