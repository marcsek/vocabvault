import React from 'react';
import { TPostSessionStatsProps } from '../../types';
import AccuracyBar from '../AccuracyBar/AccuracyBar';
import AnswersTable from '../AnswersTable';
import SucessIndicators from '../SucessIndicators/SucessIndicators';

interface Props {
  statsData: TPostSessionStatsProps;
}

const SessionStatsDetails = ({ statsData }: Props) => {
  return (
    <div className="flex flex-col gap-9">
      <SucessIndicators
        correct={statsData.correct}
        duration={statsData.totalTime}
        incorrect={statsData.incorrect}
        maxStreak={statsData.maxStreak}
        totalTries={statsData.totalTries}
        minTries={statsData.minTries}
        type={statsData.type}
      />
      <AccuracyBar accuracy={statsData.accuracy} />
      <AnswersTable data={statsData.answers} type={statsData.type} />
    </div>
  );
};

export default SessionStatsDetails;
