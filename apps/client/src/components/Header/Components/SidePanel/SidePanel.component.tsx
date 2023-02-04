import { Dialog } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import Button from '@ui/Button';
import Divider from '@ui/Divider';
import UserNav from './UserNav';
import MainLinks from '../MainLinks.component';
import MainButtons from '../MainButtons.component';
import { useUser } from '../../../../providers/UserContext.provider';
import Logo from '../Logo';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel = ({ isOpen, onClose }: Props) => {
  const user = useUser();

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50" static>
      {({ open }) => (
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'transparent' }}
                animate={{ backdropFilter: 'blur(4px)' }}
                exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'transparent' }}
                className="fixed inset-0 bg-gray-800/30 backdrop-blur-sm"
                aria-hidden="true"
              />
              <motion.div
                initial={{ right: '-100%' }}
                animate={{ right: '0%' }}
                exit={{ right: '-100%', transition: { delay: 0.3 } }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                className="rounded-l-default fixed top-0 bottom-0 right-0 flex w-full items-center justify-center bg-gray-800 shadow-[-1px_4px_32px_1px_#00000088] backdrop-blur-md sm:w-[320px] sm:bg-gray-800/50"
              >
                <Dialog.Panel className="flex h-full flex-1 flex-col gap-6 p-9">
                  <Dialog.Title className="flex justify-between">
                    <Logo />
                    <Button intent="asWrapper" size="asWraper" onClick={onClose} className="!rounded-full p-3">
                      <RxCross2 size="24" />
                    </Button>
                  </Dialog.Title>
                  {!!user && (
                    <>
                      <Divider className="h-[1px] w-full" />
                      <UserNav withLogout onClose={onClose} />
                    </>
                  )}

                  <Divider className="h-[1px] w-full" />
                  <MainLinks onClose={onClose} />

                  <Divider className="h-[1px]" />
                  <MainButtons onClose={onClose} />
                </Dialog.Panel>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      )}
    </Dialog>
  );
};

export default SidePanel;
