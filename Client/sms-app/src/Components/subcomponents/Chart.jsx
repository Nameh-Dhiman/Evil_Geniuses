import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(RadialLinearScale, LineElement,ArcElement, PointElement, Tooltip, Legend);

const labels = ["DSA", "Coding", "CSBT"];

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      max: 10,
      min: 1,
      pointLabels: {
        display: true,
        centerPointLabels: true,
        font: {
          size: 15,
        },
      },
    },
  },
};

const Chart = ({gradesData}) => {

  const data = {
    labels,
    datasets: [
      {
        labels: labels,
        data: gradesData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };  

  return <PolarArea data={data} options={options}/>;
};

export default Chart;
