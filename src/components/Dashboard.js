import React, { useEffect, useState } from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import RangeBar from './graphs/RangeBar';
import Acordeon from './graphs/Acordeon';
import Table from './graphs/Table';
import PieChart from './graphs/PieChart';

const Dashboard = (props) => {
    const [count, setCount] = useState(0);
    const [data3, setData3]= useState([{}])
    const [dataAgentes, setDataAgentes]= useState([{}])
    const [data5, setData5]= useState([{}])
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

    const data = [1,2,3]    
    const scores =[6,6,5,5,3,4,6,5];
    const labels = [100,200,300,400,500,600,700] 
    console.log("data obtenida de app Agentes",dataAgentes["Agentes"])
    //const labels = props.data["data"].map((label) => label)


    const data_ejemplo={scores: scores,labels: labels}
  return (
    <div className='container'> 
      <div className='card-group mb-3 col-12'>
          <Card calendar= {true} width='8' title="Fecha" component = {<RangeBar/>}/>
          <Card scrolleable ={true} width='2' title="Acordeon" component = {<Acordeon data={dataAgentes["Agentes"]}/>}/>
          <Card width='2' title="Grafico de barras" component = {<BarChart/>}/>
      </div>
      <div className='card-group mb-3 col-12'>
          <Card scrolleable ={true} title="Tabla" component = {<Table data ={dataAgentes["Agentes"]}/>}/>
          <Card scrolleable ={true} title="Grafico de barras" component = {<BarChart horizontal={true}/>}/>
          <Card title="Pastel" component = {<PieChart/>}/>
      </div>
      <div className='card-group mb-3 col-12'>
          <Card scrolleable ={true} title="Tabla" component = {<Table data ={dataAgentes["Agentes"]}/>}/>
          <Card title="Grafico de barras" component = {<BarChart horizontal={true}/>}/>
          <Card title="Pastel" component = {<PieChart/>}/>
          <Card title="Grafico de linea" component = {<LineChart data={data_ejemplo}/>}/>
      </div>        
    </div>  
    )
  }
}

export default Dashboard