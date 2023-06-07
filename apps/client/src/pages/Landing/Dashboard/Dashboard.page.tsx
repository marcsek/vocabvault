import TitleLayout from '@ui/TitleLayout/TitleLayout';
import React from 'react';
import SourceHeading, { SourceHeadingProps } from '../../WordSources/Components/SourceCard/SourceHeading.component';
import { useGetLatestWordSource } from '../../../queries/wordSource';
import Divider from '@ui/Divider';
import { RiHistoryLine } from 'react-icons/ri';
import { FiType } from 'react-icons/fi';
import { AiOutlinePercentage } from 'react-icons/ai';
import { dateSinceFormatter } from '../../../utils/dateSinceFormatter';
import { motion } from 'framer-motion';
import LineChart from './LineChart';
import SubSpinners from '../../../components/Spinners/SubSpinners';

const Dashboard = () => {
  const { data, isLoading } = useGetLatestWordSource();

  const latestSession = data?.latestSession;

  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Dashboard</h1>}>
      {!isLoading ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:justify-between 2xl:flex-row">
            <div className="flex flex-grow flex-col gap-6 lg:flex-row lg:justify-between">
              <div className="rounded-default span flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
                <h3 className="text-xl font-semibold">Words learned</h3>
                <CircularGauge color="#3B82F6" inside={<p className="text-3xl font-semibold">834</p>} value={83} delay={0} />
              </div>
              <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
                <h3 className="text-xl font-semibold">Average time</h3>
                <CircularGauge color="#E11D48" inside={<p className="text-3xl font-semibold">1.2 min</p>} value={20} delay={0.25} />
              </div>
              <div className="rounded-default flex max-h-56 w-full flex-col items-center gap-5 p-6 ring-1 ring-gray-600">
                <h3 className="text-xl font-semibold">Average accuracy</h3>
                <CircularGauge color="#9E8CFC" inside={<p className="text-3xl font-semibold">95%</p>} value={95} delay={0.5} />
              </div>
            </div>
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
          </div>
          <div className="rounded-default flex flex-col gap-4 p-6 ring-1 ring-gray-600">
            <h3 className="text-xl font-semibold text-gray-50">Success rate</h3>
            <div className="h-72">
              <LineChart />
            </div>
          </div>
        </div>
      ) : (
        <SubSpinners />
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

interface Props {
  value: number;
  inside: React.ReactNode;
  color: string;
  strokeWidth?: number;
  size?: number;
  maxValue?: number;
  minValue?: number;
  delay?: number;
  duration?: number;
}

const CircularGauge = ({
  value,
  minValue = 0,
  maxValue = 100,
  inside,
  color,
  strokeWidth = 14,
  size = 200,
  delay = 0,
  duration,
}: Props) => {
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
          transition={{ type: 'spring', delay: delay, duration, mass: 0.7 }}
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
      <div className="absolute top-1/2 left-1/2 z-30 -translate-y-1/2 -translate-x-1/2">{inside}</div>
    </div>
  );
};

export default Dashboard;
