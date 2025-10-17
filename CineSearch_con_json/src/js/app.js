// varibales
const url = "http://localhost:4000/peliculas";
const peliculasContenedor = document.querySelector('#peliculas');
const titulo = document.querySelector('#titulo');
const categoria = document.querySelector('#categoria');
const year = document.querySelector('#year');
const yearMax = 2021;
const yearMin = yearMax - 20;
const mensajeError = document.querySelector('#mensajeError')

const datosPeliculas = {
    titulo: '',
    categoria: '',
    year: '',
};

// varibale global para almacenar los datos de la API
let peliculasGlobal = [];

// eventos
document.addEventListener('DOMContentLoaded', async function(){
    peliculasGlobal = await consultarPeliculas();
    consultarPeliculas();
    llenarYearSelect();
    mostrarNombresSelect(peliculasGlobal);
    mostrarPeliculas(peliculasGlobal);
});

titulo.addEventListener('change', (e)=>{
    datosPeliculas[e.target.name] = e.target.value;
    filtrarPeliculas();
});

categoria.addEventListener('change', (e)=>{
    datosPeliculas[e.target.name] = e.target.value;
    filtrarPeliculas();
});

year.addEventListener('change', (e)=>{
    datosPeliculas[e.target.name] = Number(e.target.value);   
    filtrarPeliculas();
});

// funciones
async function consultarPeliculas(){
   try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json()
        return resultado;
   } catch (error) {
    console.log(error)
   }
}

function mostrarPeliculas(peliculas){
    limpiarHTML(peliculasContenedor);
    peliculas.forEach(pelicula => {
        const{nombre, categoria, year, imagen,} = pelicula;

        const div = document.createElement('div');
        div.classList.add('contenido__pelicula')
        div.innerHTML = `
          <div class="contenido__imagen">
             <img src="${imagen}" alt="avenger">
          </div>
          <div class="contenido__info">
                <h3 class="contenido__info-titulo">${nombre}</h3>
                <p class="contenido__info-categoria">${categoria}</p>
                <p class="contenido__info-year">${year}</p>
          </div>
        `;
        peliculasContenedor.appendChild(div);
    });
};

function limpiarHTML(selector){
    while(selector.firstChild){
        selector.removeChild(selector.firstChild);
    };
};

function mostrarNombresSelect(peliculas){
    peliculas.forEach(pelicula =>{
        const {nombre} = pelicula;

        // creamos el option
        const option = document.createElement('OPTION');
        option.value= nombre;
        option.textContent = nombre;

       titulo.appendChild(option)
    });
};

function llenarYearSelect(){
    for(let i = yearMax; i >= yearMin; i--){
       const option = document.createElement('OPTION');
       option.value = i;
       option.textContent = i;

       year.appendChild(option);
    };
};

function filtrarPeliculas(){
    const filtro = peliculasGlobal.filter(filtrarTitulo).filter(filtrarYear).filter(filtrarCategoria);
    if(filtro.length){
        mostrarPeliculas(filtro);
    }else{
        limpiarHTML(peliculasContenedor);
        mostrarMensaje('No se encontraron películas que coincidan con tu búsqueda')
    };
};

function mostrarMensaje(mensaje){
    const div = document.createElement('DIV');
    div.classList.add('error');
    const existe = document.querySelector('.error');
    existe ?.remove();
    div.textContent = mensaje;
    mensajeError.appendChild(div);

    setTimeout(()=>{
        div.remove();
    },3000)
};

function filtrarTitulo(pelicula){
    const{titulo} = datosPeliculas;

    if(titulo){
        return pelicula.nombre === titulo;
    };
    return pelicula;
};

function filtrarCategoria(pelicula){
     const{categoria} = datosPeliculas;

    if(categoria){
        return pelicula.categoria === categoria;
    };
    return pelicula;
};


function filtrarYear(pelicula){
    const{year} = datosPeliculas;

    if(year){
        return pelicula.year === year;
    };
    return pelicula;
};





