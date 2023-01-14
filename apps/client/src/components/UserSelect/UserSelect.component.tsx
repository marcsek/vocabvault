import ListBox, { ListBoxProps } from '@ui/ListBox';
import { useState } from 'react';
import { def, users } from '../../assets/static/temporary';
import useOnChange from '../../hooks/useOnChange';
import useSelectedItems from './hooks/useSelectedItems';
import SelectedUsersContainer from './SelectedUsersContainer.component';

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
const UserSelect = ({ onChange, flow = 'horizontal', ...props }: Props) => {
  const [selectedItem, setSelectedItem] = useState(def);
  const { selectedItems, handleUnselect } = useSelectedItems(selectedItem);
  useOnChange({ changedValue: selectedItems, onChange });

  return (
    <div className={`w-full ${flow === 'horizontal' ? 'grid-row-2 grid gap-6 md:grid-cols-2' : 'grid grid-cols-1 gap-6 lg:gap-0'}`}>
      <ListBox
        {...props}
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
