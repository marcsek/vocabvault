import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateSession } from '../../../queries/session';
import { TPostSessionStatsProps } from '../types';

const useEndSession = (statsData: TPostSessionStatsProps) => {
  const navigate = useNavigate();

  const session = useCreateSession(() => {
    navigate('/word-sources', { replace: true });
    buttonClicked.current = true;
  });

  const buttonClicked = useRef(false);

  const handleButtonClick = () => {
    if (buttonClicked.current) return;

    const { accuracy, correct, endTime, startTime, incorrect, maxStreak, minTries, totalTries, type, wordSourceId } = statsData;
    session.mutate({
      wordSourceId,
      accuracy: Math.floor(accuracy),
      correct,
      endedAt: endTime.toString(),
      incorrect,
      maxStreak,
      minTries,
      startedAt: startTime.toString(),
      totalTries,
      type: type.toUpperCase() as 'TEST' | 'PRACTICE',
    });
  };

  return { handleButtonClick, loading: session.isPending };
};

export default useEndSession;
