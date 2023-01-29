import { TNewSessionProps } from '../../types';

export const generateAvailableNumberOfPairs = (wordPairsCount: number) => {
  const availableNumOfWordPairs: { id: number }[] = [];
  for (let i = 5; i <= 25; i += 5) {
    if (wordPairsCount <= i) {
      availableNumOfWordPairs.push({ id: wordPairsCount });
      break;
    }
    availableNumOfWordPairs.push({ id: i });
  }
  return availableNumOfWordPairs;
};

export const generateAvailableGroupNumbers = (wordPairsCount: number, numberOfPairsInGroup: number) => {
  const availableGroupNumbers = [];

  for (let i = 0; i < wordPairsCount / numberOfPairsInGroup; i++) {
    availableGroupNumbers.push({ id: i + 1 });
  }

  return availableGroupNumbers;
};

export const generateOutput = (data: TNewSessionProps) => {
  let repetitions = data.numOfRepetition.id;
  const proofLanguage = data.allTranslationLanguages.find((e) => e.code !== data.translationLanguage.code) ?? data.translationLanguage;

  if (data.type.id === 'Test') {
    repetitions = 1;
  }

  return {
    type: data.type.id as 'Practice' | 'Test',
    documentId: data.document.id,
    groupNumber: data.groupNumber.id,
    proofLanguage,
    translationLanguage: data.translationLanguage,
    pairsInNumber: data.numOfWordPairs.id,
    repetitions,
  };
};

export type TNewSessionOutput = ReturnType<typeof generateOutput>;
