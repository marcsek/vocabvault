import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { MdChildCare } from 'react-icons/md';
import { VscShield } from 'react-icons/vsc';
import { RiParentLine } from 'react-icons/ri';
import SettingTabLink from './SettingsTabLink.component';

const settingsPaths = ['general', 'children', 'security', 'role'];

const SettingsTabs = () => {
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<typeof settingsPaths[number]>('general');

  useEffect(() => {
    const path = pathname.split('/').at(-1) ?? '';
    if (settingsPaths.includes(path)) {
      setCurrentTab(path);
    } else {
      setCurrentTab('general');
    }
  }, [pathname]);

  return (
    <div className="h-fit overflow-x-auto sm:overflow-x-visible">
      <nav className="flex min-w-max gap-6 sm:flex-col">
        <SettingTabLink text="General" Icon={<BiUser size={20} />} isActive={currentTab === 'general'} to="" />
        <SettingTabLink text="Role" Icon={<RiParentLine size={20} />} isActive={currentTab === 'role'} to="role" />
        <SettingTabLink text="My children" Icon={<MdChildCare size={20} />} isActive={currentTab === 'children'} to="children" />
        <SettingTabLink text="Security" Icon={<VscShield size={20} />} isActive={currentTab === 'security'} to="security" />
      </nav>
    </div>
  );
};

export default SettingsTabs;
