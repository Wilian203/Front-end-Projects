import { crearHTML, mostrarError, spinner, ocultarSpinner, mostrarMensajeErrorConexion } from "./funciones.js";
export function consultarPlace(ciudad){
   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}`;
   spinner()
  
   fetch(url)  
    .then(repuesta => repuesta.json())
    .then(resultado =>{
        // ocultamos el spinner cuando tenemos una respuesta
        ocultarSpinner();
        // validamos que el usuario no ingrese un resultado invalido
        if(!resultado.results || resultado.results === 0){
          mostrarError('No search result found!')
            return;
        };

        consultarApi(resultado.results[0]);
    })
    .catch(error =>{
        if(error){
         mostrarMensajeErrorConexion();
          console.log(error);
        }
    });
};

function consultarApi(resultado){
    const{latitude, longitude, name, country} = resultado;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,weather_code,precipitation&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=auto`;

    fetch(url)
     .then(respuesta => respuesta.json())
     .then(resultado => crearHTML(resultado, name, country))
     .catch(error => console.log(error));
};