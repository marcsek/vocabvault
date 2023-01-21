import { useState } from 'react';
import SelectedUsersContainer from '../../../../../components/UserSelect/SelectedUsersContainer.component';
import { useGetChildren } from '../../../../../queries/user';
import AddUserBySocialID from './AddUserBySocialID';
import RemoveChildDialog from './RemoveChildDialog';

const ManageChildren = () => {
  const { data: children } = useGetChildren();
  const [dialogOpen, setDialogOpen] = useState<{ state: boolean; child: string | null }>({ state: false, child: null });

  const handleChildUnselect = ({ id }: { id: string; name: string; profilePicture: string }) => {
    setDialogOpen({ state: true, child: id });
  };

  return (
    <div className="flex min-h-[20rem] flex-col gap-6">
      <AddUserBySocialID />
      <SelectedUsersContainer selectedUsers={children ?? []} handleUserUnselect={handleChildUnselect} flow="vertical" />
      <RemoveChildDialog isOpen={dialogOpen} setIsOpen={setDialogOpen} />
    </div>
  );
};

export default ManageChildren;
