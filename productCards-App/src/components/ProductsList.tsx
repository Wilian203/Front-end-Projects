import type { Productos } from "../types"

type ProductsListProps ={
  productos: Productos[]
  handleAddProdcuts:(item:Productos)=> void
}
export default function ProductsList({ productos, handleAddProdcuts }:ProductsListProps) {
  return (
    <div className=" container mx-auto py-[70px] grid grid-cols-1 md:grid-cols-3 gap-6">
      {productos.map(product => (
        <div
          key={product.id}
          className="shadow-lg bg-white rounded-xl p-4"
        >
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg mb-4 w-full object-cover"
          />

          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-gray-500">{product.description}</p>

          <p className="text-lg font-bold mt-2">${product.price}</p>

          <button 
            className="bg-black text-white rounded-full w-full py-2 mt-3 cursor-pointer"
            onClick={()=> handleAddProdcuts(product)}
          >
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
};
