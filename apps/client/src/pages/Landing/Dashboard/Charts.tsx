import { Chart as ChartJS, Tooltip, ChartOptions, TooltipItem, ChartData, ScriptableContext } from 'chart.js';
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

const matrixChartOption: ChartOptions<'matrix'> = {
  maintainAspectRatio: false,
  responsive: true,
  animation: {
    duration: 0,
  },
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
          const weekday = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
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

interface MatrixChartProps {
  data: { [k: string]: number };
}

export const MatrixChart = ({ data }: MatrixChartProps) => {
  const maxDataValue = Math.max(...Object.values(data));

  const config: ChartData<'matrix', MyMatrixDatapoint[]> = {
    datasets: [
      {
        label: 'Session matrix',
        data: fillMissingData(182, data),
        width: (c) => {
          const a = c.chart.chartArea || {};
          return (a.right - a.left) / 27 - 8;
        },
        height: (c) => {
          const a = c.chart.chartArea || {};
          return (a.bottom - a.top) / 7 - 17;
        },
        borderRadius: 4,
        borderWidth: 1.5,
        backgroundColor: (c) => generateMatrixColor(c, maxDataValue).rgbString(),
        borderColor: (c) => generateMatrixColor(c, maxDataValue).lighten(0.3).rgbString(),
      },
    ],
  };

  return <Chart className="!w-full" type="matrix" data={config} options={matrixChartOption} />;
};

const generateMatrixColor = (c: ScriptableContext<'matrix'>, maxVal: number) => {
  const value = (c.dataset.data as unknown as MyMatrixDatapoint[])[c.dataIndex].v;
  const alpha = normalize(value, maxVal, 0);
  return value === 0 ? color('#26262688') : color('#1B806A').alpha(alpha);
};

const fillMissingData = (dateRange: number, unfilledData: MatrixChartProps['data']) => {
  return Array.from(Array(dateRange), (_, idx) => {
    const date = new Date(new Date().setDate(new Date().getDate() - dateRange + idx + 1));
    const foundItem = unfilledData[date.toDateString()];
    return {
      x: date,
      y: ((date.getDay() + 6) % 7) + 1,
      v: foundItem ?? 0,
    };
  });
};

interface RadarChartProps {
  data: { wordSources: string[]; values: number[] };
}

const radarChartOption: ChartOptions<'radar'> = {
  maintainAspectRatio: false,
  responsive: true,

  plugins: {
    tooltip: {
      caretPadding: 12,
      usePointStyle: true,
      backgroundColor: '#262626DE',
      titleColor: '#D4D4D4',
      callbacks: {},
    },
    legend: {
      display: false,
    },
  },
  scales: {
    r: {
      angleLines: {
        color: '#262626',
      },
      grid: {
        color: '#262626',
      },
      ticks: {
        backdropColor: 'transparent',
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
    },
  },
};

export const RadarChart = ({ data }: RadarChartProps) => {
  const config: ChartData<'radar'> = {
    labels: data.wordSources,
    datasets: [
      {
        label: ' # of sessions',
        data: data.values,
        fill: true,
        backgroundColor: '#E11D4844',
        borderColor: '#E11D48',
        pointBackgroundColor: '#FB7185',
        pointBorderColor: '#FECDD3',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
      },
      {
        data: [0, 0, 0, 0],
        fill: false,
        showLine: false,
        hoverRadius: 0,
        pointRadius: 0,
      },
    ],
  };

  return <Chart className="!w-full" type="radar" data={config} options={radarChartOption} />;
};
