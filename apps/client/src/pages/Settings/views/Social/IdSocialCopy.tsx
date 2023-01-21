import Divider from '@ui/Divider';
import React from 'react';
import { BiHash } from 'react-icons/bi';
import { RxCopy } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useUser } from '../../../../providers/UserContext.provider';

const IdSocialCopy = () => {
  const user = useUser();

  const handleClick = () => {
    navigator.clipboard.writeText('' + user?.socialId ?? '');
    toast.info('Social id copied.');
  };

  return (
    <div className="flex w-fit cursor-pointer flex-col gap-2" onClick={handleClick}>
      <p className="text-sm leading-none">Your social ID</p>
      <div className="rounded-default flex items-center gap-4 px-5 py-3 outline outline-1 outline-gray-500 duration-100 hover:bg-gray-700">
        <div className="flex items-center justify-center gap-3">
          <div className="bg-primary-500/40 rounded-lg p-0.5">
            <BiHash size={24} className="text-primary-300" />
          </div>
          <p className="text-xl">{user?.socialId}</p>
        </div>
        <Divider className="h-[20px] w-0.5 rounded" />
        <RxCopy size={24} className="text-gray-400 hover:text-gray-200" />
      </div>
    </div>
  );
};

export default IdSocialCopy;
