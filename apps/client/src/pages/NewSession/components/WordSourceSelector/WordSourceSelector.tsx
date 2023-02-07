import ListBox from '@ui/ListBox';
import React from 'react';
import WordSourceDetailBox from './WordSourceDetailBox';

type TWordSourceDetailItem = { id: string; name: string };

interface Props {
  items: TWordSourceDetailItem[];
  value: TWordSourceDetailItem;
  onChange: (e: TWordSourceDetailItem) => void;
  firstLanguageName?: string;
  secondLanguageName?: string;
  wordPairCount?: number;
}

const WordSourceSelector = ({ firstLanguageName, secondLanguageName, wordPairCount, ...props }: Props) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <ListBox fieldKey="id" disabled={props.items.length === 0} fieldValue="name" label="Select wordsource" {...props} />
      <WordSourceDetailBox firstLanguageName={firstLanguageName} secondLanguageName={secondLanguageName} wordPairCount={wordPairCount} />
    </div>
  );
};

export default WordSourceSelector;
