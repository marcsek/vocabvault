import React from 'react';
import Button from '@ui/Button';
import DialogTemplate from '@ui/DialogTemplate';

interface Props {
  isOpen: boolean;
  onPrimaryClick: () => void;
  onClose: () => void;
}

const CancelSessionDialog = ({ isOpen, onPrimaryClick, onClose }: Props) => {
  return (
    <DialogTemplate
      isOpen={isOpen}
      onClose={onClose}
      title={'Cancelling session'}
      body={'Are you sure you want to cancel your session? All your progress will be lost.'}
      foot={
        <div className="flex gap-2">
          <Button onClick={onPrimaryClick} className="w-fit" intent="warning" size="small">
            Cancel
          </Button>
          <Button onClick={onClose} intent="asWrapper" className="text-gray-400">
            Continue
          </Button>
        </div>
      }
    />
  );
};

export default CancelSessionDialog;
