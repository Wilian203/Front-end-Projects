import useCart from "./hooks/useCart"
import Header from "./components/Header"
import Productos from "./components/Productos"
function App() {
 const{cart, datos, agregarCarrito, eliminarProducto, vaciarCarrito, estaVacio, totalPagar} = useCart()
  return (
    <>
      <Header
        cart={cart}
        eliminarProducto={eliminarProducto}
        vaciarCarrito={vaciarCarrito}
        estaVacio={estaVacio}
        totalPagar={totalPagar}
      />
      <main className="contenedor">
        <div className="nuestros-productos" id="lista-productos">
          <h2>Nuestros Productos</h2>
          <div className="productos">
          {/* recorremos cada producto que esta en el state para mostrarlos  */}
              {datos.map(productos =>
                <Productos 
                  key={productos.id}
                  productos={productos} 
                  agregarCarrito={agregarCarrito}
                />
              )}
          </div>
        </div>
      </main>

      <footer className="footer contenedor">
        <p>Todos los derechos reservados &copy;ElectroStore</p>
      </footer>
    </>
  )
}

export default App
