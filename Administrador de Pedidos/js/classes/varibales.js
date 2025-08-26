let edicion = {
    value:false
};

// objeto en donde se guardaran los datos
const datosObj = {
  id: Date.now().toString(),
  cliente: "",
  producto: "",
  cantidad: "",
  precio: "",
  estado: "",
  hora: new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
};

export{
    edicion,
    datosObj
};