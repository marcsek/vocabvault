import Button, { ButtonProps } from '@ui/Button';
import React from 'react';
import { TAnswerValidity } from './SessionScreen';

interface Props extends Pick<TAnswerValidity, 'validity'> {
  ControlButton: React.ReactElement<ButtonProps>;
}

const SessionControls = ({ validity: valid, ControlButton }: Props) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className={`h-0.5 w-full ${valid === 'VALID' ? 'bg-success-200' : valid === 'INVALID' ? 'bg-error-200' : 'bg-gray-500'}`}></div>
      <div className="px-17 max-w-8xl flex w-full justify-between py-8">
        <Button intent="outlined" size="medium">
          End session
        </Button>
        <div>{ControlButton}</div>
      </div>
    </div>
  );
};

export default SessionControls;
