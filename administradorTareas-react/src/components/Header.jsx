function Header({obtenerTarea, agregarTarea}) {
  return (
    <>
      <header className="contenedor">
        <h1 className="text-center text-secondary fw-bold mt-5">Mis tareas</h1>
        <form className="row g-3">
          <div className="col-10">
            <label for="inputPassword2" className="form-label">
                Nueva Tarea
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="¿Que necesitas hacer?"
              onChange={obtenerTarea}
            />
          </div>
          <div className="col-2 boton w-full">
            <button className="btn btn-primary" onClick={agregarTarea}>
              Agregar
            </button>
          </div>
        </form>
      </header>
    </>
  );
};

export default Header;
