import React, { useEffect, useState } from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import RangeBar from './graphs/RangeBar';
import Acordeon from './graphs/Acordeon';
import Table from './graphs/Table';
import PieChart from './graphs/PieChart';
import BasicDatePicker from './BasicDatePicker';
import { CalendarContainer } from 'react-datepicker';
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
    const [dataMotivos, setDataMotivos]= useState([{}])
    const [dataAgentes, setDataAgentes]= useState([{}])

    const [dataCompleta, setDataCompleta]= useState([{}])
    const [loading, setLoading] = useState(true);
    const recibirAgentes = ()=>{
      fetch("/Agentes").then(
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
        recibir_data()
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
    console.log("data obtenida de app Agentes",dataCompleta['data'])
    //const labels = props.data["data"].map((label) => label)

      const label_ciudades = dataCompleta['data']['ciudad_llamadas_por_ciudad']['ciudades'].map((ciudad)=>(
        capitalizeFirstLetter(ciudad)))
    const data_gestiones_agentes={labels: dataCompleta['data']['nombre_agente'],scores: dataCompleta['data']['gestiones_agente']}
    const data_llamadas_cuidad={labels: label_ciudades, scores:dataCompleta['data']['ciudad_llamadas_por_ciudad']['llamadas_por_ciudad']}
  return (
    <div className='container'> 
      <div className='card__group mb-3 col-12'>
          <Card calendar= {false} width='3' title="Fecha" component = {<CalendarsContainer/>}/>
          {/* <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataCompleta['data']}/>}/> */}
          <Card width='6' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} />}/>
      </div>
      <div className='card__group mb-3 col-12'>
          <Card width='3' scrolleable ={true} title="Cantidad de Gestion por Agente" component = {<Table data ={dataCompleta['data']}/>}/>
          <Card  width='5' title="Cantidad de Gestion por Agente" component = {<LineChart legend="Numero de gestiones por agente" data={data_gestiones_agentes}/>}/>
          <Card width='3'title="Pastel" component = {<PieChart scores={data}/>}/>
      </div>
      <div className='card__group mb-3 col-12'>
          <Card table={true} width='12' scrolleable ={true} title="Motivos recibidos en función del agente" component = {<Table_motivos data ={dataCompleta['data']}/>}/>
      </div> 
      <div className='card__group mb-3 col-12'>
          <Card radio='100' width='4' title="Motivos de llamadas" component = {<PieChart labels= {dataCompleta['data']['nombre_motivo']}scores={dataCompleta['data']['motivo_total'][0]}/>}/>
          {/* <Card width='3' title="Grafico de barras" component = {<BarChart data={data_gestiones_agentes} horizontal={true}/>}/> */}
          <Card width='7' scrolleable ={true} title="Grafico de barras" component = {<BarChart data={data_llamadas_cuidad} horizontal={false}/>}/>
      </div>       
    </div>  
    )
  }
}

export default Dashboard