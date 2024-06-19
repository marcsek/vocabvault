import CircularGauge from '@ui/CircularGauge';
import { useEffect } from 'react';
import { useCountdown } from 'usehooks-ts';
import { motion, useAnimationControls } from 'framer-motion';
import { sleep } from '../../../../utils/helpers/sleep';

interface Props {
  show: boolean;
  onEnd: () => void;
}

const SessionCourtain = ({ show, onEnd }: Props) => {
  const backgroundAnim = useAnimationControls();
  const clockAnim = useAnimationControls();
  const titleAnim = useAnimationControls();

  const [count, { startCountdown, resetCountdown }] = useCountdown({ countStart: 30, intervalMs: 100 });

  useEffect(() => {
    if (show) {
      startAnimation();
    }
  }, [show]);

  useEffect(() => {
    if (count <= 0) {
      endAnimation();
    }
  }, [count]);

  const startAnimation = async () => {
    resetCountdown();
    backgroundAnim.start({
      backgroundColor: 'rgba(25,25,25, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      transition: { duration: 0.3 },
    });
    titleAnim.start({ scale: 1, opacity: 1, transition: { delay: 0.1, type: 'spring', duration: 0.7 } });
    startClockAnimation();
  };

  const startClockAnimation = async () => {
    await clockAnim.start({ scale: 1, opacity: 1, transition: { delay: 0.6, duration: 0.3, type: 'spring', mass: 0.8, damping: 9 } });
    startCountdown();
  };

  const endAnimation = async () => {
    await sleep(500);
    clockAnim.start({ scale: 0, opacity: 0, transition: { duration: 0.3 } });
    titleAnim.start({ scale: 0, opacity: 0, transition: { delay: 0.3 } });
    await backgroundAnim.start({
      backgroundColor: 'rgba(25,25,25, 0)',
      backdropFilter: 'blur(0px)',
      transition: { delay: 0.5 },
    });
    backgroundAnim.start({ display: 'none' });
    onEnd();
  };

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-10"
        animate={backgroundAnim}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={titleAnim}
          transition={{ delay: 0.5, type: 'spring', bounce: 20, duration: 0.5 }}
          className="flex flex-col items-center gap-2 leading-none"
        >
          <p className="text-xl font-bold">This round is over</p>
          <p className="text-base text-gray-300">Get ready for the next one</p>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={clockAnim} transition={{ type: 'spring', duration: 0.5, bounce: 10 }}>
          <CircularGauge
            value={count}
            maxValue={30}
            size={85}
            strokeWidth={5.5}
            inside={<span className="text-xl">{Math.round(count / 10)}</span>}
            color="#3B82F6"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default SessionCourtain;
