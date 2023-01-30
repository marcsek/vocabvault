import CircularGauge from '@ui/CircularGauge';
import React from 'react';

interface Props {
  Icon: React.ReactNode;
  color: string;
}

const GaugeIndicator = (props: Props) => {
  return (
    <div>
      <CircularGauge color={props.color} size={73} strokeWidth={4} inside={<GaugeInside {...props} />} value={40} />
    </div>
  );
};

const GaugeInside = ({ color, Icon }: { color: string; Icon: React.ReactNode }) => {
  return <div className={`flex items-center justify-center rounded-full p-2 text-base text-gray-800 bg-[${color}]`}>{Icon}</div>;
};

export default GaugeIndicator;
