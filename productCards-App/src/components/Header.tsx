import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartSidebar from "./CartSidebar";
import type { cartProducts } from "../types";

type HeaderProps = {
  items: cartProducts[],
  total:number,
   handleDelete: (item:cartProducts['id']) => void
   clearCart: ()=> void
}
export default function Header({items, total, handleDelete, clearCart}:HeaderProps) {
const [openCart, setOpenCart] = useState(false);
  return (
    <header className=" container mx-auto py-5 flex flex-col md:flex-row  md:justify-between items-center  
    border-b-1 border-gray-300 gap-5 md:gap-0">
        <h1 className="text-2xl font-black m-0">Product Cards App</h1>

        <nav className="flex flex-col md:flex-row text-center gap-5">
            <a className="font-medium text-1xl" href="#">Home</a>
            <a className="font-medium text-1xl" href="#">Products</a>
        </nav>

        <button onClick={()=>setOpenCart(true)}>
            <ShoppingCart className="w-10 h-10 text-gray-700 cursor-pointer bg-gray-200 p-2 rounded" />
        </button>

        <CartSidebar
          isOpen={openCart} 
          onClose={() => setOpenCart(false)} 
          items={items}
          total={total}
          handleDelete={handleDelete}
          clearCart={clearCart}
         />
    </header>
  )
}
