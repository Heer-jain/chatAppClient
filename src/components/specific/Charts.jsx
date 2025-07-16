import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { getLast7Days } from '../../lib/Features';

ChartJS.register(CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend);

const lineChartOption = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    }
}

const labels = getLast7Days()

const LineChart = ({value=[]}) => {
  const chartRef = useRef(null);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: value,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Properly clean up the chart
      }
    };
  }, []);

  return <Line ref={chartRef} data={data} options={lineChartOption} />;
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: false
    },
    title: {
        display: false
    },
    cutout: 120
}

const DoughnutChart = ({value=[], labels=[]}) => {
    const data = {
        labels: labels,
        datasets: [
          {
            label: "Single Chats VS Group Chats",
            data: value,
            fill: true,
            backgroundColor: ["Brown", "Yellow"],
            borderColor: ["Brown", "Yellow"],
            offset: 10
          }
        ]
    };
    return <Doughnut data={data} options={doughnutChartOptions} style={{zIndex: 10}} />
}

export { LineChart, DoughnutChart };
