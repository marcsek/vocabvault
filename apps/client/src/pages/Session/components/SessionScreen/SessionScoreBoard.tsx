import Divider from '@ui/Divider';
import React, { Fragment, useEffect, useState } from 'react';
import { THistoryMap } from '../../hooks/useSession';

interface Props {
  history: THistoryMap;
}

const SessionScoreBoard = ({ history }: Props) => {
  const [scores, setScores] = useState<('CORRECT' | 'INCORRECT' | 'UNSET')[]>(Array(history.size).fill('UNSET'));

  useEffect(() => {
    const scoreCopy = [...scores];
    const historyValues = Array.from(history.values());

    historyValues.forEach((record, index) => {
      if (record.correctTries === 1) {
        scoreCopy[index] = 'CORRECT';
      } else if (record.tries === 1) {
        scoreCopy[index] = 'INCORRECT';
      }
    });

    setScores(scoreCopy);
  }, [history]);

  return (
    <div className="hidden max-w-full flex-col items-center gap-2 px-9 md:flex">
      <p className="text-sm font-semibold leading-none text-gray-400">SCORE</p>
      <div className="rounded-default box-border flex flex-wrap items-center justify-center gap-2 bg-gray-700 px-4 py-2">
        {scores.map((e, index) => (
          <Fragment key={index}>
            <div
              className={`h-4 w-4 rounded-full duration-200 ${
                e === 'CORRECT' ? 'bg-success-200' : e === 'INCORRECT' ? 'bg-error-200' : 'bg-gray-600'
              }`}
            />
            {index !== scores.length - 1 && <Divider className="h-0.5 w-2 rounded bg-gray-600" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SessionScoreBoard;
