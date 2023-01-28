import React, { useMemo } from 'react';
import { THistoryMap } from '../../hooks/useSession';

interface Props {
  history: THistoryMap;
  repetitions: number;
}

const SessionBar = ({ history, repetitions }: Props) => {
  const amount = useMemo(() => {
    const totalCount = history.size * repetitions;
    let succesfulCount = 0;

    history.forEach((e) => {
      succesfulCount += e.correctTries;
    });

    return (succesfulCount / totalCount) * 100;
  }, [history]);

  return (
    <div className="md:px-17 w-full px-9">
      <div className="h-4 w-full rounded-full bg-gray-700">
        <div
          className={`bg-primary-300 h-full rounded-full shadow-[0px_0px_4px_#3B82F6;] ${amount !== 0 ? 'px-2' : ''}`}
          style={{ width: `${amount}%` }}
        >
          <div className="bg-primary-200 relative top-1 box-border h-1 w-full rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SessionBar;
