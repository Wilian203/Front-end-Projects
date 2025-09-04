(function(){
    let DB;
    const formulario = document.querySelector('#formulario');
   document.addEventListener('DOMContentLoaded', ()=>{
        conectarDB();
        formulario.addEventListener('submit', validarFormulario);
   });

   function conectarDB(){
        // intentamos conectarnos a la DB
        const abrirConexion = window.indexedDB.open('administradorTareas', 1);

        // en caso de que no se conecte mostramos el mensaje de error
        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function(){
            console.log('connexion exitosa');
            DB = abrirConexion.result;
        };
   };

   function validarFormulario(e){
        e.preventDefault();
        const titulo = document.querySelector('#titulo').value.trim();
        const hora= document.querySelector('#hora').value.trim();
        const dia = document.querySelector('#dia').value.trim();

        if(titulo === '' || hora === '' || dia === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        };

        // creamos un objeto para almacenas los datos una vez pase la validacion
        const tarea ={titulo, hora, dia, id:Date.now()};
        nuevaTarea(tarea);
    };

    function nuevaTarea(tarea){
        const transaction = DB.transaction(['administradorTareas'], 'readwrite');
        const objectStore = transaction.objectStore('administradorTareas');
        objectStore.add(tarea);

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error');
        };

        transaction.oncomplete = function(){
            imprimirAlerta('Tarea agregada correctamente');
            formulario.reset();
            setTimeout(()=>{
                window.location.href = 'index.html';
            },2000)

            // removemos el parrafo que dice no hay tareas
            document.querySelector('.container p').remove();
        };
    };

    
})();