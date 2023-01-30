import Divider from '@ui/Divider';
import React from 'react';
import SucessCard from './SucessCard';
import { BsCheckLg } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import { RiTimerLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';

const SucessIndicators = () => {
  return (
    <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 xl:flex-row xl:px-6 xl:py-5 xl:outline">
      <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 md:flex-row md:px-6 md:py-5 md:outline xl:w-full xl:p-0 xl:outline-none">
        <SucessCard Icon={<BsCheckLg />} color="#36B37E" title="Correct" value="7" />
        <Divider className="hidden w-0 outline-dashed outline-1 outline-gray-500 md:block" />
        <SucessCard Icon={<ImCross />} color="#EF4444" title="Incorrect" value="3" />
      </div>
      <Divider className=" hidden w-0 outline-dashed outline-1 outline-gray-500 xl:block" />
      <div className="rounded-default flex flex-col gap-9 outline-1 outline-gray-600 md:flex-row md:px-6 md:py-5 md:outline xl:w-full xl:p-0 xl:outline-none">
        <SucessCard Icon={<RiTimerLine />} color="#FFAB00" title="Total time" value="90" unit="sec" />
        <Divider className="hidden w-0 outline-dashed outline-1 outline-gray-500 md:block" />
        <SucessCard Icon={<AiFillStar />} color="#3B82F6" title="Max streak" value="7" />
      </div>
    </div>
  );
};

export default SucessIndicators;
