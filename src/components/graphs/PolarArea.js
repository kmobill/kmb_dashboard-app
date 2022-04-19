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
const labels = [100, 200, 300, 400, 700];
const scores = [11, 16, 7, 3, 14]
const options = {
    
};



export default function LineChart() {    
    const data = useMemo (function(){
        return {    
            datasets: [
                {
                    label: "My First Dataset",
                    data: scores
                },
            ],
            labels:[],
        };
    },[]);
  return (<PolarArea data={data} options={options}/>);
}
