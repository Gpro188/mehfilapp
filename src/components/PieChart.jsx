import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ 
  data, 
  title = '',
  height = '300px'
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Data',
        data: data.values,
        backgroundColor: data.colors || [
          '#6e45e2',
          '#88d3ce',
          '#3498db',
          '#2ecc71',
          '#f1c40f',
          '#e74c3c',
          '#9b59b6'
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: !!title,
        text: title,
      },
    },
  };

  return (
    <div style={{ height, position: 'relative' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;