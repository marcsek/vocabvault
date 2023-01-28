import CircularGauge from '@ui/CircularGauge';
import { useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';

const SessionCourtain = () => {
  const [count, { startCountdown }] = useCountdown({ countStart: 60, intervalMs: 50 });

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-10 bg-gray-800/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 leading-none">
        <p className="text-xl font-bold ">This round is over</p>
        <p className="text-base text-gray-300">Get ready for the next one</p>
      </div>
      <CircularGauge
        value={count}
        maxValue={60}
        size={85}
        strokeWidth={5.5}
        inside={<span className="text-xl">{Math.floor(count / 20)}</span>}
        color="#3B82F6"
      />
    </div>
  );
};

export default SessionCourtain;
