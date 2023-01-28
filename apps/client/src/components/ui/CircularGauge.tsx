import React from 'react';

interface Props {
  value: number;
  inside: React.ReactNode;
  color: string;
  strokeWidth?: number;
  size?: number;
  maxValue?: number;
  minValue?: number;
}

const CircularGauge = ({ value, minValue = 0, maxValue = 100, inside, color, strokeWidth = 7, size = 100 }: Props) => {
  const center = size / 2;
  const r = center - strokeWidth;
  const c = 2 * r * Math.PI;
  const a = c * -1;
  const percentage = (value - minValue) / (maxValue - minValue);
  const offset = c - percentage * a;

  return (
    <div className="relative w-fit">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" strokeWidth={strokeWidth}>
        <circle
          role="presentation"
          cx={center}
          cy={center}
          r={r}
          stroke="#404040"
          strokeDasharray={`${a} ${c}`}
          strokeLinecap="round"
          transform={`rotate(135 ${center} ${center})`}
        />
        <circle
          role="presentation"
          cx={center}
          cy={center}
          r={r}
          stroke={color}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(270 ${center} ${center})`}
        />
      </svg>
      <p className="absolute top-1/2 left-1/2 z-30 -translate-y-1/2 -translate-x-1/2">{inside}</p>
    </div>
  );
};

export default CircularGauge;
