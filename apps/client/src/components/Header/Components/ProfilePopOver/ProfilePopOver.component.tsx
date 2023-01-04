import { Popover } from '@headlessui/react';
import ProfilePicture from '../../../../assets/PoriflePicture.png';
import { FiChevronDown } from 'react-icons/fi';
import { RiHistoryFill } from 'react-icons/ri';
import { TbSettings } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';
import Divider from '@ui/Divider';
import Link from '@ui/Link';
import { useLogout } from '../../../../queries/user';

const ProfilePopOver = () => {
  const logout = useLogout();

  return (
    <Popover className="relative z-50 h-[32px]">
      {({ open }) => (
        <>
          <Popover.Button className="outline-none">
            <div className="flex items-center justify-center gap-2">
              <img className="h-8 w-8" src={ProfilePicture}></img>
              <FiChevronDown size="20" className={`${open ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </Popover.Button>
          <Popover.Panel className="rounded-default absolute flex w-48 translate-y-4 -translate-x-2/3 flex-col gap-3 bg-gray-800 p-1 pb-3 pt-4 shadow-xl ring-1 ring-gray-600/50">
            <div className="flex flex-col gap-2 px-3">
              <p className="text-sm font-medium leading-none text-gray-400">Signed in as</p>
              <span className="text-sm font-semibold text-gray-50">Marek Tate</span>
            </div>
            <Divider className="h-[1px] w-full bg-gray-700" />
            <div className="flex flex-col gap-2">
              <Popover.Button as={Link} hoverEffect to="#" className="block py-1 px-3 text-gray-300" Icon={<RiHistoryFill size={16} />}>
                History
              </Popover.Button>
              <Popover.Button as={Link} hoverEffect to="#" className="block py-1 px-3 text-gray-300" Icon={<TbSettings size={16} />}>
                Settings
              </Popover.Button>
            </div>
            <Divider className="h-[1px] w-full bg-gray-700" />
            <Popover.Button
              as={Link}
              hoverEffect
              onClick={() => logout.mutate()}
              to="#"
              className="block py-1 px-3 leading-none text-gray-300"
              Icon={<VscSignOut size={16} />}
            >
              Sign Out
            </Popover.Button>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default ProfilePopOver;
