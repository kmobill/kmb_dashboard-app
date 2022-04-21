/* import React, { useEffect, useState } from 'react'
import "./Table.css";
const Table_motivos = (props) => {
    const [count, setCount] = useState(0);
    const [dataMotivos, setDataMotivos]= useState([{}])
    const [loading, setLoading] = useState(true); */
    /* const recibirMotivos = ()=>{
        fetch("/Motivos").then(
            res => res.json()
        ).then(
            data => {
                setDataMotivos(data)
              console.log("MOTIVOS: ",dataMotivos)  
              setLoading(false)            
            }
        )
      }
      useEffect(()=>{
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 15000);
        recibirMotivos()
      },[count]           
    )
      if((loading === true)&&(dataMotivos==={})){
        <div>
          <h1>cargando datos...</h1>
        </div>
      }else{ */
      import React, { useState } from 'react'
      import "./Table.css";
      const Table_motivos = (props) => {
        var contador=0;
        return (
          <div className='table__container'>
                  <table className="table-fill">
                  <thead>
                  <tr>
                  <th className="text-left">Agentes</th>
                  {props.data['nombre_motivo'].map((data,i) =>(
                      <th key={i} className="text-left">{(data=="")||(data==null)?"***":data}</th>
                  ))}                  
                  </tr>
                  </thead>
                  <tbody className="table-hover">                    
                    {props.data['nombre_agente'].map((data,i) =>(
                      <tr key={i*10}>
                        <td  className="text-left">{data}</td>
                        {props.data['nombre_motivo'].map((data,key) =>(
                          <td  className="text-left">{props.data['num_motivos_por_agente'][i][key]}</td>
                        ))}
                        

                      </tr>
                    ))}
                  </tbody>
                  </table>
        
          </div>
        )
      }
      
      export default Table_motivos