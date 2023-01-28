import { useState } from 'react';

interface Props {
  wordPairs: { value: string; proof: string }[];
  handleCorrect: () => void;
  handleIncorrect: (value: string) => void;
  handleEnd: () => void;
  handleRoundEnd: () => void;
  repetitions: number;
}

type THistoryMap = Map<string, { tries: number; correctTries: number }>;

const useSession = ({ wordPairs, handleCorrect, handleIncorrect, handleEnd, repetitions, handleRoundEnd }: Props) => {
  const [currentWord, setCurrentWord] = useState(0);
  const [availableWords, setAvailableWord] = useState(wordPairs);
  const [history, setHistory] = useState<THistoryMap>(new Map(wordPairs.map((e) => [e.value, { tries: 0, correctTries: 0 }])));
  const [currentRound, setCurrentRound] = useState(1);

  const currentWordValue = availableWords[currentWord];
  const historyCopy = new Map(history);

  const handleWordSubmit = (value: string) => {
    handleAnswerCorrectness(historyCopy, value);
    setHistory(new Map(historyCopy));
  };

  const removeFinishedWords = (map: THistoryMap) => {
    const toRemove = availableWords.map((e) => {
      const obj = map.get(e.value);
      if (obj && obj.correctTries >= repetitions) return e.value;
    });
    setAvailableWord((prev) => prev.filter((e) => !toRemove.includes(e.value)));
  };

  const handleAnswerCorrectness = (map: THistoryMap, value: string) => {
    const currentWordObj = structuredClone(map.get(currentWordValue.value));

    if (!currentWordObj) return;

    const answerIsCorrect = currentWordValue.proof === value;

    if (answerIsCorrect) {
      map.set(currentWordValue.value, {
        correctTries: currentWordObj.correctTries + 1,
        tries: currentWordObj.tries + 1,
      });
      return handleCorrect();
    }
    map.set(currentWordValue.value, { ...currentWordObj, tries: currentWordObj.tries + 1 });
    handleIncorrect(currentWordValue.proof);
  };

  const incrementPage = () => {
    const wordIsLast = currentWord >= availableWords.length - 1;

    if (wordIsLast) {
      return handleLastWord(historyCopy);
    }
    setCurrentWord((prev) => prev + 1);
  };

  const handleLastWord = (map: THistoryMap) => {
    const someAreUnfinished = [...map.values()].some((e) => e.correctTries < repetitions);

    if (!someAreUnfinished) return handleEnd();

    removeFinishedWords(map);
    setCurrentRound((prev) => prev + 1);
    setCurrentWord(0);
    handleRoundEnd();
  };

  return { handleWordSubmit, currentRound, incrementPage, currentWord: currentWordValue.value, history };
};

export default useSession;
