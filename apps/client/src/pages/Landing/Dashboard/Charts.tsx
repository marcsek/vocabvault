import { Chart as ChartJS, Tooltip, ChartOptions, TooltipItem, ChartData } from 'chart.js';
import { color } from 'chart.js/helpers';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { normalize } from '../../../utils/helpers/normalize';

ChartJS.register(Tooltip, MatrixController, MatrixElement);

interface BarChartProps {
  data: { value: number; time: string }[];
}

const BarOptions: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      caretPadding: 12,
      usePointStyle: true,
      backgroundColor: '#262626DE',
      titleColor: '#D4D4D4',
      callbacks: {
        label: (ctx: TooltipItem<'bar'>) => {
          return ' # of session: ' + ctx.raw;
        },
      },
    },
  },
  scales: {
    y: {
      grid: {
        color: '#262626',
      },
      border: {
        display: false,
        dash: [5, 5],
      },
      ticks: {
        padding: 0,
        stepSize: 1,
      },
    },
    x: {
      grid: {
        color: 'transparent',
      },
      border: {
        display: false,
      },
    },
  },
};

export const BarChart = ({ data: dataset }: BarChartProps) => {
  const data: ChartData<'bar'> = {
    labels: dataset.map((v) => v.time),
    datasets: [
      {
        backgroundColor: '#3B82F633',
        borderColor: '#3B82F6',
        borderWidth: 3,
        borderRadius: 8,
        label: 'Activity',
        data: dataset.map((v) => v.value),
      },
    ],
  };

  return <Chart type="bar" data={data} options={BarOptions} />;
};

type MyMatrixDatapoint = { x: Date; y: number; v: number };

interface MatrixChartProps {
  data: { value: number; time: string }[];
}
const matrixChartOption: ChartOptions<'matrix'> = {
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 0,
  },
  //{
  //    easing: 'linear',
  //    duration: 500,
  //    delay: (ctx) => {
  //      let delay = 0;
  //      if (ctx.type === 'data') {
  //        delay = ctx.dataIndex * 1;
  //      }
  //      return delay;
  //    },
  //    x: {
  //      from: 500,
  //    },
  //    y: {
  //      from: 500,
  //    },
  //},
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      caretPadding: 12,
      usePointStyle: true,
      backgroundColor: '#262626DE',
      titleColor: '#D4D4D4',
      callbacks: {
        label: (ctx: TooltipItem<'matrix'>) => {
          const value = (ctx.raw as MyMatrixDatapoint).v;
          return ' # of session: ' + value;
        },
        title: (ctx: TooltipItem<'matrix'>[]) => {
          const date = new Date((ctx[0].raw as MyMatrixDatapoint).x);
          const monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
          return monthName + ' ' + date.getDate();
        },
      },
    },
  },

  scales: {
    y: {
      offset: true,
      position: 'right',
      border: {
        display: false,
      },
      ticks: {
        callback: (value: string | number) => {
          const weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          return weekday[(value as number) - 1];
        },
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        font: {
          size: 9,
        },
      },
      grid: {
        display: false,
        tickLength: 0,
      },
    },
    x: {
      type: 'time',
      position: 'bottom',
      offset: true,
      border: {
        display: false,
      },
      time: {
        unit: 'week',
        round: 'week',
        isoWeekday: 1,
        displayFormats: {
          week: 'MMM DD',
        },
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 9,
        },
      },
      grid: {
        display: false,
        tickLength: 0,
      },
    },
  },
};

export const MatrixChart = ({ data }: MatrixChartProps) => {
  const maxDataValue = Math.max(...data.map((e) => e.value));

  const config: ChartData<'matrix', MyMatrixDatapoint[]> = {
    datasets: [
      {
        label: 'Session matrix',
        data: data.map((v) => ({ x: new Date(v.time), y: ((new Date(v.time).getDay() + 6) % 7) + 1, v: v.value })),
        width: (c) => {
          const a = c.chart.chartArea || {};
          return (a.right - a.left) / 27 - 15;
        },
        height: (c) => {
          const a = c.chart.chartArea || {};
          return (a.bottom - a.top) / 7 - 10;
        },
        borderRadius: 4,
        borderWidth: 1.5,
        backgroundColor: (c) => {
          const value = (c.dataset.data as unknown as MyMatrixDatapoint[])[c.dataIndex].v;
          const alpha = normalize(value, maxDataValue, 0);
          return value === 0 ? color('#26262688').rgbString() : color('#1B806A').alpha(alpha).rgbString();
        },
        borderColor: (c) => {
          const value = (c.dataset.data as unknown as MyMatrixDatapoint[])[c.dataIndex].v;
          const alpha = normalize(value, maxDataValue, 0);
          return value === 0 ? color('#26262688').lighten(0.3).rgbString() : color('#1B806A').alpha(alpha).lighten(0.3).rgbString();
        },
      },
    ],
  };

  return <Chart type="matrix" data={config} options={matrixChartOption} />;
};
