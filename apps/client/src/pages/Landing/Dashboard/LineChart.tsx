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
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  legend: {
    display: false,
  },
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      // mode: "interpolate",
      caretPadding: 12,
      usePointStyle: true,
      backgroundColor: '#262626DE',
      titleColor: '#D4D4D4',
      callbacks: {
        label: function (context: any) {
          const label = context.raw;

          return 'Average: ' + label + '%';
        },
      },
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: false,
      position: 'left' as const,
      grid: {
        color: 'transparent',
      },
    },
    x: {
      grid: {
        color: '#26262688',
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

interface Props {
  data: number[];
}

const LineChart = ({ data: dataset }: Props) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Average',
        data: dataset,
        borderColor: '#3B82F6',
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, '#3B82F666');
          gradient.addColorStop(1, '#1D4ED800');
          return gradient;
        },
        tension: 0.4,
        yAxisID: 'y',
        fill: true,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
