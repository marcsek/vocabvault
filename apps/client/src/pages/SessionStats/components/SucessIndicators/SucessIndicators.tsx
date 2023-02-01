import Divider from '@ui/Divider';
import React from 'react';
import SucessCard from './SucessCard';
import { BsCheckLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { RiTimerLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';

interface Props {
  correct: number;
  incorrect: number;
  totalTime: number;
  maxStreak: number;
  totalTries: number;
  minTries: number;
  type: 'Practice' | 'Test';
}

const calcPercentage = (e: number, p: number) => (e / p) * 100;

const SucessIndicators = ({ correct, totalTime, incorrect, maxStreak, minTries, type, totalTries }: Props) => {
  const totalTimeInMs = Math.round(totalTime / 1000);

  return (
    <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 xl:flex-row xl:bg-gray-800/50 xl:px-6 xl:py-5 xl:outline xl:backdrop-blur-md">
      <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 md:flex-row md:bg-gray-800/50 md:px-6 md:py-5 md:outline md:backdrop-blur-md xl:w-full xl:bg-none xl:p-0 xl:outline-none">
        <SucessCard
          Icon={<BsCheckLg />}
          color="#36B37E"
          title="Correct"
          value={correct.toString()}
          percentage={calcPercentage(correct, totalTries)}
        />
        <Divider className="hidden w-0 outline-dashed outline-1 outline-gray-500 md:block" />
        <SucessCard
          Icon={<ImCross />}
          color="#EF4444"
          title="Incorrect"
          value={incorrect.toString()}
          percentage={calcPercentage(incorrect, totalTries)}
        />
      </div>
      <Divider className=" hidden w-0 outline-dashed outline-1 outline-gray-500 xl:block" />
      <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 md:flex-row md:bg-gray-800/50 md:px-6 md:py-5 md:outline md:backdrop-blur-md xl:w-full xl:bg-none xl:p-0 xl:outline-none">
        <SucessCard
          Icon={<RiTimerLine />}
          color="#FFAB00"
          title="Total time"
          value={totalTimeInMs.toString()}
          unit="sec"
          percentage={100 - calcPercentage(totalTimeInMs, 90)}
        />
        <Divider className="hidden w-0 outline-dashed outline-1 outline-gray-500 md:block" />
        <SucessCard
          Icon={<AiFillStar />}
          color="#3B82F6"
          title={type === 'Test' ? 'Max streak' : 'Min. tries'}
          value={(type === 'Test' ? maxStreak : minTries).toString()}
          percentage={100 - calcPercentage(minTries, 8)}
        />
      </div>
    </div>
  );
};

export default SucessIndicators;
