import React from 'react';
import { Dialog } from '@headlessui/react';
import Button from '@ui/Button';
import { useRemoveChild } from '../../../../../queries/user';

interface Props {
  isOpen: {
    state: boolean;
    child: string | null;
  };
  setIsOpen: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      child: string | null;
    }>
  >;
}

const RemoveChildDialog = ({ isOpen, setIsOpen }: Props) => {
  const removeChild = useRemoveChild();

  const handleSubmitClick = () => {
    removeChild.mutate({ childId: isOpen.child ?? '' });
    setIsOpen({ child: null, state: false });
  };

  return (
    <Dialog open={isOpen.state} onClose={() => setIsOpen({ state: false, child: null })} className="relative z-50">
      <div className="fixed inset-0 bg-gray-800/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="rounded-default mx-auto flex max-w-md flex-col gap-6 bg-gray-800 px-8 py-7 outline outline-1 outline-gray-600">
          <div className="flex flex-col gap-2">
            <Dialog.Title className="text-lg font-semibold leading-none text-gray-50">Removing a child</Dialog.Title>

            <p className="text-sm text-gray-400">
              Are you sure you want to remove this child from. The child will no longer have acess to shared sources
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSubmitClick}
              className="text-error-200 w-fit border border-gray-600 hover:shadow-none"
              intent="asWrapper"
              size="small"
            >
              Remove
            </Button>
            <Button onClick={() => setIsOpen({ child: null, state: false })} intent="asWrapper" className="text-gray-400">
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RemoveChildDialog;
