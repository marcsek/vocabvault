import UserPill from './UserPill';
import { RxInfoCircled } from 'react-icons/rx';
import { TGetChildrenOutput } from '../UserSelect/ChildSelect.component';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  selectedUsers: TGetChildrenOutput;
  handleUserUnselect: (user: TGetChildrenOutput[number]) => void;
  flow: 'horizontal' | 'vertical';
}
//TODO: Nieco s tym kontajnerom aby nebral viac width ako ma
const ChildrenContainer = ({ selectedUsers, handleUserUnselect, flow }: Props) => {
  return (
    <div className="box-border flex h-full w-full flex-1 flex-grow basis-12 flex-col gap-2">
      <label className="text-sm text-gray-50 ">{`${selectedUsers.length} selected`}</label>
      <div className="box-border h-full overflow-x-auto rounded-[4px] bg-gray-800 px-3 py-1.5 text-base font-medium leading-none outline outline-1 outline-gray-500 duration-75">
        <ul
          className={`flex h-full flex-shrink gap-x-4 gap-y-3 ${
            selectedUsers.length === 0 ? 'items-center justify-center' : 'w-max justify-start'
          } ${flow === 'vertical' && !!selectedUsers.length ? '!h-fit max-w-full flex-wrap' : ''}`}
        >
          <AnimatePresence initial={false} mode="wait">
            {!selectedUsers.length ? (
              <motion.div
                layout
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="flex items-center gap-2 rounded-full bg-gray-700 py-1.5 px-3 text-xs font-semibold text-gray-400"
              >
                <RxInfoCircled size={16} /> No one selected
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {selectedUsers.map((user) => (
                  <motion.div
                    transition={{ type: 'spring', duration: 0.5 }}
                    layout
                    key={user.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <UserPill user={user} onClick={() => handleUserUnselect(user)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
};

export default ChildrenContainer;
