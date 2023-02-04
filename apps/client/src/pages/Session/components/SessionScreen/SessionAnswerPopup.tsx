import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  correctAnswer: string;
}

const SessionAnswerPopup = ({ correctAnswer }: Props) => {
  return (
    <motion.div
      initial={{ translateY: '-20%', opacity: 0.5 }}
      animate={{ translateY: '0%', opacity: 1 }}
      exit={{ translateY: '-20%', opacity: 0, transition: { duration: 0.1 } }}
      transition={{ type: 'spring', duration: 0.5 }}
      className="text-error-200 flex flex-col items-center"
    >
      <span className="text-sm">The correct answer is:</span>
      <p className="text-2xl font-bold">{correctAnswer}</p>
    </motion.div>
  );
};

export default SessionAnswerPopup;
