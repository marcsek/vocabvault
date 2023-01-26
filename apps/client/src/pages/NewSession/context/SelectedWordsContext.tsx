import { createContext, useContext, useState } from 'react';

export type TSelectedWords = { id: string; pairsInGroup: number; selectedGroup: number; languageCode: string } | null;

type TWordPairsPreviewContext = {
  selectedWords: TSelectedWords;
  setSelectedWords: React.Dispatch<React.SetStateAction<TSelectedWords>>;
};

const SelectedWordsContext = createContext<TWordPairsPreviewContext>({
  selectedWords: null,
  setSelectedWords: () => null,
});

export const SelectedWordsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedWords, setSelectedWords] = useState<TSelectedWords>(null);

  return <SelectedWordsContext.Provider value={{ selectedWords, setSelectedWords }}>{children}</SelectedWordsContext.Provider>;
};

export const useSelectedWords = () => {
  return useContext(SelectedWordsContext);
};
