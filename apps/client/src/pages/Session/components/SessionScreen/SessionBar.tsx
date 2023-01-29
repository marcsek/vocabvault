import React, { useMemo } from 'react';
import { THistoryMap } from '../../hooks/useSession';
import SessionCancel from './SessionCancel';

interface Props {
  history: THistoryMap;
  repetitions: number;
  type: 'Practice' | 'Test';
}

const SessionBar = ({ history, repetitions, type }: Props) => {
  const amount = useMemo(() => {
    const multiplier = type === 'Test' ? 1 : repetitions;
    const totalCount = history.size * multiplier;
    let succesfulCount = 0;

    for (const record of history.values()) {
      const accumulator = type === 'Test' ? record.tries : record.correctTries;

      succesfulCount += accumulator;
    }
    return (succesfulCount / totalCount) * 100;
  }, [history]);

  return (
    <div className="md:px-17 al flex w-full items-center justify-center gap-2 px-9">
      <div className="h-4 w-full rounded-full bg-gray-700">
        <div
          className={`bg-primary-300 h-full rounded-full shadow-[0px_0px_4px_#3B82F6;] ${amount !== 0 ? 'px-2' : ''}`}
          style={{ width: `${amount}%` }}
        >
          <div className="bg-primary-200 relative top-1 box-border h-1 w-full rounded-full"></div>
        </div>
      </div>
      <div className="block h-5 w-6 md:hidden">
        <SessionCancel />
      </div>
    </div>
  );
};

export default SessionBar;
