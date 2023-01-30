import ProgressBar from '@ui/ProgressBar';
import React from 'react';

const AccuracyBar = () => {
  return (
    <div className="rounded-default flex flex-col gap-4 px-6 py-5 leading-none outline outline-1 outline-gray-600">
      <p className="text-sm font-semibold text-gray-300">Accuracy</p>
      <ProgressBar width={70} />
    </div>
  );
};

export default AccuracyBar;
