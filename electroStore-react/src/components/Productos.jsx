function Productos({productos, agregarCarrito}){
    const{imagen, titulo, descripcion, precio} = productos;
    return(
        <div className="producto-contenedor" >
            <div className="producto" data-id ="1">
                <img loading ="lazy" src={`img/${imagen}.jpg`}width ="500"height ="300"/>
                <h3>{titulo}</h3>
                <p>{descripcion}</p>
                <p className="precio">${precio}</p>
                <a 
                 className="producto-btn agregar-carrito"
                 onClick={()=> agregarCarrito(productos)}
                >
                    Agregar al carrito
                </a>
            </div>
        </div>
       
    )
};

export default Productos;