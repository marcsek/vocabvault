import ProgressBar from '@ui/ProgressBar';
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
      <ProgressBar width={amount} />
      <div className="block h-5 w-6 md:hidden">
        <SessionCancel />
      </div>
    </div>
  );
};

export default SessionBar;
