type FormProps ={
    years: number[]
    agregarCotizacion: (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=> void
    calcularSeguro: ()=>void
}
export function Form({years, agregarCotizacion, calcularSeguro}:FormProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-6">
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Marca del auto
            </label>
            <select 
            name="marca"
            onChange={agregarCotizacion}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una marca</option>
              <option value="europeo">Europeo</option>
              <option value="americano">Americano</option>
              <option value="asiatico">Asiático</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Año del modelo
            </label>
            <select 
            name="year"
            onChange={ agregarCotizacion}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tipo de plan
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="plan"
                value="basico"
                className="accent-blue-500"
                onChange={ agregarCotizacion}
              />
              Básico
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="plan"
                value="completo"
                className="accent-blue-500"
                onChange={agregarCotizacion}
              />
              Completo
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
          type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow transition"
            onClick={calcularSeguro}
          >
            🧮 Calcular Cotización
          </button>
          <button
            type="button"
            className="border border-gray-400 hover:bg-gray-100 text-gray-700 font-semibold py-2.5 px-5 rounded-lg transition"
          >
            Reiniciar cotización
          </button>
        </div>
      </form>
    </div>
  );
}
