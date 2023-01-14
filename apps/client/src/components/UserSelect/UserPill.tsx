import React from 'react';
import { CgClose } from 'react-icons/cg';

interface Props {
  user: { id: string; name: string; profilePicture: string };
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const UserPill = ({ user, onClick }: Props) => {
  return (
    <li
      className="bg-primary-400/30 box-border flex h-7 cursor-pointer list-none items-center gap-2 rounded-xl px-2 py-1.5"
      onClick={onClick}
    >
      <img src={user.profilePicture} className="box-border h-4 w-4 rounded-full"></img>
      <span className="text-primary-200 text-sm font-bold leading-none ">{user.name}</span>
      <CgClose size={12} strokeWidth={2} className="text-primary-100 mt-[1px]" />
    </li>
  );
};

export default UserPill;
