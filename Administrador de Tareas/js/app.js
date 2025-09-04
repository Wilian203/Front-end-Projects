(function () {
  let DB;
  const listaTareas = document.querySelector("#lista-tareas");
  document.addEventListener("DOMContentLoaded", () => {
    listaTareas.addEventListener("click", eliminarTarea);
    crearDB();

    if (window.indexedDB.open("administradorTareas", 1)) {
      obtenerTarea();
    }
  });

  function crearDB() {
    const crearDB = window.indexedDB.open("administradorTareas", 1);

    crearDB.onerror = function () {
      console.log("Hubo un error");
    };

    crearDB.onsuccess = function () {
      DB = crearDB.result;
    };

    // Configuramos nuesta DB
    crearDB.onupgradeneeded = function (e) {
      const db = e.target.result;

      // Creamos la tabla dentro de la DB
      const objetcStore = db.createObjectStore("administradorTareas", {
        keyPath: "id",
        autoIncrement: true,
      });

      // Definimos las columnas de la DB
      objetcStore.createIndex("titulo", "titulo", { unique: false });
      objetcStore.createIndex("hora", "hora", { unique: false });
      objetcStore.createIndex("dia", "dia", { unique: false });
      objetcStore.createIndex("id", "id", { unique: true });

      console.log("db creada");
    };
  }

  function obtenerTarea() {
    const abrirConexion = window.indexedDB.open("administradorTareas", 1);

    abrirConexion.onerror = function () {
      console.log("Hubo un error");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;

      //creamos una trasaccion de solo lectura
      const transaction = DB.transaction(["administradorTareas"], "readonly");

      const objectStore = transaction.objectStore("administradorTareas");

      //abrimos un cursor para recorres cada registro y mostralos en el frontEnd
      objectStore.openCursor().onsuccess = function (e) {
        const cursor = e.target.result;
        if (cursor) {
          const { titulo, hora, dia, id } = cursor.value;
          // creamos la estructura del html y lo agremamos el tbody
          listaTareas.innerHTML += `      
                        <tr>
                            <td>${titulo}</td>
                            <td>${hora}</td>
                            <td>${dia}</td>
                            <td>
                                <input type="checkbox" class="form-check-input">
                            </td>
                            <td>
                                <a href="edit.html?id=${id}" class="btn btn-sm btn-primary">Editar</a>
                                <button data-tarea = "${id}" class="btn btn-sm btn-danger eliminar">Eliminar</button>
                            </td>
                        </tr>
                    `;
          // para que siga hacia el siguiente registro
          cursor.continue();
        } else {
          console.log("No hay mas registros");
        }
      };
    };
  }

  function eliminarTarea(e) {
    if (e.target.classList.contains("eliminar")) {
      const idTarea = Number(e.target.dataset.tarea);
      const confirmar = confirm("Desea eliminar esta tarea ?");

      if (confirmar) {
        const transaction = DB.transaction(
          ["administradorTareas"],
          "readwrite"
        );
        const objectStore = transaction.objectStore("administradorTareas");
        objectStore.delete(idTarea);

        transaction.oncomplete = function () {
          console.log("Tarea eliminada correctamente");

          // eliminar tarea del html
          e.target.parentElement.parentElement.remove();
    
        };

        transaction.onerror = function () {
          console.log("Hubo un error");
        };
        return;
      }
    }
  }
})();
