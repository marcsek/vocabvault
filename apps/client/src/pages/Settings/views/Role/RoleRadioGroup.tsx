import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { BsCheck } from 'react-icons/bs';
import { useUser } from '../../../../providers/UserContext.provider';

interface Props {
  allRoles: { name: string; desc: string }[];
  activeRole: string;
  handleRoleChange: (role: string) => void;
}

const RoleRadioGroup = ({ activeRole, handleRoleChange, allRoles }: Props) => {
  const user = useUser();

  return (
    <RadioGroup value={activeRole} onChange={(e) => handleRoleChange(e)}>
      <RadioGroup.Label className="sr-only">Account Role</RadioGroup.Label>
      <div className="flex flex-col gap-6">
        {allRoles.map((role) => (
          <RadioGroup.Option key={role.name} value={role.name}>
            {({ active, checked }) => (
              <li
                className={` rounded-default flex cursor-pointer list-none justify-between px-6 py-4 shadow-lg outline outline-1 outline-gray-500 duration-75 ${
                  active ? 'ring-primary-300 ring' : ''
                }`}
              >
                <div className="flex flex-col gap-2 leading-none">
                  <div className="flex gap-2">
                    <h3 className="font-semibold capitalize text-gray-50">{role.name}</h3>
                    {user?.type === role.name.toUpperCase() && (
                      <div className="bg-primary-500/30 h-full rounded-full px-2">
                        <p className="text-primary-200 text-xs">Current</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm leading-none text-gray-400">{role.desc}</p>
                </div>
                <div className={`ml-5 flex flex-col items-center justify-center gap-1.5 ${checked ? 'visible' : 'invisible'}`}>
                  <CheckRounded size={28} />
                </div>
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

const CheckRounded = ({ size }: { size: string | number }) => {
  return (
    <div className={`bg-primary-500/30 text-primary-200 flex h-[24px] w-[24px] items-center justify-center rounded-full`}>
      <BsCheck className="h-full w-full" />
    </div>
  );
};

export default RoleRadioGroup;
