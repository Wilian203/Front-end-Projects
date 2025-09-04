(function () {
  let DB;
  let idTarea;

  const tituloInput = document.querySelector("#titulo");
  const horaInput = document.querySelector("#hora");
  const diaInput = document.querySelector("#dia");
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", actulizarTarea);
    conectarDB();

    // obtener el id de la tarea
    const parametrosURL = new URLSearchParams(window.location.search);
    idTarea = parametrosURL.get("id");

    setTimeout(() => {
      obtenerTarea(idTarea);
    }, 100);
  });

  function conectarDB() {
    // intentamos conectarnos a la DB
    const abrirConexion = window.indexedDB.open("administradorTareas", 1);

    // en caso de que no se conecte mostramos el mensaje de error
    abrirConexion.onerror = function () {
      console.log("Hubo un error");
    };

    abrirConexion.onsuccess = function () {
      console.log("connexion exitosa");
      DB = abrirConexion.result;
    };
  };

  function obtenerTarea(id) {
    const transaction = DB.transaction(["administradorTareas"], "readonly");
    const objectStore = transaction.objectStore("administradorTareas");

    objectStore.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }

        cursor.continue();
      };
    };
  };

  function llenarFormulario(datosTarea) {
    const { titulo, hora, dia } = datosTarea;
    tituloInput.value = titulo;
    horaInput.value = hora;
    diaInput.value = dia;
  };

  function actulizarTarea(e) {
    e.preventDefault();
    if (
      tituloInput.value.trim() === "" ||
      horaInput.value.trim() === "" ||
      diaInput.value.trim() === ""
    ) {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    const tareaActualizada = {
      titulo: tituloInput.value,
      hora: horaInput.value,
      dia: diaInput.value,
      id: Number(idTarea),
    };

    const transaction = DB.transaction(["administradorTareas"], "readwrite");
    const objectStore = transaction.objectStore("administradorTareas");
    objectStore.put(tareaActualizada);

    transaction.onerror = function () {
      imprimirAlerta("Hubo un error", "error");
    };

    transaction.oncomplete = function () {
      imprimirAlerta("Tarea actualizada correctamente");

      setTimeout(() => {
        window.location = "index.html";
      }, 3000);
    };
  };
})();
