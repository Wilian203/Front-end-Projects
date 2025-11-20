import { X } from "lucide-react";
import type { cartProducts } from "../types";

type CartSidebarProps = {
  isOpen: boolean,
  onClose: () => void,
  items: cartProducts[],
  total:number
  handleDelete: (item:cartProducts['id']) => void
  clearCart: ()=> void

}

export default function CartSidebar({ isOpen, onClose, items, total, handleDelete, clearCart }: CartSidebarProps) {
  
  return (
    <>
      {/* Fondo oscurecido */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
        onClick={onClose}
      >
        {/* PANEL LATERAL */}
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 flex flex-col 
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Tu Carrito</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
            </button>
          </div>

          {/* Si no hay items */}
          {items.length === 0 ? (
            <h2 className="text-gray-500 text-center mt-10">No hay productos</h2>
          ) : (
            <>
              {/* Total */}
              <p className="text-sm text-gray-500 mb-4">
                Total: <span className="font-semibold text-gray-800">${total}</span>
              </p>

              {/* LISTA DE ITEMS */}
              <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-100 p-3 rounded-xl"
                  >
                    <div className="flex gap-3 items-center">

                      <div className="w-12 h-12 bg-gray-200 rounded-xl p-4"></div>

                      <div>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-blue-600 font-semibold text-sm">
                          ${item.price} {''}
                          <span className="text-gray-600">x{item.quantity}</span>
                        </p>
                      </div>
                    </div>
                  
                    <span 
                    className="bg-red-700 w-5 h-5 p-3 rounded-full text-[13px] flex justify-center items-center
                     text-white cursor-pointer"
                     onClick={()=> handleDelete(item.id)}
                     >X</span>
                  </div>
                ))}
              </div>

              <button 
                className="w-full text-white bg-gray-800 p-3 rounded text-[20px] mt-3 cursor-pointer"
                onClick={clearCart}
                >
                🗑️ Vaciar carrito
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );

}
