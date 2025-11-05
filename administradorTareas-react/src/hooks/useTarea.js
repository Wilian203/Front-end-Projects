import { useState } from "react";
function useTarea() {
  // creamos dos estados. Uno para obtener las tares y guardarla y otro para almcenarlas todas en un arreglo
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);

  function obtenerTarea(e) {
    const contenidoTarea = e.target.value;
    setTarea(contenidoTarea);
  };

  function agregarTarea(e) {
    e.preventDefault();
    if (tarea.trim() === "") return;

    const nuevaTarea = {
      id: Date.now(),
      task: tarea.trim(),
    };

    setTareas([...tareas, nuevaTarea]);
    setTarea("");

    const formulario = document.querySelector('form')
    formulario.reset();
  };

  function eliminarTarea(id) {
    const tareaEliminada = tareas.filter((task) => task.id !== id);
    setTareas(tareaEliminada);
  };

  return{
    tareas,
    obtenerTarea,
    eliminarTarea,
    agregarTarea
  };
};

export default useTarea;
