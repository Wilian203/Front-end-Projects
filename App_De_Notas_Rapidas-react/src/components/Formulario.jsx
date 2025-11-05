import useNotas from "../hooks/useNotas";
import Notas from "./Notas";
function Formulario() {
  const{addTitle, addDescription, addGrades, setGrades, grades, title, description, deleteGrade} = useNotas()
  return (
    <>
      <section
        aria-labelledby="crear-nota"
        className="row justify-content-center mb-5"
      >
        <div className="col-lg-6 col-md-8 col-12">
          <article className="form-container">
            <h2 id="crear-nota" className="h4 mb-4">
              Crear una nueva nota
            </h2>

            <form className="formulario">
              <div className="mb-3">
                <label for="titulo" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  value={title}
                  id="titulo"
                  name="titulo"
                  className="form-control"
                  placeholder="Título de la nota"
                  required
                  onChange={addTitle}
                
                />
              </div>

              <div className="mb-4">
                <label for="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  value={description}
                  name="descripcion"
                  className="form-control"
                  rows="4"
                  placeholder="Escribe tu nota aquí..."
                  required
                  onChange={addDescription}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary px-4" onClick={addGrades} >
                Agregar Nota
              </button>
            </form>
          </article>
        </div>
      </section>
      <Notas
        title={title}
        description={description}
        grades={grades}
        setGrades={setGrades}
        deleteGrade={deleteGrade}
      />
    </>
  );
};

export default Formulario;
