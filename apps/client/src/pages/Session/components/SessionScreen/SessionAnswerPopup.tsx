import React from 'react';

interface Props {
  correctAnswer: string;
}

const SessionAnswerPopup = ({ correctAnswer }: Props) => {
  return (
    <div className="text-error-200 flex flex-col items-center">
      <span className="text-sm">The correct answer is:</span>
      <p className="text-2xl font-bold">{correctAnswer}</p>
    </div>
  );
};

export default SessionAnswerPopup;
