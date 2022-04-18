import React from 'react'
import BarChart from './graphs/BarChart'
import LineChart from './graphs/LineChart'
import "./Dashboard.css";
import Card from './Card';
import RangeBar from './graphs/RangeBar';
import { PolarArea } from 'react-chartjs-2';

const Dashboard = (props) => {
    const scores =[6,6,5,5,3,4,6,5];
    /* let labels = [100,200,300,400,500,600,700] */
    console.log("data obtenida de app",props.data["data"])
    const labels = props.data["data"].map((label) => label)
    console.log(labels)
  return (
    <div className='container'> 
    {/* {
    props.data["data"]!=undefined?
    props.data["data"].map((scores, key) => (        
        <h1 key={key}>{scores}</h1>
    )):""} */}
      <div className='card-group mb-3 col-12'>
          <Card title="Grafico de barras" component = {<RangeBar/>}/>
          <Card title="Grafico de linea" component = {<LineChart scores={scores} labels={labels}/>}/>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
      </div>
      <div className='card-group mb-3 col-12'>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
      </div>
      <div className='card-group mb-3 col-12'>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
          <Card title="Grafico de barras" component = {<BarChart/>}/>
          <Card title="Grafico de barras" component = {<PolarArea/>}/>
      </div>
        
    </div>  
  )
}

export default Dashboard