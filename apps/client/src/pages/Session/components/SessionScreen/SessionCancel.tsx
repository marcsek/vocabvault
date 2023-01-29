import Button from '@ui/Button';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import CancelSessionDialog from './CancelSessionDialog';

const SessionCancel = () => {
  const [cancelDialog, setCancelDialog] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Button
        size="medium"
        intent="asWrapper"
        className="h-fit !p-0 text-gray-400 md:bg-gray-700/50 md:!px-4 md:!py-2"
        onClick={() => setCancelDialog(true)}
      >
        <>
          <p className="hidden md:block">Cancel session</p>
          <RxCross2 className="md:hidden" size="20" />
        </>
      </Button>
      <CancelSessionDialog
        isOpen={cancelDialog}
        onClose={() => setCancelDialog(false)}
        onPrimaryClick={() => navigate('/word-sources', { replace: true })}
      />
    </>
  );
};

export default SessionCancel;
