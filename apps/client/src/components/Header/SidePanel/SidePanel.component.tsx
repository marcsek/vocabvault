import { Dialog } from '@headlessui/react';
import Logo from '../../../assets/VocabVaultLogo.svg';
import { RxCross2 } from 'react-icons/rx';
import Nav from '../Nav.components';
import { Button } from '@ui/Button';
import Divider from '@ui/Divider';
import ProfilePicture from '../../../assets/PoriflePicture.png';
import { FiLogIn } from 'react-icons/fi';
import { IoStarSharp } from 'react-icons/io5';
import { IoMdCompass } from 'react-icons/io';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SidePanel = ({ isOpen, onClose }: Props) => {
  const user = false;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-gray-800/30 backdrop-blur-[2px]" aria-hidden="true" />

      <div className="rounded-l-default fixed top-0 bottom-0 right-0 flex w-full items-center justify-center bg-gray-800 shadow-[-1px_4px_32px_1px_#00000088] backdrop-blur-sm sm:w-[320px] sm:bg-gray-800/50">
        <Dialog.Panel className="flex h-full flex-1 flex-col gap-6 p-9">
          <Dialog.Title className="flex justify-between">
            <img src={Logo}></img>
            <Button intent="asWrapper" size="asWraper" onClick={onClose} className="!rounded-full p-3">
              <RxCross2 size="24" />
            </Button>
          </Dialog.Title>
          {user && (
            <>
              <Divider className="h-[1px] w-full" />
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2">
                  <img src={ProfilePicture}></img>
                  <span className="font-semibold">Marek Tate</span>
                </div>
                <Nav
                  className="flex flex-col gap-8"
                  linkClicked={onClose}
                  links={[
                    { to: '/', text: 'History' },
                    { to: '/auth/login', text: 'Settings' },
                  ]}
                />
              </div>
            </>
          )}

          <Divider className="h-[1px] w-full" />
          <Nav
            className="flex flex-col gap-8"
            linkClicked={onClose}
            links={
              user
                ? [
                    { to: '/', text: 'Dashboard' },
                    { to: '/auth/login', text: 'Word Sources' },
                  ]
                : [
                    { to: '/', text: 'Home' },
                    { to: '/auth/login', text: 'Learn More' },
                  ]
            }
          />
          <Divider className="h-[1px]" />
          <div className="flex w-full flex-col gap-8">
            <Button size="medium" className="w-full" intent="outlined" Icon={user ? <IoStarSharp /> : <FiLogIn />} onClick={onClose}>
              {user ? 'Begin session' : 'Log In'}
            </Button>
            {!user && (
              <Button size="medium" Icon={<IoMdCompass />}>
                Register
              </Button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SidePanel;
