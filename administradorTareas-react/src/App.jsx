import useTarea from "./hooks/useTarea";
import Header from "./components/Header";
import { Trash } from "react-bootstrap-icons";
function App() {
  const{obtenerTarea,agregarTarea, eliminarTarea, tareas} = useTarea();
  return (
    <>
      <Header obtenerTarea={obtenerTarea} agregarTarea={agregarTarea} />
      <div className="contenedor mt-4 ">
        {tareas.length === 0 ? (
          <h3 className="text-center">No hay tareas</h3>
        ) : (
          <>
            <div className="list-group shadow-sm rounded-3 ">
              {tareas.map(item =>
                <div key={item.id} className="list-group-item d-flex align-items-center justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="t1"
                    />
                    <label className="form-check-label" htmlFor="t1">
                      {item.task}
                    </label>
                  </div>
                  <Trash className="text-danger" role="button" onClick={()=> eliminarTarea(item.id)} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
