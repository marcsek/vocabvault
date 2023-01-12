import React from 'react';
import { useGetAvailableWordSources } from '../../../../queries/wordSource';
import SourceCard from './SourceCard.component';

const SourceBoard = () => {
  const sources = useGetAvailableWordSources();

  return (
    <div className="flex gap-8">
      {sources.data?.map((e) => (
        <SourceCard cardData={{ ...e, createdAt: new Date(e.createdAt) }} />
      ))}
    </div>
  );
};

export default SourceBoard;
