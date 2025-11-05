import type { Cotizacion } from "../types";
type CotizacionProps = {
  datos: Cotizacion;
  resultado:number
};
export function Cotizacion({ datos, resultado }: CotizacionProps) {
  return (
    <>
      <div className="bg-white shadow-md rounded-2xl w-full max-w-2xl p-6 mt-8">
        {Object.values(datos).some(dato => dato === '') ? (
          <p className="text-center text-2xl font-medium text-gray-500">No hay Cotizacion</p>
        ) : (
          <>
            <h2 className="text-lg font-bold text-green-600 flex items-center gap-2 mb-4">
              ✅ Resumen de tu Cotización
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Marca:</span> {datos.marca}
              </p>
              <p>
                <span className="font-semibold">Año:</span> {datos.year}
              </p>
              <p>
                <span className="font-semibold">Plan:</span> {datos.plan}
              </p>
            </div>
            <p className="text-3xl font-extrabold text-blue-600 mt-4">
              ${resultado}
            </p>
          </>
        )}
      </div>
    </>
  );
}
