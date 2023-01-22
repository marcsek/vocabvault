import React from 'react';
import Button from '@ui/Button';
import DialogTemplate from '@ui/DialogTemplate';

interface Props {
  isOpen: boolean;
  onButtonClick: () => void;
  onClose: () => void;
  loading: boolean;
}

const ChangeRoleDialog = ({ isOpen, onButtonClick, onClose, loading }: Props) => {
  return (
    <DialogTemplate
      isOpen={isOpen}
      onClose={onClose}
      title={'Changing role'}
      body={'Are you sure you want to change your role? You will no longer have access to shared sources.'}
      foot={
        <div className="flex gap-2">
          <Button onClick={onButtonClick} className="w-fit" intent="warning" size="small" loading={loading}>
            Change
          </Button>
          <Button onClick={onClose} intent="asWrapper" className="text-gray-400">
            Cancel
          </Button>
        </div>
      }
    />
  );
};

export default ChangeRoleDialog;
