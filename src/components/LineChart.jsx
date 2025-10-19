import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ 
  data, 
  title = '',
  height = '300px',
  color = '#6e45e2'
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Data',
        data: data.values,
        borderColor: color,
        backgroundColor: `${color}20`, // Add transparency
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: color,
        fill: true,
        tension: 0.4, // Smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height, position: 'relative' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;