import React from 'react';
import AccuracyBar from '../AccuracyBar/AccuracyBar';
import SucessIndicators from '../SucessIndicators/SucessIndicators';

const SessionStatsDetails = () => {
  return (
    <div className="flex flex-col gap-9">
      <SucessIndicators />
      <AccuracyBar />
    </div>
  );
};

export default SessionStatsDetails;
