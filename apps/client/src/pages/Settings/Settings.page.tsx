import Divider from '@ui/Divider';
import TitleLayout from '@ui/TitleLayout/TitleLayout';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SettingsTabs from './components/SettingsTabs.component';

const Settings = () => {
  return (
    <TitleLayout
      headingLeft={
        <div className="flex flex-col gap-6">
          <h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Settings</h1>
        </div>
      }
    >
      <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 lg:gap-32">
        <SettingsTabs />
        <Divider className="hidden h-full outline-dashed outline-1 outline-gray-500 sm:block" />
        <Outlet />
      </div>
    </TitleLayout>
  );
};

export default Settings;
