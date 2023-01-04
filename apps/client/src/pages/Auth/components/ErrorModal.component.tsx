import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';

interface Props {
  errorMessage?: string;
}

const ErrorModal = ({ errorMessage }: Props) => {
  return (
    <div className="bg-error-400 text-error-50 rounded-default flex items-center gap-2 px-3 py-2">
      <RiErrorWarningFill size={24}></RiErrorWarningFill>
      <p className="text-error-50 text-sm">{errorMessage}</p>
    </div>
  );
};

export default ErrorModal;
