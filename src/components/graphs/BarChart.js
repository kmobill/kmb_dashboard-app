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
import { Bar, Chart } from "react-chartjs-2";

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

/* const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5,3,2,1,2,3];
const labels = [100, 200, 300, 400, 500, 600, 700,800,900,1000,1100,1200]; */

const options = {
  fill: true,
  animations: false,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};
const options2= {
  chart:{
    canvas:{
      parentNode:{
        style:{
          height:500
        }
      }
    }
  },
  indexAxis: 'y',  
  elements: {
    bar: {
      borderWidth: 2,
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    }
  },
  
}

export default function BarChart(props) {
  const labels = props.data.labels
  const scores = props.data.scores
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Agentes",
          tension: 0.3,
          data: scores,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
      ],
      labels,
    };
  }, []);

  return (
    <div>
      <Bar data={data} options={props.horizontal? options2:options} />
    </div>
  );
}