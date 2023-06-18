import TitleLayout from '@ui/TitleLayout/TitleLayout';
import React, { Suspense } from 'react';
import SourceHeading, { SourceHeadingProps } from '../../WordSources/Components/SourceCard/SourceHeading.component';
import { useGetLastSession, useGetUserStats } from '../../../queries/session';
import Divider from '@ui/Divider';
import { RiHistoryLine } from 'react-icons/ri';
import { FiType } from 'react-icons/fi';
import { AiOutlinePercentage } from 'react-icons/ai';
import { dateRangeFormatter, dateSinceFormatter } from '../../../utils/dateSinceFormatter';
import { motion } from 'framer-motion';
import { BarChart, MatrixChart, RadarChart } from './Charts';
import SubSpinners from '../../../components/Spinners/SubSpinners';
import Link from '@ui/Link';
import { BarChartIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import DefaultErrorBoundary from '../../../components/ErrorBoundary/DefaultErrorBoundary';
import { useUser } from '../../../providers/UserContext.provider';

const simulateMatrixData = () => {
  const end = new Date(new Date().setUTCHours(0, 0, 0, 0));
  const startDate = new Date(new Date().setDate(end.getDate() - 182));
  const res: { [k: string]: number } = {};
  for (let i = 0; i < 182; i++) {
    res[new Date(startDate.setDate(startDate.getDate() + 1)).toDateString()] =
      Math.floor(Math.random() * 3) === 1 ? Math.floor(Math.random() * 15) : 0;
  }
  return res;
};

const lastSessionPlaceholderData: ReturnType<typeof useGetLastSession>['data'] = {
  latestSession: {
    creator: { id: '', name: 'Niekto', profileImage: '' },
    endedAt: new Date().toISOString(),
    firstLanguage: { code: 'sk', languageName: 'SVK' },
    name: 'Nieco pekne',
    secondLanguage: { code: 'cz', languageName: 'CZR' },
    type: 'PRACTICE',
    accuracy: 90,
  },
};
const gaugesPlaceHolders = { avgTime: 134, avgAccuracy: 95, totalSessions: 143 };
const lineChartPlaceholderData = [
  { time: '1/Mar', value: 2 },
  { time: '2/Mar', value: 2 },
  { time: '3/Mar', value: 1 },
  { time: '4/Mar', value: 0 },
  { time: '5/Mar', value: 3 },
  { time: '2/Apr', value: 2 },
  { time: '3/Apr', value: 0 },
  { time: '4/Apr', value: 1 },
  { time: '5/Apr', value: 0 },
  { time: '2/May', value: 1 },
  { time: '3/May', value: 0 },
  { time: '4/May', value: 0 },
  { time: '5/May', value: 0 },
  { time: '2/Jun', value: 3 },
  { time: '3/Jun', value: 2 },
  { time: '4/Jun', value: 1 },
];
const radarChartPlaceholder = { wordSources: ['Basics', 'Rimavská sobota', 'School - Vocab'], values: [10, 18, 23] };

const Dashboard = () => {
  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Dashboard</h1>}>
      <ErrorBoundary FallbackComponent={DefaultErrorBoundary}>
        <Suspense fallback={<SubSpinners />}>
          <Statistics />
        </Suspense>
      </ErrorBoundary>
    </TitleLayout>
  );
};

const Statistics = () => {
  const { data: sessionData } = useGetLastSession();
  const { data: statsData } = useGetUserStats();
  const user = useUser();

  const dataExists = sessionData?.latestSession !== undefined || statsData === undefined;
  const latestSession = sessionData?.latestSession ? sessionData.latestSession : lastSessionPlaceholderData.latestSession;
  const stats: typeof statsData =
    //test account id
    statsData && dataExists && user?.id !== '28e8e18a-3ff0-41e8-b682-f562445efef7'
      ? statsData
      : {
          ...gaugesPlaceHolders,
          actWeekGroup: lineChartPlaceholderData,
          actDay: simulateMatrixData(),
          actWordSource: radarChartPlaceholder,
        };

  return (
    <div className="relative flex flex-col gap-6">
      {!dataExists && <NoDashboardDataInfo />}
      <div className="flex flex-col gap-6 lg:justify-between 2xl:flex-row">
        <div className="flex flex-grow flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="rounded-default span flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Total sessions</h3>
            <StatsHalfGauge color="#3B82F6" inside={<p className="text-3xl font-semibold">{stats.totalSessions}</p>} value={83} delay={0} />
          </div>
          <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Average time</h3>
            <StatsHalfGauge
              color="#E11D48"
              inside={
                <p className="text-3xl font-semibold">
                  {dateRangeFormatter(new Date(stats.avgTime)).split(' ')[0]}
                  <span className="ml-2 text-2xl text-gray-400">{dateRangeFormatter(new Date(stats.avgTime)).split(' ')[1]}</span>
                </p>
              }
              value={20}
              delay={0.25}
            />
          </div>
          <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Average accuracy</h3>
            <StatsHalfGauge
              color="#9E8CFC"
              inside={<p className="text-3xl font-semibold">{stats.avgAccuracy}%</p>}
              value={stats.avgAccuracy}
              delay={0.5}
            />
          </div>
        </div>
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
      </div>
      <div className="rounded-default flex flex-col gap-4 p-6 ring-1 ring-gray-600">
        <h3 className="text-xl font-semibold text-gray-50">Recent activity</h3>
        <div className="h-52 md:h-72">
          {stats.actWeekGroup.length !== 0 ? <BarChart data={stats.actWeekGroup} /> : <p>Could not load data</p>}
        </div>
      </div>
      <div className="flex max-w-full flex-col gap-6 xl:flex-row">
        <div className="rounded-default flex w-full basis-2/3 flex-col gap-4 p-6 ring-1 ring-gray-600">
          <h3 className="text-xl font-semibold text-gray-50">Activity matrix</h3>
          <div className="flex h-72 w-full flex-grow flex-row-reverse overflow-y-auto xl:block">
            <div className="h-full w-full min-w-[765px]">
              {stats.actWeekGroup.length !== 0 ? <MatrixChart data={stats.actDay} /> : <p>Could not load data</p>}
            </div>
          </div>
        </div>
        <div className="rounded-default flex w-full basis-1/3 flex-col gap-4 p-6 ring-1 ring-gray-600">
          <h3 className="text-xl font-semibold text-gray-50">Wordsource spread</h3>
          <div className="flex h-72 max-w-full items-center justify-center">
            {stats.actWordSource.wordSources.length > 2 ? (
              <RadarChart data={stats.actWordSource} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1">
                <ExclamationTriangleIcon className="text-warning-200 h-6 w-6" />
                <h3 className="text-gray-100">Not enough word sources</h3>
                <p className="text-center text-sm text-gray-400">You need at least 3 word sources to show useful information.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NoDashboardDataInfo = () => {
  return (
    <div className="absolute -inset-8 z-10 flex flex-col items-center justify-start gap-2 bg-gray-800/50 px-10 pt-24 backdrop-blur-lg lg:justify-center lg:pt-0">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, transition: { type: 'spring' } }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <BarChartIcon className="h-8 w-8" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.7 } }}
        exit={{ opacity: 0 }}
        className="text-gray-200"
      >
        No data to show
      </motion.p>
      <motion.div
        className="inline items-end gap-1 text-center text-sm leading-none text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.9, duration: 0.7 } }}
        exit={{ opacity: 0 }}
      >
        <p className="inline">You first need to complete a</p>
        <Link className="!text-primary-200 mx-1 !inline !p-0 !leading-none hover:underline" to="/new-session">
          session
        </Link>
        <p className="inline">in order for your data to show.</p>
      </motion.div>
    </div>
  );
};

interface LastSessionContProps {
  heading: SourceHeadingProps;
  percentage: number;
  type: string;
  endedAt: string;
}
const LastSessionCont = ({ heading, percentage, type, endedAt }: LastSessionContProps) => {
  const formattedDate = dateSinceFormatter(new Date(endedAt));

  return (
    <div className="rounded-default flex w-full min-w-max flex-col items-center gap-6 border border-gray-600 p-6 sm:gap-4 2xl:w-fit 2xl:items-start">
      <h3 className="text-xl font-semibold text-gray-50">Last session</h3>
      <div className="flex flex-col items-center gap-8 sm:flex-row">
        <SourceHeading {...heading}></SourceHeading>
        <Divider className="w-full rounded-full outline-dashed outline-1 outline-gray-600 sm:h-full sm:w-0" />
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

interface StatGaugeProps {
  value: number;
  inside: React.ReactNode;
  color: string;
  delay?: number;
}

const StatsHalfGauge = ({ value, inside, color, delay = 0 }: StatGaugeProps) => {
  const strokeWidth = 14;
  const size = 200;
  const center = size / 2;
  const r = center - strokeWidth;
  const c = 2 * r * Math.PI;
  const a = c * (180 / 360);
  const percentage = value / 100;
  const offset = c - percentage * a;

  return (
    <div className="relative w-fit">
      <motion.svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" strokeWidth={strokeWidth}>
        <circle
          role="presentation"
          cx={center}
          cy={center}
          r={r}
          stroke="#404040"
          strokeDasharray={`${a} ${c}`}
          strokeLinecap="round"
          transform={`rotate(180 ${center} ${center})`}
        />
        <motion.circle
          initial={{ strokeDashoffset: 530 }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', delay: delay, mass: 0.7 }}
          role="presentation"
          cx={center}
          cy={center}
          r={r}
          stroke={color}
          strokeDasharray={c}
          strokeLinecap="round"
          transform={`rotate(180 ${center} ${center})`}
        />
      </motion.svg>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{inside}</div>
    </div>
  );
};

export default Dashboard;
