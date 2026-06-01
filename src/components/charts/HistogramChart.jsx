import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const HistogramChart = ({ data = [] }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Days count',
        data: data.map(item => item.count),
        backgroundColor: data.map(item => item.mid ? '#7c94ff' : '#5c7aff'),
        borderRadius: 4,
        barPercentage: 0.85,
        categoryPercentage: 0.9,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(22, 26, 35, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#5c7aff',
        borderColor: '#2c3142',
        borderWidth: 1,
        padding: 12,
        titleFont: { size: 13, family: 'Inter', weight: '600' },
        bodyFont: { size: 15, family: 'Inter', weight: '700' },
        displayColors: false,
        callbacks: {
          title: function (context) {
            const dataIndex = context[0].dataIndex;
            return 'Range: ' + data[dataIndex].range;
          },
          label: function (context) {
            return context.raw + ' days';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'SESSIONS COUNT',
          color: '#59637a',
          font: { family: 'Inter', size: 10, weight: '700', letterSpacing: 1 }
        },
        ticks: {
          color: '#59637a',
          font: { family: 'monospace', size: 11 },
          stepSize: 1,
        },
        grid: {
          color: '#232735',
          drawBorder: false,
        }
      },
      x: {
        title: {
          display: true,
          text: 'VALUE CHANGE',
          color: '#59637a',
          font: { family: 'Inter', size: 10, weight: '700', letterSpacing: 1 },
          padding: { top: 15 }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: '#8a92a5',
          font: { family: 'Inter', size: 11 }
        },
        grid: {
          display: false,
          drawBorder: true,
          borderColor: '#2c3142'
        }
      }
    }
  };

  if (!data || data.length === 0) {
    return null;
  }

  return <Bar data={chartData} options={options} />;
};

export default HistogramChart;
