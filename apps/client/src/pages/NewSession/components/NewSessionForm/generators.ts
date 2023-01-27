import { TNewSessionProps } from '../../types';

export const generateAvailableNumberOfPairs = (wordPairsCount: number) => {
  const availableNumOfWordPairs: { id: string }[] = [];
  for (let i = 5; i <= 25; i += 5) {
    if (wordPairsCount <= i) {
      availableNumOfWordPairs.push({ id: wordPairsCount.toString() });
      break;
    }
    availableNumOfWordPairs.push({ id: i.toString() });
  }
  return availableNumOfWordPairs;
};

export const generateAvailableGroupNumbers = (wordPairsCount: number, numberOfPairsInGroup: number) => {
  const availableGroupNumbers = [];

  for (let i = 0; i < wordPairsCount / numberOfPairsInGroup; i++) {
    availableGroupNumbers.push({ id: (i + 1).toString() });
  }

  return availableGroupNumbers;
};

export const generateOutput = (data: TNewSessionProps) => {
  return {
    type: data.type.id as 'Practice' | 'Test',
    documentId: data.document.id,
    groupNumber: parseInt(data.groupNumber.id),
    proofLanguage: data.allTranslationLanguages.find((e) => e.code !== data.translationLanguage.code) ?? data.translationLanguage,
    translationLanguage: data.translationLanguage,
    pairsInNumber: parseInt(data.numOfWordPairs.id),
    repetitions: parseInt(data.numOfRepetition.id),
  };
};

export type TNewSessionOutput = ReturnType<typeof generateOutput>;
