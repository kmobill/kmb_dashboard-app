import React, { useEffect, useState } from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import Table from './graphs/Table';
import PieChart from './graphs/PieChart';
import CalendarsContainer from './CalendarsContainer';
import Table_motivos from './graphs/Table_motivos';

const Dashboard = (props) => {
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
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
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
            console.log("fetch Agentes",dataAgentes)  
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
            console.log("fetch llamadas:",dataLlamadas)           
          }
      )
    }
    const recibirMotivos = ()=>{
      fetch("/Consultas/Motivo").then(
          res => res.json()
      ).then(
          data => {
            setDataMotivos(data)             
            setLoading(false)  
            console.log("fetch motivos:",dataMotivos)           
          }
      )
    }
    useEffect(()=>{
        recibirAgentes()
        console.log(`useeffect data agentes: ${dataAgentes} y la hora: ${new Date().toLocaleTimeString()}`)
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 10000);
      },[count]           
    )
    useEffect(()=>{
      recibir_llamadas()
      console.log(`useeffect data llamdas: ${dataLlamadas} y la hora: ${new Date().toLocaleTimeString()}`)
      setTimeout(() => {
        setCount2((count) => count + 1);
      }, 5000);
    },[count2]           
  )
    useEffect(()=>{
      recibirMotivos()
      console.log(`useeffect data motivos: ${dataMotivos} y la hora: ${new Date().toLocaleTimeString()}`)
      setTimeout(() => {
        setCount3((count) => count + 1);
      }, 15000);
    },[count3]           
  )
  useEffect(()=>{
    console.log("_____________cambios en las datas_______________")    
  },[dataMotivos,dataAgentes,dataLlamadas]           
)

    if(loading === true){
      <div>
        <h1>cargando datos...</h1>
      </div>
    }else{  
    
  const data_llamadas_cuidad={labels: "", scores:""}
  /* const label_ciudades = dataLlamadas['ciudad_llamadas_por_ciudad']['ciudades'].map((ciudad)=>(
    capitalizeFirstLetter(ciudad)))  */
  const data_gestiones_agentes={labels: dataAgentes['agentes'],scores: dataAgentes['num_gestiones']}
  if(dataLlamadas.length>1){
    const data_llamadas_cuidad={labels: dataLlamadas['ciudades'], scores:dataLlamadas['llamadas_por_ciudad']}
    console.log("entro al if")
  }else{
    
    console.log("no entro al if")
  }
  

    
  return (
    <div className='container'> 
      <div className='card__group mb-3 col-12'>
          <Card calendar= {false} width='2' title="Fecha" component = {<CalendarsContainer/>}/>
          {/* <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataCompleta['date']}/>}/> */}
          <Card width='6' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} />}/>
         {/*  <Card width='3' scrolleable ={true} title="Cantidad de Gestion por Agente" component = {<Table data ={dataCompleta['date']}/>}/> */}
      </div>
      <div className='card__group mb-3 col-12'>
          <Card  width='6' title="Cantidad de Gestion por Agente" component = {<LineChart legend="Numero de gestiones por agente" data={data_gestiones_agentes}/>}/>
          <Card width='5'title="Pastel" component = {<PieChart labels={data_gestiones_agentes.labels} scores= {data_gestiones_agentes.scores}/>}/>
      </div>
      <div className='card__group mb-3 col-12'>
          <Card table={true} width='12' scrolleable ={true} title="Motivos recibidos en función del agente" component = {<Table_motivos/>}/>
      </div> 
      <div className='card__group mb-3 col-12'>
          {/* <Card radio='100' width='4' title="Motivos de llamadas" component = {<PieChart labels= {dataMotivos['nombre_motivo']}scores={dataMotivos['motivo_total'][0]}/>}/> */}
          <Card width='7' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} horizontal={false}/>}/>
      </div>       
    </div>  
    )
  }
}

export default Dashboard
{/* <Card width='3' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} horizontal={true}/>}/> */}