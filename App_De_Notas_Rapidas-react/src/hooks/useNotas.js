import { useState, useEffect } from "react";
function useNotas() {
   function initialNotes(){
    const localStorageNotes = localStorage.getItem('notes')
    return localStorageNotes ? JSON.parse(localStorageNotes) : [];
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grades, setGrades] = useState(initialNotes);
  const colors = [
    "note-yellow",
    "note-blue",
    "note-green",
    "note-pink",
    "note-purple",
  ];

  // agregamos las notas al localStorage
  useEffect(()=>{
      localStorage.setItem('notes', JSON.stringify(grades))
  },[grades]);

  function addTitle(e) {
    setTitle(e.target.value);
  };
  function addDescription(e) {
    setDescription(e.target.value);
  };

  function addGrades(e) {
    e.preventDefault();
    if (title === "" || description === "") {
      mostrarMensaje("Ambos campos son obligatorios", 'error');
      return;
    };

    // generamos un color aleatorio
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // si el titulo y la descripcion no estan vacios creamos un objeto con los valores
    const newGrade = { id: Date.now(), title, description, color: randomColor };

    // agregramos la nota al estado de notas
    setGrades([...grades, newGrade]);
    // mostramos el mensaje de que se agrego la nota
    mostrarMensaje('Nota agregada correctamente', 'correcto')
    // limpiamos los estados
    setTitle("");
    setDescription("");
  };

  function mostrarMensaje(mensaje, tipo) {
    const formulario = document.querySelector(".formulario");
    const existe = formulario.querySelector(".alert");
    if (!existe) {
      const error = document.createElement("DIV");
      error.classList.add('alert', 'mt-4', 'text-center');
      if(tipo === 'error'){
        error.classList.add('alert-danger')
      }else{
          error.classList.add('alert-success');
      }
      error.textContent = mensaje;
      formulario.appendChild(error);

      setTimeout(() => {
        error.remove();
      }, 3000);
    }
  };

  function deleteGrade(id){
      const deletegrade = grades.filter(grade=> grade.id !== id);
      setGrades(deletegrade)
  }

  return{
    setGrades,
    addTitle,
    addDescription,
    addGrades,
    deleteGrade,
    grades,
    title,
    description
  }
};

export default useNotas;
