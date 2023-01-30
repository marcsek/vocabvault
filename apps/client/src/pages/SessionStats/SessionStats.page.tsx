import React from 'react';
import SessionStatsDetails from './components/SessionStatsDetail/SessionStatsDetails';

const SessionStats = () => {
  return (
    <section className="flex flex-col gap-9">
      <p className="text-2xl font-bold leading-none text-gray-50">Post session statistics</p>
      <SessionStatsDetails />
    </section>
  );
};

export default SessionStats;
