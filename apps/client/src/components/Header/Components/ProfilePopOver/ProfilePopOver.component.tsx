import { Popover } from '@headlessui/react';
import ProfilePicture from '../../../../assets/PoriflePicture.png';
import { FiChevronDown } from 'react-icons/fi';
import Divider from '@ui/Divider';
import Link from '@ui/Link';

const ProfilePopOver = () => {
  return (
    <Popover className="relative h-[32px]">
      {({ open }) => (
        <>
          <Popover.Button className="outline-none">
            <div className="flex items-center justify-center gap-2">
              <img className="h-8 w-8" src={ProfilePicture}></img>
              <FiChevronDown size="20" className={`${open ? 'rotate-180' : 'rotate-0'}`} />
            </div>
          </Popover.Button>
          <Popover.Panel className="rounded-default absolute z-10 flex w-48 translate-y-4 -translate-x-2/3 flex-col gap-3 bg-gray-800 p-4 shadow-sm outline outline-1 outline-gray-600">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium leading-none text-gray-400">Signed in as</p>
              <span className="text-sm font-semibold text-gray-50">Marek Tate</span>
            </div>
            <Divider className="h-[1px] w-full bg-gray-700" />
            <div className="flex flex-col gap-2">
              <Popover.Button as={Link} to="#" className="inline-block py-1 text-gray-300">
                History
              </Popover.Button>
              <Popover.Button as={Link} to="#" className="inline-block py-1 text-gray-300">
                Settings
              </Popover.Button>
            </div>
            <Divider className="h-[1px] w-full bg-gray-700" />
            <Popover.Button as={Link} to="#" className="block leading-none text-gray-300">
              Sign Out
            </Popover.Button>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default ProfilePopOver;
