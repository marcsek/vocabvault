import { TAnswerType, TPostSessionStatsProps } from '../SessionStats/types';
import { THistoryMap } from './hooks/useSession';

interface Input {
  history: THistoryMap;
  startEndTime: readonly [Date, Date];
  wordPairs: { value: string; proof: string }[];
  type: 'Practice' | 'Test';
}

const presentSessionStatistics = ({ history, startEndTime, wordPairs, type }: Input): TPostSessionStatsProps => {
  let correct = 0;
  let incorrect = 0;
  let totalTries = 0;
  let minTries = 100;
  let accuracy = 0;
  let maxStreak = 0;
  const answers: TAnswerType[] = [];
  console.log(history);

  [...history.values()].forEach((answer, index) => {
    const corespondingWordPair = wordPairs[index];
    let correctness: 'CORRECT' | 'INCORRECT' | 'SEMICORRECT' = 'INCORRECT';

    correct += answer.correctTries;
    totalTries += answer.tries;
    incorrect += answer.tries - answer.correctTries;

    if (answer.correctTries > 0) {
      maxStreak++;
    } else {
      maxStreak = 0;
    }

    if (answer.tries < minTries) {
      minTries = answer.tries;
    }
    const correctPercentage = (answer.correctTries / answer.tries) * 100;

    if (correctPercentage > 80 || (type === 'Test' && correctPercentage > 0)) {
      correctness = 'CORRECT';
    } else if (correctPercentage >= 50 && type !== 'Test') {
      correctness = 'SEMICORRECT';
    }

    answers.push({
      word: corespondingWordPair.value,
      answer: corespondingWordPair.proof,
      solution: answer.lastAnswer,
      tries: answer.tries,
      correct: correctness,
    });
  });

  accuracy = (correct / totalTries) * 100;
  const totalTime = startEndTime[1].getTime() - startEndTime[0].getTime();

  return {
    accuracy,
    correct,
    incorrect,
    minTries,
    totalTime,
    answers,
    totalTries,
    type,
    maxStreak,
    endTime: startEndTime[1],
    startTime: startEndTime[0],
  };
};

export default presentSessionStatistics;
