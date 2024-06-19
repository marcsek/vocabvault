import { AnimatePresence, motion } from 'framer-motion';
import Divider from '@ui/Divider';
import { useResizeObserver } from 'usehooks-ts';
import { IoChevronUpOutline } from 'react-icons/io5';
import { useRef } from 'react';

interface Props {
  isUnlocked: boolean;
}

const SessionFormDivider = ({ isUnlocked }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useResizeObserver({ ref, box: "border-box" });

  return (
    <div className="relative flex flex-col items-center gap-1">
      <Divider className="w-full outline-dashed outline-1 outline-gray-500" />
      <motion.div
        animate={{ width }}
        transition={{ delay: 0.5 }}
        className="backd absolute box-border flex -translate-y-1/2 items-center gap-2 rounded-full bg-gray-700 py-1.5 text-gray-400"
      >
        <div ref={ref} className="flex items-center gap-2 px-2.5">
          <motion.div animate={{ rotate: isUnlocked ? '0deg' : '180deg', transition: { delay: 0.8, type: 'spring' } }}>
            <IoChevronUpOutline />
          </motion.div>
          <AnimatePresence mode="popLayout">
            {isUnlocked && (
              <motion.p
                layout
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex min-w-max items-center gap-1 text-sm"
              >
                Select word source first.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default SessionFormDivider;
