import { useEffect, useState } from 'react';
import { useUser } from '../../../../providers/UserContext.provider';
import { useChangeUserRole } from '../../../../queries/user';
import ChangeRoleDialog from './ChangeRoleDialog';
import SettingsRadioGroup from './RoleRadioGroup';

const accoutRole = [
  { name: 'adult', desc: 'As a parent account you can manage children account’s.' },
  { name: 'child', desc: 'As a child you can receive word sources from your parent.' },
];

const Role = () => {
  const role = useChangeUserRole();
  const user = useUser();

  const [activeRole, setActiveRole] = useState(user?.type.toLocaleLowerCase());
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleButtonClick = () => role.mutate({ type: user?.type === 'ADULT' ? 'child' : 'adult' });

  const handleRoleChange = (e: string) => {
    if (user?.type.toLowerCase() !== e) {
      setDialogOpen(true);
    } else {
      setActiveRole(e);
    }
  };

  useEffect(() => {
    setDialogOpen(false);
  }, [role.isSuccess]);

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Role</h2>
        <p className="text-sm text-gray-400">Choose role for your account.</p>
      </div>
      <SettingsRadioGroup activeRole={activeRole ?? ''} handleRoleChange={handleRoleChange} allRoles={accoutRole} />
      <ChangeRoleDialog
        onButtonClick={handleButtonClick}
        onClose={() => setDialogOpen(false)}
        isOpen={dialogOpen}
        loading={role.isLoading}
      />
    </div>
  );
};

export default Role;
