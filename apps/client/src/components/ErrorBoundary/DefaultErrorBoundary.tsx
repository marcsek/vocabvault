import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Button from '@ui/Button';
import React from 'react';
import { IoReload } from 'react-icons/io5';

const DefaultErrorBoundary: React.FC<{ resetErrorBoundary: () => void; error: Error }> = ({ resetErrorBoundary, error }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6">
      <div className="bg-error-400/30 flex h-32 w-32 items-center justify-center rounded-full p-6">
        <ExclamationTriangleIcon className="text-error-200 h-full w-full" />
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-xl font-semibold">An error has occured</h1>
          <p className="text-base font-semibold text-gray-400">
            It seems like you have ran into an error. Please retry now or come back again later.
          </p>
          <p className="mt-2 text-xs font-semibold text-gray-400">Error message: {error.message}</p>
        </div>
        <Button onClick={resetErrorBoundary} intent="outlined" size="medium" Icon={<IoReload />}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default DefaultErrorBoundary;
