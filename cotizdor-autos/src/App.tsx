import { Cotizacion } from "./components/Cotizacion";
import { Form} from "./components/Form";

import { useCotizador } from "./hooks/useCotizador";
function App() {

  const{years, agregarCotizacion, datos, calcularSeguro, resultado, reiniciar} = useCotizador()
  return (
    <>
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="bg-blue-100 text-blue-600 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-3">
            🚗
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            Cotizador de Seguros de Autos
          </h1>
          <p className="text-gray-600">
            Calcula el costo estimado de tu seguro en segundos.
          </p>
        </div>

        <Form
          years={years}
          agregarCotizacion={agregarCotizacion}
          calcularSeguro={calcularSeguro}
          reiniciar={reiniciar}
         
        />

        <Cotizacion
          datos={datos}
          resultado={resultado}
        />


        <footer className="mt-10 text-gray-500 text-sm text-center">
          Desarrollado por{" "}
          <span className="font-semibold text-gray-700">Wilian A. Mariñez</span>{" "}
          — Proyecto React + TypeScript
        </footer>
      </main>
    </>
  );
}

export default App;
