import Button from '@ui/Button';
import { useState } from 'react';
import { useChangeUserRole } from '../../../../queries/user';
import SettingsRadioGroup from './RoleRadioGroup';

const accoutRole = [
  { name: 'adult', desc: 'As a parent account you can manage children account’s.' },
  { name: 'child', desc: 'As a child you can receive word sources from your parent.' },
];

const Role = () => {
  const [activeRole, setActiveRole] = useState(accoutRole[0]);
  const role = useChangeUserRole();

  const handleButtonClick = () => {
    role.mutate({ type: activeRole.name as 'child' | 'adult' });
  };

  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Role</h2>
        <p className="text-sm text-gray-400">Choose role for your account.</p>
      </div>
      <SettingsRadioGroup activeRole={activeRole} setActiveRole={setActiveRole} allRoles={accoutRole} />
      <Button className="w-fit" onClick={handleButtonClick}>
        Save role
      </Button>
    </div>
  );
};

export default Role;
