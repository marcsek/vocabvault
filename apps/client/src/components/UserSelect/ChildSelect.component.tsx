import ListBox, { ListBoxProps } from '@ui/ListBox';
import useOnChange from '../../hooks/useOnChange';
import { useUser } from '../../providers/UserContext.provider';
import useSelectedItems from './hooks/useSelectedItems';
import ChildrenContainer from '../ChildrenContainer/ChildrenContainer.component';
import AdultLock from './AdultLock';
import { useGetChildren } from '../../queries/user';
import { inferProcedureOutput } from '@trpc/server';
import { userRouter } from 'server/src/routers/user';

export type TGetChildrenOutput = NonNullable<inferProcedureOutput<typeof userRouter.getUserChildren>>;

type Props = Omit<ListBoxProps<TGetChildrenOutput>, 'disabledKeys' | 'items' | 'onChange' | 'value'> & {
  onChange: (value: TGetChildrenOutput) => void;
  flow?: 'horizontal' | 'vertical';
  initialChildren?: TGetChildrenOutput;
};

const defaultListBoxValue = { id: '0', name: 'Select children', profileImage: '/' };

const ChildSelect = ({ onChange, flow = 'horizontal', disabled, initialChildren = [], ...props }: Props) => {
  const user = useUser();
  const { data: allChildren } = useGetChildren();

  const { selectedItems, handleSelect, handleUnselect } = useSelectedItems(initialChildren);
  useOnChange({ changedValue: selectedItems, onChange });

  return (
    <div className={`relative w-full ${flow === 'horizontal' ? 'grid-row-2 grid gap-6 md:grid-cols-2' : 'flex flex-col gap-6'}`}>
      {user?.type === 'CHILD' && <AdultLock />}
      <ListBox
        {...props}
        disabled={user?.type === 'CHILD' ? true : disabled}
        items={allChildren ?? []}
        value={defaultListBoxValue}
        onChange={handleSelect}
        disabledKeys={selectedItems.map((item) => item.id)}
      />
      <ChildrenContainer selectedUsers={selectedItems} handleUserUnselect={handleUnselect} flow={flow} />
    </div>
  );
};

export default ChildSelect;
