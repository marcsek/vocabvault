import { ButtonProps } from '@ui/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelSessionDialog from './CancelSessionDialog';
import SessionCancel from './SessionCancel';
import { TAnswerValidity } from './SessionScreen';
import { motion } from 'framer-motion';

interface Props extends Pick<TAnswerValidity, 'validity'> {
  ControlButton: React.ReactElement<ButtonProps>;
}

const SessionControls = ({ validity: valid, ControlButton }: Props) => {
  const navigate = useNavigate();
  const [cancelDialog, setCancelDialog] = useState(false);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className={`h-0.5 w-full overflow-x-hidden ${'bg-gray-600'}`}>
        {(valid === 'VALID' || valid === 'INVALID') && (
          <motion.div
            initial={{ translateX: '-100%' }}
            animate={{ translateX: '300%' }}
            className={`${valid === 'VALID' ? 'bg-success-200' : valid === 'INVALID' ? 'bg-error-200' : ''} relative !left-0 h-full w-1/2`}
            transition={{ duration: 0.75 }}
          ></motion.div>
        )}
      </div>
      <div className="md:px-17 max-w-8xl flex w-full justify-between px-9 py-8">
        <div className="hidden md:block">
          <SessionCancel />
        </div>
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
