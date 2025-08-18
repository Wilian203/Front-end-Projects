document.addEventListener('DOMContentLoaded', ()=>{
    mostrarPeliculas(peliculas);
    mostraryearSelec();
    mostrarSelectPeliculas();
});

// varibales
const peliculasContenedor = document.querySelector('#peliculas');
const titulo = document.querySelector('#titulo');
const categoria = document.querySelector('#categoria');
const year = document.querySelector('#year');
const yearMax = 2021;
const yearMin = yearMax - 20;
const mensaje = document.querySelector('#mensaje');


// objeto con valores
const busqueda = {
    titulo: '',
    categoria: '',
    year: ''
};


// eventos
titulo.addEventListener('change', e =>{
    busqueda.titulo = e.target.value;
    filtrarPeliculas();
});


categoria.addEventListener('change', e =>{
    busqueda.categoria = e.target.value.toLowerCase();
    filtrarPeliculas();
});

year.addEventListener('change', e =>{
  busqueda.year = parseInt(e.target.value);
  filtrarPeliculas();

});


function mostrarPeliculas(peliculas){
    limpiarHTML();
   peliculas.forEach(pelicula=>{
        const{imagen, nombre, categoria, year} = pelicula;
        
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

function limpiarHTML(){
    while(peliculasContenedor.firstChild){
        peliculasContenedor.removeChild(peliculasContenedor.firstChild)
    };

    while(mensaje.firstChild){
        mensaje.removeChild(mensaje.firstChild)
    };
};

function mostraryearSelec(){
    for(let i = yearMax; i >= yearMin; i-- ){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        year.appendChild(option);
    };
};

function mostrarSelectPeliculas(){
    peliculas.forEach(pelicula =>{
        const{nombre} = pelicula;
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;

        titulo.appendChild(option);
          
    });
};



function filtrarPeliculas(){
    const filtro = peliculas.filter(filtrarTitulo).filter(filtrarCategoria).filter(filtrarYear);
    if(filtro.length){
        mostrarPeliculas(filtro);
    }else{
        PeliculaNoEncontrada();
    }
   
};

function PeliculaNoEncontrada(){
    limpiarHTML();
    const p = document.createElement('p');
    p.classList.add('contenido__error');
    p.textContent = 'No hubo ningun resultado. Intente con otros terminos de busqueda'
    mensaje.appendChild(p);
}

function filtrarTitulo(pelicula){
    const {titulo} = busqueda;

    if(titulo){
        return pelicula.nombre === titulo;
    }

    return pelicula;
};

function filtrarCategoria(pelicula){
    const {categoria} = busqueda;

    if(categoria){
        return pelicula.categoria === categoria;
    };

    return pelicula;
};

 function filtrarYear(pelicula){
    const {year} = busqueda;

    if(year){
        return pelicula.year === year;
    };

    return pelicula;
};