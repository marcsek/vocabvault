import { useState } from 'react';

interface Props {
  wordPairs: { value: string; proof: string }[];
  handleCorrect: () => void;
  handleIncorrect: (value: string) => void;
  handleEnd: () => void;
  repetitions: number;
}

type THistoryMap = Map<string, { tries: number; correctTries: number }>;

const useSession = ({ wordPairs, handleCorrect, handleIncorrect, handleEnd, repetitions }: Props) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [availableWords, setAvailableWord] = useState(wordPairs);
  const [history, setHistory] = useState<THistoryMap>(new Map(wordPairs.map((e) => [e.value, { tries: 0, correctTries: 0 }])));
  const [currentRound, setCurrentRound] = useState(1);

  const wordIsLast = currentWord >= availableWords.length - 1;
  const currentWordValue = availableWords[currentWord];
  const currentWordPair = wordPairs.find((e) => e.value === availableWords[currentWord].value);

  const handleWordSubmit = (value: string) => {
    const historyMap = new Map(history);
    handleAnswerCorrectness(historyMap, value);
    setHistory(new Map(historyMap));

    if (wordIsLast) {
      const someAreUnfinished = [...historyMap.values()].some((e) => e.correctTries < repetitions);

      if (!someAreUnfinished) return handleEnd();

      removeFinishedWords(historyMap);
      setCurrentRound((prev) => prev + 1);
    }
  };

  const removeFinishedWords = (map: THistoryMap) => {
    console.log(map);
    const toRemove = availableWords.map((e) => {
      const obj = map.get(e.value);
      console.log(obj?.correctTries);
      if (obj && obj.correctTries >= repetitions) return e.value;
    });
    console.log(availableWords);
    console.log(toRemove);
    setAvailableWord((prev) => prev.filter((e) => !toRemove.includes(e.value)));
  };

  const handleAnswerCorrectness = (map: THistoryMap, value: string) => {
    const currentWordObj = structuredClone(map.get(currentWordValue.value));

    if (!currentWordObj) return;

    const answerIsCorrect = currentWordValue.proof === value;
    currentWordObj.tries++;

    if (answerIsCorrect) {
      currentWordObj.correctTries++;
      handleCorrect();
    } else {
      handleIncorrect(currentWordValue.proof);
    }

    map.set(currentWordValue.value, currentWordObj);
  };

  const incrementPage = () => {
    if (wordIsLast) {
      setCurrentWord(0);
      return;
    }
    setCurrentWord((prev) => prev + 1);
  };

  return { handleWordSubmit, currentRound, incrementPage, currentWord: currentWordPair?.value, history };
};

export default useSession;
