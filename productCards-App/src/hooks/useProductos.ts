import { useState, useMemo } from "react"
import { products } from "../data/data"
import type { cartProducts, Productos } from "../types"

export default function useProductos() {
    const[productos] = useState<Productos[]>(products)
    const[items, setItems] = useState<cartProducts[]>([]);

    function handleAddProdcuts(item:Productos){
      const existe = items.findIndex(product => product.id === item.id)
        if(existe >=0){
          // tomamos una copia del estado
          const upadateCart = [...items];
          // identificamos el objeto al que le aumentaremos la cantidad y la aumentaos
          upadateCart[existe].quantity++;
          // actulizamos el objeto
          setItems(upadateCart);
          
        }else{
          const newItems : cartProducts = {...item, quantity: 1}
           setItems([...items, newItems])
        }
    };

    function handleDelete(id:cartProducts['id']){
      const upadateCart = items.filter(item => item.id !== id);
      setItems(upadateCart);
    };

    function clearCart(){
      setItems([]);
    };

    const total = useMemo(()=>items.reduce((total, item) => total + (item.quantity * item.price), 0), [items]) 

  return{
    handleAddProdcuts,
    handleDelete,
    clearCart,
    productos,
    items,
    total
  }
};
