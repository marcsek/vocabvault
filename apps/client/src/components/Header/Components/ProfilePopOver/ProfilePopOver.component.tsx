import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { FiChevronDown } from 'react-icons/fi';
import { RiHistoryFill } from 'react-icons/ri';
import { TbSettings } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';
import Divider from '@ui/Divider';
import Link from '@ui/Link';
import { useLogout } from '../../../../queries/user';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../../../providers/UserContext.provider';

const ProfilePopOver = () => {
  const logout = useLogout();
  const user = useUser();

  return (
    <Popover className="relative z-50 h-[32px]">
      {({ open }) => (
        <>
          <PopoverButton aria-label="profile-view" className="z-30 outline-none">
            <div className="flex items-center justify-center gap-2">
              <div className="overflow-hidden rounded-full bg-gray-700 outline outline-gray-600">
                <img className="h-8 w-8" src={user?.profileImage ?? ''} alt="profile image"></img>
              </div>
              <motion.div animate={{ rotate: open ? '180deg' : '0deg' }}>
                <FiChevronDown size="20" />
              </motion.div>
            </div>
          </PopoverButton>
          <PopoverPanel static>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0.5, translateY: '-10%', translateX: '-60%' }}
                  animate={{ opacity: 1, translateY: '5%', translateX: '-60%' }}
                  exit={{ opacity: 0, translateY: '0%', transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="rounded-default absolute flex w-48 -translate-x-2/3 flex-col gap-3 bg-gray-800 p-1 pb-3 pt-4 shadow-xl ring-1 ring-gray-600/50"
                >
                  <div className="flex flex-col gap-2 px-3">
                    <p className="text-sm font-medium leading-none text-gray-400">Signed in as</p>
                    <span className="text-sm font-semibold text-gray-50">{user?.name ?? ''}</span>
                  </div>
                  <Divider className="h-[1px] w-full bg-gray-700" />
                  <div className="flex flex-col gap-2">
                    <PopoverButton
                      as={Link}
                      hoverEffect
                      to="/session-history"
                      className="block px-3 py-1 text-gray-300"
                      Icon={<RiHistoryFill size={16} />}
                    >
                      History
                    </PopoverButton>
                    <PopoverButton
                      as={Link}
                      hoverEffect
                      to="/settings"
                      className="block px-3 py-1 text-gray-300"
                      Icon={<TbSettings size={16} />}
                    >
                      Settings
                    </PopoverButton>
                  </div>
                  <Divider className="h-[1px] w-full bg-gray-700" />
                  <PopoverButton
                    as={Link}
                    hoverEffect
                    onClick={() => logout.mutate()}
                    to="#"
                    className="block px-3 py-1 leading-none text-gray-300"
                    Icon={<VscSignOut size={16} />}
                  >
                    Sign Out
                  </PopoverButton>
                </motion.div>
              )}
            </AnimatePresence>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};

export default ProfilePopOver;
