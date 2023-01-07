import { createContext, useContext, useState } from 'react';
import { TWordPair } from 'server/src/schemas/wordSource.schema';

export type TWordPairsPreview = {
  firstColumnName: string;
  secondColumnName: string;
  total: number;
  pairs: TWordPair[];
};

type TWordPairsPreviewContext = {
  wordPairsPreview: TWordPairsPreview;
  setWordPairsPreview: React.Dispatch<React.SetStateAction<TWordPairsPreview>>;
};

const initialValues = { firstColumnName: '', secondColumnName: '', total: 0, pairs: [] };

const FilePreviewContext = createContext<TWordPairsPreviewContext>({
  wordPairsPreview: initialValues,
  setWordPairsPreview: () => null,
});

export const WordPairPreviewContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wordPairsPreview, setWordPairsPreview] = useState<TWordPairsPreview>(initialValues);

  return <FilePreviewContext.Provider value={{ wordPairsPreview, setWordPairsPreview }}>{children}</FilePreviewContext.Provider>;
};

export const useWordPairPreview = () => {
  return useContext(FilePreviewContext);
};
