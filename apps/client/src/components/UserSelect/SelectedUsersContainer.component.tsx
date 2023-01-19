import UserPill from './UserPill';
import { RxInfoCircled } from 'react-icons/rx';

interface Props {
  selectedUsers: { id: string; name: string; profilePicture: string }[];
  handleUserUnselect: (user: { id: string; name: string; profilePicture: string }) => void;
  flow: 'horizontal' | 'vertical';
}
//TODO: Nieco s tym kontajnerom aby nebral viac width ako ma
const SelectedUsersContainer = ({ selectedUsers, handleUserUnselect, flow }: Props) => {
  return (
    <div className="box-border flex h-full w-full flex-1 flex-grow basis-12 flex-col gap-2">
      <label className="text-sm text-gray-50 ">{`${selectedUsers.length} selected`}</label>
      <div className="box-border h-full overflow-x-auto rounded-[4px] bg-gray-800 px-3 py-1.5 text-base font-medium leading-none outline outline-1 outline-gray-500 duration-75">
        <ul
          className={`flex h-full flex-shrink gap-x-4 gap-y-3 ${
            selectedUsers.length === 0 ? 'items-center justify-center' : 'w-max justify-start'
          } ${flow === 'vertical' && !!selectedUsers.length ? '!h-fit max-w-full flex-wrap' : ''}`}
        >
          <>
            {!selectedUsers.length ? (
              <div className="flex items-center gap-2 rounded-full bg-gray-700 py-1.5 px-3 text-xs font-semibold text-gray-400">
                <RxInfoCircled size={16} /> No one selected
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
