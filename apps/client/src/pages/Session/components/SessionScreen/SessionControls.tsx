import Button, { ButtonProps } from '@ui/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelSessionDialog from './CancelSessionDialog';
import { TAnswerValidity } from './SessionScreen';

interface Props extends Pick<TAnswerValidity, 'validity'> {
  ControlButton: React.ReactElement<ButtonProps>;
}

const SessionControls = ({ validity: valid, ControlButton }: Props) => {
  const navigate = useNavigate();
  const [cancelDialog, setCancelDialog] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className={`h-0.5 w-full ${valid === 'VALID' ? 'bg-success-200' : valid === 'INVALID' ? 'bg-error-200' : 'bg-gray-500'}`}></div>
      <div className="md:px-17 max-w-8xl flex w-full justify-between px-9 py-8">
        <Button
          size="medium"
          intent="asWrapper"
          className="hidden bg-gray-700/50 text-gray-400 md:flex"
          onClick={() => setCancelDialog(true)}
        >
          Cancel session
        </Button>
        <div className="w-full md:w-fit">{ControlButton}</div>
      </div>
      <CancelSessionDialog
        isOpen={cancelDialog}
        onClose={() => setCancelDialog(false)}
        onPrimaryClick={() => navigate('/word-sources', { replace: true })}
      />
    </div>
  );
};

export default SessionControls;
