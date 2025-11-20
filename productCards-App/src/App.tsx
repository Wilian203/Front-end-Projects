import Header from "./components/Header"
import Hero from "./components/Hero"
import ProductsList from "./components/ProductsList"
import useProductos from "./hooks/useProductos"

function App() {
const{ handleAddProdcuts, handleDelete, clearCart, productos, items, total} = useProductos()

  return (
    <>
      <Header 
        items={items}
        total={total}  
        handleDelete={handleDelete}
        clearCart={clearCart}
        />
      <Hero />

      <main>
        <ProductsList
          productos ={productos}
          handleAddProdcuts={handleAddProdcuts}
        />
      </main>
    </>
  )
}
export default App
