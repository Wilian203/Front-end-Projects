import { useState,} from "react";
import type { Cotizacion } from "../types";

export function useCotizador(){
  const years = [
    2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
    2013,
  ];

  const[datos, setDatos] = useState<Cotizacion>({
    marca: '',
    year: 2025,
    plan: ''
  });

  const [resultado, setResultado] = useState(0);


  function agregarCotizacion(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
    const valor = e.target.value;
    const agregarDatos = {...datos, [e.target.name]: valor}
    setDatos(agregarDatos)
  };

  function calcularSeguro(){
    // verifacmo que tanto la marca y el plan tengan algo para hace el calculo
    if(!datos.marca|| !datos.plan ){
      setResultado(0)
      return;
    }
    let base = 4000;
 
    switch(datos.marca){
        case 'europeo':
            base *=1.05
            break;
        case 'americano':
            base *= 1.15
            break;
        case 'asiatico':
            base *= 1.10
            break;
        default:
         break;      
    };

    const plan = datos.plan === 'completo' ? 1.50 : 1.25
    const total = base * plan
    setResultado(total);
    
   
  };

  function reiniciar(){
    setDatos({
        marca: '',
        year: 2025,
        plan: ''
    });
    setResultado(0)
    // recargamos la pagina
    window.location.reload();
  }

    return{
      agregarCotizacion,
      setDatos,
      calcularSeguro,
      reiniciar,
       years,
       datos,
      resultado
    };
};