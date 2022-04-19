import { useMemo } from "react";
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from "chart.js";
import {Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options ={
  responsive: true,
};

export default function PieChart(props){
  const labels =  [
    'Red',
    'Yellow',
    'Blue']
  const scores = [10, 20, 30]
  const data = useMemo(function(){
    return{      
      datasets: [{
        label: 'My First Dataset',
        radius: 80,
        data: [300, 50, 100],
        offset: 2,
        borderWidth:1,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }],
      labels,
    }
  },[]);

  return <Pie data ={data} options={options}/>
}