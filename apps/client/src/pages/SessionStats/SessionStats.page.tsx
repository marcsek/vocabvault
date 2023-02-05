import Button from '@ui/Button';
import { useLocation } from 'react-router-dom';
import SessionStatsDetails from './components/SessionStatsDetail/SessionStatsDetails';
import { TPostSessionStatsProps } from './types';
import { MdExitToApp } from 'react-icons/md';
import useEndSession from './hooks/useEndSession';
import Confetti from './components/Confetti';
import { motion } from 'framer-motion';

const SessionStats = () => {
  const location = useLocation();
  const statsData = location.state as TPostSessionStatsProps;
  const { handleButtonClick, loading } = useEndSession(statsData);

  return (
    <section className="!pt-12">
      <motion.div
        initial={{ backgroundColor: 'rgb(25,25,25)' }}
        animate={{ backgroundColor: 'rgb(25,25,25,0)' }}
        transition={{ delay: 0.5 }}
        className="pointer-events-none fixed inset-0 z-50"
      />
      <div className="relative z-10 flex flex-col gap-9">
        <p className="text-2xl font-bold leading-none text-gray-50">Post session statistics</p>
        <SessionStatsDetails statsData={statsData} />
        <div className="md:box fixed left-0 bottom-0 z-20 flex w-full items-center justify-center self-end bg-gray-800/70 py-4 px-9 shadow-[0px_-2px_6px_1px_#00000033] backdrop-blur-sm md:relative md:w-fit md:p-0 md:shadow-none [&>*]:w-full">
          <Button loading={loading} Icon={<MdExitToApp size={20} />} onClick={() => handleButtonClick()} size="medium">
            End session
          </Button>
        </div>
      </div>
      <Confetti />
    </section>
  );
};

export default SessionStats;
