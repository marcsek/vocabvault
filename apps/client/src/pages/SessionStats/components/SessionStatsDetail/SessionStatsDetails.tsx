import React from 'react';
import { TPostSessionStatsProps } from '../../types';
import AccuracyBar from '../AccuracyBar/AccuracyBar';
import AnswersTable from '../AnswersTable';
import SucessIndicators from '../SucessIndicators/SucessIndicators';

interface Props {
  statsData: TPostSessionStatsProps;
}

const SessionStatsDetails = ({ statsData: { accuracy, answers, type, ...indicatorProps } }: Props) => {
  return (
    <div className="flex flex-col gap-9">
      <SucessIndicators {...{ ...indicatorProps, type }} />
      <AccuracyBar accuracy={accuracy} />
      <AnswersTable data={answers} type={type} />
    </div>
  );
};

export default SessionStatsDetails;
