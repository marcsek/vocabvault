import React from 'react';
import GaugeIndicator from './GaugeIndicator';

interface Props {
  Icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  unit?: string;
}

const SucessCard = ({ title, unit, value, ...props }: Props) => {
  return (
    <div className="rounded-default flex w-full justify-between py-5 px-6 outline outline-1 outline-gray-600 md:p-0 md:outline-none">
      <GaugeIndicator {...props} />
      <div className="flex flex-col items-end justify-between leading-none">
        <p className="text-sm font-semibold text-gray-300">{title}</p>
        <span className="flex items-end gap-1 text-3xl font-bold leading-none">
          <p>{value}</p>
          {unit && <span className="text-sm text-gray-400">{unit}</span>}
        </span>
      </div>
    </div>
  );
};

export default SucessCard;
