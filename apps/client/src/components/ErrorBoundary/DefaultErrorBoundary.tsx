import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Button from '@ui/Button';
import React from 'react';
import { IoReload } from 'react-icons/io5';

const DefaultErrorBoundary: React.FC<{ resetErrorBoundary: () => void; error: Error }> = ({ resetErrorBoundary, error }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
      <div className="bg-error-400/30 flex h-24 w-24 items-center justify-center rounded-full p-5">
        <ExclamationTriangleIcon className="text-error-200 h-full w-full" />
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-lg font-semibold">{'An error has occured.'}</h1>
          <p className="text-md font-semibold text-gray-400">
            It seems like you have ran into an error. Please retry now or come back again later.
          </p>
          <p className="mt-2 text-xs font-semibold text-gray-400">Error message: {error.message}</p>
        </div>
        <Button onClick={resetErrorBoundary} intent="outlined" size="small" Icon={<IoReload />}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default DefaultErrorBoundary;
