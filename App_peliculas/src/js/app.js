function iniciarApp() {
  // variables
  const peliculasContenedor = document.querySelector("#peliculas-container");
  const API_KEY = "7ce15e1932141142591c101bab5e5993";
  const modal = new bootstrap.Modal("#movieModal", {});
const btnAgregar = document.querySelector('#agregar');
  const peliculasDiv = document.querySelector('.peliculas')
  if(peliculasDiv){
    obtenerPeliculas();
    return; 
  }
  

  

  cargarPeliculas();
  function cargarPeliculas() {
    const URL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc&api_key=${API_KEY}`;
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((resultado) => mostrarPeliculas(resultado.results));
  }

  function mostrarPeliculas(peliculas = []) {
   limpiarHTML();
    peliculas.forEach((pelicula) => {
      const { original_title, poster_path, id } = pelicula;
      const plantilla = ` 
        <div class=" col-12 col-sm-6 col-md-4 col-lg-3 mb-4 px-3">
          <div class="card h-100 bg-dark text-white shadow-lg ">
            <img src="https://image.tmdb.org/t/p/w500/${poster_path ?? pelicula.img} " 
                alt="${poster_path ?? pelicula.img}" 
                class="card-img-top">
            <div class="card-img-overlay" data-id="${id}">
              <div>
                <h6 class="card-title text-truncate mb-1 fs-2">${original_title ?? pelicula.titulo}</h6>
                <p class="card-text small mb-0">Acción</p>
              </div>
            </div>
          </div>
        </div>
      `;
      peliculasContenedor.innerHTML += plantilla;
    });

    // obtenemos el id de de la pelicula clickeda
    peliculasContenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("card-img-overlay")) {
        const id = e.target.dataset.id;
        obtenerIdPeliculas(id);
      };
    });
  }

  function limpiarHTML(){
    while(peliculasContenedor.firstChild){
      peliculasContenedor.removeChild(peliculasContenedor.firstChild)
    };
  };

  function obtenerIdPeliculas(id) {
    const URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=es-ES`;
    fetch(URL)
      .then((repuesta) => repuesta.json())
      .then((resultado) => mostrarModalPeliculas(resultado));
  }

  function mostrarModalPeliculas(peliculasID) {
    const{id, original_title, poster_path, overview} =peliculasID;
    const modalTitle = document.querySelector(".modal-title");

    modalTitle.textContent = original_title;

    const modalIMG = document.querySelector("#modalPoster");
    modalIMG.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    const descripcion = document.querySelector("#modalOverview");
    descripcion.textContent = overview;

    btnAgregar.textContent = existeEnStorage(id) ? 'Eliminar de mi lista' : 'Agregar a mi lista';
   
    btnAgregar.onclick = ()=>{
       if(existeEnStorage(id)){
        eliminarStorage(id)
        mostrarToast('Pelicula eliminada correctamente');
        btnAgregar.textContent = 'Agregar a mi lista';
        return;
      };

      
      agregarLocalStorage({
        id:id,
        titulo: original_title,
        img:`https://image.tmdb.org/t/p/w500/${poster_path}`
      });
      mostrarToast('Pelicula Agregada Correctamente');
      btnAgregar.textContent = 'Eliminar de mi lista';
    };
    // abrimos el modal
    modal.show();
  };

  function mostrarToast(mensaje){
    const toastDiv = document.querySelector('#toast');
    const toastBody = document.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastDiv);
    toastBody.textContent = mensaje;
    toast.show();
  };

  function agregarLocalStorage(pelicula){
    const peliculas = JSON.parse(localStorage.getItem('peliculas')) ?? [];
    localStorage.setItem( 'peliculas', JSON.stringify([...peliculas, pelicula]));
  };

  function obtenerPeliculas(){
    const peliculas = JSON.parse(localStorage.getItem('peliculas')) ?? [];
    if(peliculas.length){
      mostrarPeliculas(peliculas)
      return;
    }
  }

  function existeEnStorage(id){
      const peliculas = JSON.parse(localStorage.getItem('peliculas')) ?? [];
      return peliculas.some(pelicula => pelicula.id === id);
  };

  function eliminarStorage(id){
      const peliculas = JSON.parse(localStorage.getItem('peliculas')) ?? [];
      // eliminanos las peliculas 
      const peliculaEliminada =  peliculas.filter(pelicula => pelicula.id !== id);
      // pasamos a localStorage el nuevo arreglo sin las peliculas elimindas
      localStorage.setItem( 'peliculas', JSON.stringify(peliculaEliminada));
  };
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});
