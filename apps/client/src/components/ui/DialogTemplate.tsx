import React from 'react';
import { Dialog } from '@headlessui/react';

interface Props {
  title: React.ReactNode;
  body: React.ReactNode;
  foot: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DialogTemplate = ({ title, body, foot, onClose, isOpen }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-800/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="rounded-default mx-auto flex max-w-md flex-col gap-6 bg-gray-800 px-8 py-7 outline outline-1 outline-gray-600">
          <div className="flex flex-col gap-2">
            <Dialog.Title className="text-lg font-semibold leading-none text-gray-50">{title}</Dialog.Title>
            <p className="text-sm text-gray-400">{body}</p>
          </div>
          {foot}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DialogTemplate;
