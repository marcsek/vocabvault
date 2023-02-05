import React from 'react';
import { motion } from 'framer-motion';

const icon = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 0.33,
  },
};

const TopLevelSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800">
      <svg
        className="scale-[2]"
        style={{ filter: 'drop-shadow(0px 0px 1px #60A5FA)' }}
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="24"
        fill="none"
        viewBox="0 0 19 24"
      >
        <motion.path
          variants={icon}
          transition={{ duration: 1, easings: 'easeInOut', repeat: Infinity, repeatDelay: 0.5, repeatType: 'reverse' }}
          initial="hidden"
          animate="visible"
          stroke="#60A5FA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1.5 1v22m0 0l5.302-12M1.5 23c0 .333 2.3.5 11.5-1.5s-.298-7.833-6.198-10.5m0 0L11 1.5c4 3.167 10.3 9.5 3.5 9.5H6.802z"
        ></motion.path>
      </svg>
    </div>
  );
};

export default TopLevelSpinner;
