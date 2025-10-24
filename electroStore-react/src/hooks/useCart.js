import { useState } from "react"
import { useMemo } from "react";
import {datosDB}  from '../data/db'
function useCart(){
     // almacenamos los datos de la db en el state
  const[datos] = useState(datosDB);
  const[cart, setCart] = useState([]);


  // agregar datos al carrito
  function agregarCarrito(producto){
    // verificamos si existe un producto en el state y retorna su posicion
    const existe = cart.findIndex(item => item.id === producto.id);
    // si exsite aumentamos su cantidad
    if(existe >= 0){
        // tomamos una copia del arreglo original para no modificarlo
        const actulizarCarrito = [...cart]
        // de la copia del arreglo le pasamos la posicion que coincida con id y aumentamos su cantidad
        actulizarCarrito[existe].cantidad++
        // hacemos los cambios en el state
        setCart(actulizarCarrito)
        // si no existe agregamos el producto nuevo
    }else{
         producto.cantidad = 1
        setCart([...cart, producto])
    };
   
  };

  // elimininar del carrito
  function eliminarProducto(id){
      const eliminarCarrito = cart.filter(producto => producto.id !== id);
      setCart(eliminarCarrito);
  };

  function vaciarCarrito(){
    setCart([])
  };

  const estaVacio = useMemo(()=> cart.length === 0, [cart]);
  const totalPagar = useMemo(()=> cart.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0),[cart]);   

  return{
    cart,
    datos,
    agregarCarrito,
    eliminarProducto,
    vaciarCarrito,
    estaVacio,
    totalPagar
  }
};

export default useCart;