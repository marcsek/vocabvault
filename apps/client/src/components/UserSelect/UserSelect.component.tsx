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
};

//TODO: kamosov treba fetchovat tu
const UserSelect = ({ onChange, ...props }: Props) => {
  const [selectedItem, setSelectedItem] = useState(def);
  const { selectedItems, handleUnselect } = useSelectedItems(selectedItem);
  useOnChange({ changedValue: selectedItems, onChange });

  return (
    <div className="grid-row-2 grid w-full gap-6 md:grid-cols-2">
      <ListBox
        {...props}
        items={users}
        value={selectedItem}
        onChange={(e) => setSelectedItem(e)}
        disabledKeys={selectedItems.map((item) => item.id)}
      />
      <SelectedUsersContainer selectedUsers={selectedItems} handleUserUnselect={handleUnselect} />
    </div>
  );
};

export default UserSelect;
