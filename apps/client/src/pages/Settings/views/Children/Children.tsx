import React from 'react';
import UserSelect from '../../../../components/UserSelect/UserSelect.component';

const Children = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">Children</h2>
        <p className="text-sm text-gray-400">Manage children accounts.</p>
      </div>
      <div className="flex min-h-[16rem] flex-1 justify-between gap-6">
        <UserSelect
          fieldValue="name"
          fieldKey="id"
          label="User"
          name="user-select"
          flow="vertical"
          onChange={() => {
            console.log();
          }}
        />
      </div>
    </div>
  );
};

export default Children;
