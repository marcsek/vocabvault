import { useEffect, useState } from 'react';
import ChildrenContainer from '../../../../../components/ChildrenContainer/ChildrenContainer.component';
import { useGetChildren, useRemoveChild } from '../../../../../queries/user';
import AddUserBySocialID from './AddUserBySocialID';
import RemoveChildDialog from './RemoveChildDialog';

const ManageChildren = () => {
  const { data: children } = useGetChildren();
  const removeChild = useRemoveChild();
  const [dialogOpen, setDialogOpen] = useState<{ state: boolean; child: string | null }>({ state: false, child: null });

  const handleChildUnselect = (id: string) => {
    setDialogOpen({ state: true, child: id });
  };

  useEffect(() => {
    setDialogOpen({ state: false, child: null });
  }, [removeChild.isSuccess]);

  const handleSubmitClick = () => {
    removeChild.mutate({ childId: dialogOpen.child ?? '' });
  };

  const handleDialogClose = () => {
    setDialogOpen({ state: false, child: null });
  };

  return (
    <div className="flex min-h-[20rem] flex-col gap-6">
      <AddUserBySocialID />
      <ChildrenContainer selectedUsers={children ?? []} handleUserUnselect={(e) => handleChildUnselect(e.id)} flow="vertical" />
      <RemoveChildDialog
        loading={removeChild.isLoading}
        isOpen={dialogOpen.state}
        onButtonClick={handleSubmitClick}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default ManageChildren;
