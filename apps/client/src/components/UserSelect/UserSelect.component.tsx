import ListBox, { ListBoxProps } from '@ui/ListBox';
import { useState } from 'react';
import { def, users } from '../../assets/static/temporary';
import useOnChange from '../../hooks/useOnChange';
import { useUser } from '../../providers/UserContext.provider';
import useSelectedItems from './hooks/useSelectedItems';
import SelectedUsersContainer from './SelectedUsersContainer.component';
import { CgLock } from 'react-icons/cg';

interface User {
  name: string;
  id: string;
  profilePicture: string;
}

type Props = Omit<ListBoxProps<User>, 'disabledKeys' | 'items' | 'onChange' | 'value'> & {
  onChange: (value: User[]) => void;
  flow?: 'horizontal' | 'vertical';
};

//TODO: kamosov treba fetchovat tu
const UserSelect = ({ onChange, flow = 'horizontal', disabled, ...props }: Props) => {
  const user = useUser();
  const [selectedItem, setSelectedItem] = useState(def);
  const { selectedItems, handleUnselect } = useSelectedItems(selectedItem);
  useOnChange({ changedValue: selectedItems, onChange });

  return (
    <div className={`relative w-full ${flow === 'horizontal' ? 'grid-row-2 grid gap-6 md:grid-cols-2' : 'flex flex-col gap-6'}`}>
      <div className="rounded-default absolute -inset-3 z-20 flex flex-col items-center justify-center gap-2 bg-gray-800/30 text-gray-300 backdrop-blur-sm">
        <CgLock className="text-xl" />
        <p className="text-sm leading-none">Sharing only available for Adult acounts.</p>
      </div>
      <ListBox
        {...props}
        disabled={user?.type === 'CHILD' ? true : disabled}
        items={users}
        value={selectedItem}
        onChange={(e) => setSelectedItem(e)}
        disabledKeys={selectedItems.map((item) => item.id)}
      />
      <SelectedUsersContainer selectedUsers={selectedItems} handleUserUnselect={handleUnselect} flow={flow} />
    </div>
  );
};

export default UserSelect;
