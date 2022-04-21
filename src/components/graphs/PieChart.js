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
  
  plugins: {
    legend: {
        display: true,
        labels: {
          font:{
          size: 7
          }
        }
    }
}
};

export default function PieChart(props){
  const labels = props.labels
    const scores = props.scores
  const data = useMemo(function(){
    
    return{      
      datasets: [{
        label: 'My First Dataset',
        radius: props.radio,
        data: scores,
        offset: 2,
        borderWidth:1,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          '#3260a8',
          '#32a0a8',
          '#8ca832',
          '#bdc79d',
          '#727ac2',
          '#95b57d',
          '#c77469',
          '#320854',
          '#4d0717',
          '#96787f',
          '#8da68a',
          '#139404',
          '#a64612'
        ],
        hoverOffset: 4
      }],
      labels,
    }
  },[]);

  return <Pie data ={data} options={options}/>
}