import React, { useEffect, useState } from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import Table from './graphs/Table';
import PieChart from './graphs/PieChart';
import CalendarsContainer from './CalendarsContainer';
import Table_motivos from './graphs/Table_motivos';

const Dashboard3 = (props) => {
    function capitalizeFirstLetter(string) {
      var aux = ""
      for (let index = 0; index < string.length; index++) {
          if(index != 0){
            aux += string[index].toLowerCase();
          }        
      }
      return string.charAt(0).toUpperCase() + aux;
    }
    const [count, setCount] = useState(0);
    const [dataMotivos, setDataMotivos]= useState([{}])
    const [dataAgentes, setDataAgentes]= useState([{}])
    const [dataLlamadas,setDataLlamadas]=useState([{}])

    const [dataCompleta, setDataCompleta]= useState([{}])
    const [loading, setLoading] = useState(true);
    const recibirAgentes = ()=>{
      fetch("/Consultas/Agentes").then(
          res => res.json()
      ).then(
          data => {
            setDataAgentes(data)
            console.log("dataAgentes Agentes",dataAgentes)  
            setLoading(false)            
          }
      )
    }
    const recibir_data = async()=>{
      const aux = await fetch("/DataCompleta").then(
          res => res.json()
      ).then(
          data => {            
            console.log("data completa: ",data)  
            setLoading(false)            
          }
      )
      setDataCompleta(aux).then(
        console.log("data con async:",dataCompleta)
      )
    }
    const recibir_data_ = async ()=>{
      fetch("/DataCompleta").then(
          res => res.json()
      ).then(
          data => {
            setDataCompleta(data)
            console.log("data completa________: ",dataCompleta)  
            setLoading(false)            
          }
      )
    }
    const recibir_llamadas = ()=>{
      fetch("/Consultas/Llamadas").then(
          res => res.json()
      ).then(
          data => {
            setDataLlamadas(data)             
            setLoading(false)  
            console.log("llamadas:",dataLlamadas)           
          }
      )
    }
    useEffect(()=>{
        recibirAgentes()
        console.log("useefect data agentes: ",dataAgentes)
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 2000);
      },[count]           
    )

    if(loading === true){
      <div>
        <h1>cargando datos...</h1>
      </div>
    }else{  
    

  /* const label_ciudades = dataCompleta['date']['ciudad_llamadas_por_ciudad']['ciudades'].map((ciudad)=>(
    capitalizeFirstLetter(ciudad))) */
  const data_gestiones_agentes={labels: dataAgentes['agentes'],scores: dataAgentes['num_gestiones']}
  /* const data_llamadas_cuidad={labels: label_ciudades, scores:dataCompleta['date']['ciudad_llamadas_por_ciudad']['llamadas_por_ciudad']} */

    
  return (
    <div className='container'> 
      <div className='card__group mb-3 col-12'>
          <Card  width='6' title="Cantidad de Gestion por Agente" component = {<LineChart legend="Numero de gestiones por agente" data={data_gestiones_agentes}/>}/>
          <Card width='5'title="Pastel" component = {<PieChart labels={data_gestiones_agentes.labels} scores= {data_gestiones_agentes.scores}/>}/>
      </div>
      <div className='card__group mb-3 col-12'>
          <Card calendar= {false} width='2' title="Fecha" component = {<CalendarsContainer/>}/>
          {/* <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataCompleta['date']}/>}/> */}
          <Card width='6' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} />}/>
         {/*  <Card width='3' scrolleable ={true} title="Cantidad de Gestion por Agente" component = {<Table data ={dataCompleta['date']}/>}/> */}
      </div>
      {/* <div className='card__group mb-3 col-12'>
          <Card table={true} width='12' scrolleable ={true} title="Motivos recibidos en función del agente" component = {<Table_motivos data ={dataCompleta['date']}/>}/>
      </div>  */}
      {/* <div className='card__group mb-3 col-12'>
          <Card radio='100' width='4' title="Motivos de llamadas" component = {<PieChart labels= {dataCompleta['date']['nombre_motivo']}scores={dataCompleta['date']['motivo_total'][0]}/>}/>
          <Card width='7' scrolleable ={true} title="Grafico de barras" component = {<BarChart data={data_llamadas_cuidad} horizontal={false}/>}/>
      </div>  */}      
    </div>  
    )
  }
}

export default Dashboard3
{/* <Card width='3' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} horizontal={true}/>}/> */}