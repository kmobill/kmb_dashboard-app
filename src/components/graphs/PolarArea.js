import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const options = {
    responsive: true,
};
const labels = ["Red", "Green", "Yellow", "Grey", "Blue"]


export default function LineChart() {
    
    const data = useMemo (function(){
        return {    
            datasets: [
                {
                    label: "My First Dataset",
                    data: [11, 16, 7, 3, 14],
                    backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(75, 192, 192)",
                    "rgb(255, 205, 86)",
                    "rgb(201, 203, 207)",
                    "rgb(54, 162, 235)",
                    ],
                },
            ],
            labels,
        }
    },[]);
  return <PolarArea data={data} options={options}/>;
}
