import { CircleBackslashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  wordPairCount?: number;
  firstLanguageName?: string;
  secondLanguageName?: string;
}

const WordSourceDetailBox = ({ firstLanguageName, secondLanguageName, wordPairCount }: Props) => {
  return (
    <div className="rounded-default flex w-full flex-wrap justify-between bg-gray-800 px-6 py-3 outline outline-1 outline-gray-500">
      {!wordPairCount ? (
        <div className="items flex flex-1 items-center justify-center gap-2 text-gray-400">
          <CircleBackslashIcon className="h-4 w-4" strokeWidth={3} />
          <p>No source is selected.</p>
        </div>
      ) : (
        <>
          <div className="flex gap-1">
            <span className="text-gray-400">Word pairs count:</span>
            <p className="truncate">{wordPairCount}</p>
          </div>
          <div className="flex gap-1">
            <span className="text-gray-400">First language:</span>
            <p className="max-w-[5rem] truncate">{firstLanguageName}</p>
          </div>
          <div className="flex gap-1">
            <span className="text-gray-400">Second language:</span>
            <p className="max-w-[5rem] truncate">{secondLanguageName}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default WordSourceDetailBox;
