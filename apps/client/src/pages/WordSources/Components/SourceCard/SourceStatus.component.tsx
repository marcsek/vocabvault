import React from 'react';
import { AiOutlineLock } from 'react-icons/ai';
import { users } from '../../../../assets/static/temporary';

interface Props {
  type: 'private' | 'shared' | 'watched';
  creator?: { profilePicture?: string; name: string };
  watchers?: { user: { id: string; name: string; profileImage: string } }[];
}

const SourceStatus = ({ type, creator, watchers }: Props) => {
  return (
    <div className="flex">
      {type === 'private' && (
        <p className="flex items-center gap-2 text-sm font-semibold leading-none text-gray-300">
          Private <AiOutlineLock size={20}></AiOutlineLock>
        </p>
      )}
      {type === 'watched' && (
        <div className="flex items-center gap-2 text-sm font-semibold leading-none text-gray-300">
          Shared by:
          <div className="bg-primary-400/30 box-border flex cursor-pointer list-none items-center gap-2 rounded-xl px-2 py-1.5">
            <img src={users[0].profilePicture} className="box-border h-4 w-4 rounded-full"></img>
            <span className="text-primary-200 text-sm font-bold leading-none ">{creator?.name}</span>
          </div>
        </div>
      )}
      {type === 'shared' && (
        <div className="flex items-center gap-2 text-sm font-semibold leading-none text-gray-300">
          Shared with:
          <div className="flex">
            {watchers?.map(({ user }) => (
              <img className="h-5 w-5 rounded-full" src={users[0].profilePicture}></img>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceStatus;
