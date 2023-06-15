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
import LineChart from './LineChart';
import SubSpinners from '../../../components/Spinners/SubSpinners';
import Link from '@ui/Link';
import { BarChartIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import Button from '@ui/Button';
import { IoReload } from 'react-icons/io5';

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
const gaugesPlaceHolders = { avgTime: 134, avgAccuracy: 95 };
const lineChartPlaceholderData = [
  { value: 60, time: 'January' },
  { value: 70, time: 'February' },
  { value: 50, time: 'March' },
  { value: 80, time: 'April' },
  { value: 90, time: 'May' },
  { value: 66, time: 'June' },
  { value: 95, time: 'July' },
];

const Dashboard = () => {
  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Dashboard</h1>}>
      <ErrorBoundary FallbackComponent={DashboardErrorBoundary}>
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

  const dataExists = sessionData?.latestSession !== undefined || statsData === undefined;
  const latestSession = sessionData?.latestSession ? sessionData.latestSession : lastSessionPlaceholderData.latestSession;
  const stats = statsData ? statsData : { ...gaugesPlaceHolders, avgMovement: lineChartPlaceholderData };

  return (
    <div className="relative flex flex-col gap-6">
      {!dataExists && <NoSessionInfo />}
      <div className="flex flex-col gap-6 lg:justify-between 2xl:flex-row">
        <div className="flex flex-grow flex-col gap-6 lg:flex-row lg:justify-between">
          <div className="rounded-default span flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Words learned</h3>
            <StatGauge color="#3B82F6" inside={<p className="text-3xl font-semibold">{863}</p>} value={83} delay={0} />
          </div>
          <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Average time</h3>
            <StatGauge
              color="#E11D48"
              inside={<p className="text-3xl font-semibold">{dateRangeFormatter(new Date(stats.avgTime))}</p>}
              value={20}
              delay={0.25}
            />
          </div>
          <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold">Average accuracy</h3>
            <StatGauge
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
        <h3 className="text-xl font-semibold text-gray-50">Success rate</h3>
        <div className="h-72">
          <LineChart data={stats.avgMovement} />
        </div>
      </div>
    </div>
  );
};

const NoSessionInfo = () => {
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
  maxValue?: number;
  minValue?: number;
  delay?: number;
}

const StatGauge = ({ value, minValue = 0, maxValue = 100, inside, color, delay = 0 }: StatGaugeProps) => {
  const strokeWidth = 14;
  const size = 200;
  const center = size / 2;
  const r = center - strokeWidth;
  const c = 2 * r * Math.PI;
  const a = c * (180 / 360);
  const percentage = (value - minValue) / (maxValue - minValue);
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
          // strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(180 ${center} ${center})`}
        />
      </motion.svg>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{inside}</div>
    </div>
  );
};

export default Dashboard;

const DashboardErrorBoundary: React.FC<{ resetErrorBoundary: () => void; error: Error }> = ({ resetErrorBoundary, error }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6">
      <div className="bg-error-400/30 flex h-32 w-32 items-center justify-center rounded-full p-6">
        <ExclamationTriangleIcon className="text-error-200 h-full w-full" />
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold">We were not able to load your desboard.</h1>
          <p className="text-base font-semibold text-gray-400">
            It seems like you have ran into an error. Please retry now or come back again later.
          </p>
        </div>
        <Button onClick={resetErrorBoundary} intent="outlined" size="medium" Icon={<IoReload />}>
          Try again
        </Button>
      </div>
    </div>
  );
};
