import Button from '@ui/Button';
import TextField from '@ui/TextField';
import React from 'react';

const General = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">General</h2>
        <p className="text-sm text-gray-400">Settings for your general account usage.</p>
      </div>
      <div className="flex flex-col gap-8 lg:max-w-[32rem]">
        <TextField labelText="Name" />
        <TextField labelText="Email" />
      </div>
      <Button className="w-fit">Save settings</Button>
    </div>
  );
};

export default General;
