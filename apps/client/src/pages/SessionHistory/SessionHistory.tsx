import TitleLayout from '@ui/TitleLayout/TitleLayout';
import React from 'react';
import HistoryList from './HistoryList/HistoryList';
import SessionFilters from './SessionFilters/SessionFilters';

const SessionHistory = () => {
  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">New session</h1>}>
      <SessionFilters />
      <HistoryList />
    </TitleLayout>
  );
};

export default SessionHistory;
