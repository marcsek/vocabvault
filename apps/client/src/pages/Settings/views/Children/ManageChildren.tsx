import SelectedUsersContainer from '../../../../components/UserSelect/SelectedUsersContainer.component';
import { trpc } from '../../../../utils/trpc';
import AddUserBySocialID from './AddUserBySocialID';

const ManageChildren = () => {
  const { data: children } = trpc.user.getUserChildren.useQuery();

  const handleChildUnselect = () => {
    return;
  };

  return (
    <div className="flex min-h-[20rem] flex-col gap-6">
      <AddUserBySocialID />
      <SelectedUsersContainer selectedUsers={children ?? []} handleUserUnselect={handleChildUnselect} flow="vertical" />
    </div>
  );
};

export default ManageChildren;
