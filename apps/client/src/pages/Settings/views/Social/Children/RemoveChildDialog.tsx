import React from 'react';
import Button from '@ui/Button';
import DialogTemplate from '@ui/DialogTemplate';

interface Props {
  isOpen: boolean;
  onButtonClick: () => void;
  onClose: () => void;
  loading: boolean;
}

const RemoveChildDialog = ({ isOpen, onButtonClick, onClose, loading }: Props) => {
  return (
    <DialogTemplate
      isOpen={isOpen}
      onClose={onClose}
      title={'Removing a child'}
      body={'Are you sure you want to remove this child from. The child will no longer have acess to shared sources'}
      foot={
        <div className="flex gap-2">
          <Button onClick={onButtonClick} className="w-fit" intent="warning" size="small" loading={loading}>
            Remove
          </Button>
          <Button onClick={onClose} intent="asWrapper" className="text-gray-400">
            Cancel
          </Button>
        </div>
      }
    />
  );
};

export default RemoveChildDialog;
