import UserPill from './UserPill';
import { RxInfoCircled } from 'react-icons/rx';

interface Props {
  selectedUsers: { id: string; name: string; profilePicture: string }[];
  handleUserUnselect: (user: { id: string; name: string; profilePicture: string }) => void;
}

const SelectedUsersContainer = ({ selectedUsers, handleUserUnselect }: Props) => {
  return (
    <div className="box-border flex h-fit w-full min-w-0 flex-col gap-2">
      <label className="text-sm text-gray-50 ">{`${selectedUsers.length} selected`}</label>
      <div className="box-border overflow-x-auto rounded-[4px] bg-gray-800 px-3 py-1.5 text-base font-medium leading-none outline outline-1 outline-gray-500 duration-75">
        <ul className={`flex gap-4 ${selectedUsers.length === 0 ? 'w-full justify-center' : 'w-max justify-start'}`}>
          <>
            {!selectedUsers.length ? (
              <div className="flex items-center gap-2 rounded-full bg-gray-700 py-1.5 px-3 text-xs font-semibold text-gray-400">
                <RxInfoCircled size={16} /> This file is private
              </div>
            ) : (
              <>
                {selectedUsers.map((user) => (
                  <UserPill key={user.id} user={user} onClick={() => handleUserUnselect(user)} />
                ))}
              </>
            )}
          </>
        </ul>
      </div>
    </div>
  );
};

export default SelectedUsersContainer;
