import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface SparklineProps {
  data: number[];
}

const Sparkline: React.FC<SparklineProps> = ({ data }) => {
  const chartData = {
    labels: new Array(data.length).fill(''),
    datasets: [
      {
        data,
        borderColor: '#3b82f6',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="h-8 w-24">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Sparkline;