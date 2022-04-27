import React, { useEffect, useState } from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import Table from './graphs/Table';
import PieChart from './graphs/PieChart';
import CalendarsContainer from './CalendarsContainer';
import Table_motivos from './graphs/Table_motivos';

const Dashboard2 = (props) => {
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
    const recibir_data = ()=>{
      fetch("/DataCompleta").then(
          res => res.json()
      ).then(
          data => {
            setDataCompleta(data)
            console.log("data completa: ",dataCompleta)  
            setLoading(false)            
          }
      )
    }
    const recibirMotivos = ()=>{
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
    const recibir_fecha = ()=>{
      fetch("/Fecha").then(
          res => res.json()
      ).then(
          data => {
            setDataAgentes(data)             
            setLoading(false)  
            console.log("fecha:",dataAgentes)           
          }
      )
    }
    useEffect(()=>{
        setTimeout(() => {
          setCount((count) => count + 1);
        }, 15000);
        recibirAgentes()
      },[count]           
    )

    if(loading === true){
      <div>
        <h1>cargando datos...</h1>
      </div>
    }else{

    const data = [500,20,100]    
    const scores =[6,6,5,5,3,4,6,5];
    const labels = [100,200,300,400,500,600,700] 
    const labels2 = [100,200,300,400,500,600,700,800,900,1000,1100] 
    const scores2 =[10,2,1,3,7,2,7,8,2,10,5,4];
    const scores3 =[1,10,3,7,11,1,4,7,1,2,3,4];
    console.log("data obtenida de app Agentes",dataCompleta['data'])
    //const labels = props.data["data"].map((label) => label)

      /* const label_ciudades = dataCompleta['data']['ciudad_llamadas_por_ciudad']['ciudades'].map((ciudad)=>(
        capitalizeFirstLetter(ciudad))) */
    const data_gestiones_agentes={labels: labels,scores: scores}
    const data_gestiones_agentes2={labels: labels2,scores: scores2}
    const data_gestiones_agentes3={labels: labels2,scores: scores3}
    /* const data_llamadas_cuidad={labels: label_ciudades, scores:dataCompleta['data']['ciudad_llamadas_por_ciudad']['llamadas_por_ciudad']} */
  return (
    <div className='container'> 
      <div className='card__group mb-3 col-12'>
          {/* <Card calendar= {false} width='3' title="Fecha" component = {<CalendarsContainer/>}/> */}
          {/* <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataCompleta['data']}/>}/> */}
          <Card  width='10' title="tiempo de llamadas" component = {<LineChart legend="Numero de gestiones por agente" data={data_gestiones_agentes2}/>}/>
          
      </div>
      <div className='card__group mb-3 col-12'>
          {/* <Card calendar= {false} width='3' title="Fecha" component = {<CalendarsContainer/>}/> */}
          {/* <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataCompleta['data']}/>}/> */}
          <Card  width='5' title="numero de fallas en funcion de los agentes" component = {<BarChart horizontal={true} data={data_gestiones_agentes2} />}/>
          <Card  width='5' title="Grafico de barras" component = {<BarChart horizontal={true} data={data_gestiones_agentes3} />}/>
          
      </div>
      <div className='card__group mb-3 col-12'>
          {/* <Card width='3' scrolleable ={true} title="Cantidad de Gestion por Agente" component = {<Table data ={dataCompleta['data']}/>}/> */}
          <Card  width='6' title="Cantidad de llamadas exitosas por agente" component = {<LineChart legend="Numero de gestiones por agente" data={data_gestiones_agentes}/>}/>
          <Card width='4'title="Pastel" component = {<PieChart labels={data_gestiones_agentes.labels} scores= {data_gestiones_agentes.scores}/>}/>
      </div>

      {/* <div className='card__group mb-3 col-12'>
          <Card table={true} width='12' scrolleable ={true} title="Motivos recibidos en función del agente" component = {<Table_motivos data ={dataCompleta['data']}/>}/>
      </div> 
      <div className='card__group mb-3 col-12'>
          <Card radio='100' width='4' title="Motivos de llamadas" component = {<PieChart labels= {dataCompleta['data']['nombre_motivo']}scores={dataCompleta['data']['motivo_total'][0]}/>}/>
          
          <Card width='7' scrolleable ={true} title="Grafico de barras" component = {<BarChart data={data_llamadas_cuidad} horizontal={false}/>}/>
      </div>    */}    
    </div>  
    )
  }
}

export default Dashboard2