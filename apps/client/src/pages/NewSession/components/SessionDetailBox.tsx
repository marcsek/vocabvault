import React from 'react';

interface Props {
  wordPairCount?: number;
  firstLanguageName?: string;
  secondLanguageName?: string;
}

const SessionDetailBox = ({ firstLanguageName, secondLanguageName, wordPairCount }: Props) => {
  return (
    <div className="rounded-default flex min-w-max flex-wrap justify-between bg-gray-800 px-6 py-3 outline outline-1 outline-gray-500">
      <p className="flex gap-1">
        <span className="text-gray-400">Word pairs count:</span>
        {wordPairCount}
      </p>
      <p className="flex gap-1">
        <span className="text-gray-400">First language:</span>
        {firstLanguageName}
      </p>
      <p className="flex gap-1">
        <span className="text-gray-400">Second language:</span>
        {secondLanguageName}
      </p>
    </div>
  );
};

export default SessionDetailBox;
