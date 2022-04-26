import React, { useEffect, useState } from 'react';

const EjemploGet = (props) => {
   const [loading,setLoading] = useState(true)
   const [data, setData]=useState({})
   const [count, setCount]=useState(0)
    const recibir_data = ()=>{
        fetch("/Consultas/Llamadas").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log("data obtenida de consultas Llamadas: ",data)  
                setLoading(false)            
            }
        )
    }
    useEffect(()=>{
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 15000);
        recibir_data()
      },[count]           
    )

    if(loading === true){
        <div>
            Cargando resultados...
        </div>
    }else{
        return (
          <div>Se ha cargado los archivos correctamente
              {/* <div>
                  {data['date'].map((data,key)=>
                    <h1 key={key}>
                        {data}
                    </h1>
                  )}
              </div> */}
          </div>
        )
    }
}

export default EjemploGet