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
      import React, { useEffect, useState } from 'react'
      import "./Table.css";
      const Table_motivos = () => {
      const [dataMotivos, setDataMotivos] = useState({})
      const [loading, setLoading]=useState(true)
      const [empty, setEmpty]=useState(true)
      const recibirMotivos =()=>{
        fetch("/Consultas/Motivo").then(
          res => res.json()
        ).then(
            data => {
              setDataMotivos(data)
              console.log("MOTIVOS: ",dataMotivos)  
              setLoading(false)   
              if(data != null){
                setEmpty(false)
              }         
            }
        )
      }

        useEffect(()=>{
            recibirMotivos()
          },[dataMotivos]           
        )
      if(loading){
        <h1>Cargando recursos...</h1>
      }else{
        while(empty){
          <h1>recursos vacios, volviendo a realizar la peticion</h1>
          recibirMotivos()          
        }        
          return (
            <div className='table__container'>
                    <table className="table-fill">
                    <thead>
                    <tr>
                        <th className="text-left">Motivo</th>
                        <th className="text-left">cantidad de registros</th>                                     
                    </tr>
                    </thead>
                      <tbody className="table-hover"> 
                      {dataMotivos['nombre_motivo'].map((data,i) =>(
                        <tr key={i}>
                           <td  className="text-left">{data}</td>
                           <td  className="text-left">{dataMotivos['motivo_total'][0][i]}</td>
                        </tr>
                         
                      ))}
                        
                      </tbody>
                    
                    </table>
          
            </div>
          )
        
      }
        
      }
      
      export default Table_motivos