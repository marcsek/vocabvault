import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  title: React.ReactNode;
  body: React.ReactNode;
  foot: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const DialogTemplate = ({ title, body, foot, onClose, isOpen }: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50" static>
      {({ open }) => (
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 bg-gray-800/50"
                aria-hidden="true"
              />
              <motion.div
                initial={{ scale: 0.7, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="fixed inset-0 flex items-center justify-center p-4"
              >
                <DialogPanel className="rounded-default mx-auto flex max-w-md flex-col gap-6 bg-gray-800 px-8 py-7 outline outline-1 outline-gray-600">
                  <div className="flex flex-col gap-2">
                    <DialogTitle className="text-lg font-semibold leading-none text-gray-50">{title}</DialogTitle>
                    <p className="text-sm text-gray-400">{body}</p>
                  </div>
                  {foot}
                </DialogPanel>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </Dialog>
  );
};

export default DialogTemplate;
