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
  TimeScale,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, TimeScale);

const options: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
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
        label: function (context: TooltipItem<'line'>) {
          const label = (context.raw as { x: string; y: number }).y;

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
      type: 'time',
      grid: {
        color: '#26262688',
      },
    },
  },
};

interface Props {
  data: { value: number; time: string }[];
}

const LineChart = ({ data: dataset }: Props) => {
  const data = {
    datasets: [
      {
        label: 'Average',
        data: dataset.map((v) => ({ y: v.value, x: new Date(v.time) })),
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
