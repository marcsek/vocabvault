import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import React from 'react';

interface Props {
  children: React.ReactNode;
  FallbackComponent: React.ComponentType<{ error: Error; resetErrorBoundary: (...args: Array<unknown>) => void }>;
}

const ErrorBoundary = ({ children, FallbackComponent }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
