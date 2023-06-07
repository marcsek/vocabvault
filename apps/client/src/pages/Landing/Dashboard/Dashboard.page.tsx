import TitleLayout from '@ui/TitleLayout/TitleLayout';
import React from 'react';
import SourceHeading, { SourceHeadingProps } from '../../WordSources/Components/SourceCard/SourceHeading.component';
import { useGetLatestWordSource } from '../../../queries/wordSource';
import Divider from '@ui/Divider';
import { RiHistoryLine } from 'react-icons/ri';
import { FiType } from 'react-icons/fi';
import { AiOutlinePercentage } from 'react-icons/ai';
import { dateSinceFormatter } from '../../../utils/dateSinceFormatter';

const Dashboard = () => {
  const result = useGetLatestWordSource();

  const latestSession = result?.latestSession;

  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Dashboard</h1>}>
      {latestSession && (
        <LastSessionCont
          heading={{
            creator: latestSession.creator,
            firstLanguage: latestSession.firstLanguage,
            name: latestSession.name,
            secondLanguage: latestSession.secondLanguage,
          }}
          percentage={latestSession.accuracy ?? 0}
          type={latestSession.type}
          endedAt={latestSession.endedAt}
        />
      )}
    </TitleLayout>
  );
};

interface TLastSessionContProps {
  heading: SourceHeadingProps;
  percentage: number;
  type: string;
  endedAt: string;
}
const LastSessionCont = ({ heading, percentage, type, endedAt }: TLastSessionContProps) => {
  const formattedDate = dateSinceFormatter(new Date(endedAt));

  return (
    <div className="rounded-default flex w-fit flex-col gap-4 border border-gray-500 p-6">
      <h3 className="text-xl font-bold text-gray-50">Last session</h3>
      <div className="flex items-center gap-8">
        <SourceHeading {...heading}></SourceHeading>
        <Divider className="h-full rounded-full outline-dashed outline-1 outline-gray-600" />
        <div className="flex flex-col gap-3.5">
          <span className="text-ca flex items-center gap-2">
            <div className="bg-success-400 rounded-default w-fit p-1">
              <RiHistoryLine className="text-success-100" size={20} />
            </div>
            {percentage}% <span className="text-gray-400">accuracy</span>
          </span>
          <span className="flex items-center gap-2 capitalize">
            <div className="bg-success-400 rounded-default w-fit p-1">
              <AiOutlinePercentage className="text-success-100" size={20} />
            </div>
            {type.toLowerCase()} <span className="lowercase text-gray-400">type</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="bg-success-400 rounded-default w-fit p-1">
              <FiType className="text-success-100" size={20} />
            </div>
            {formattedDate} ago <span className="text-gray-400">taken</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
