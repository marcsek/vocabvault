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
