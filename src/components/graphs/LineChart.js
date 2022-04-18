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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
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

export default function LineChart(props){
  const labels =  props.labels;
  const data = useMemo(function(){
    return{      
      datasets: [
        {
          label: "Mis datos",
          data: props.scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        }
      ],
      labels,
    }
  },[]);

  return <Line data ={data} options={options}/>
}