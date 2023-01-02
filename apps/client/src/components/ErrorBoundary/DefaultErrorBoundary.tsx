import React from 'react';

const DefaultErrorBoundary: React.FC<{ resetErrorBoundary: () => void; error: Error }> = ({ resetErrorBoundary, error }) => {
  console.log(error.message);
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Reset</button>
    </div>
  );
};

export default DefaultErrorBoundary;
