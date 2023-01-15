import Divider from '@ui/Divider';
import Link from '@ui/Link';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { MdChildCare } from 'react-icons/md';
import { VscShield } from 'react-icons/vsc';

const SettingsTabs = () => {
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState<'general' | 'children' | 'security'>('general');

  useEffect(() => {
    const path = pathname.split('/').at(-1) ?? '';
    if (path === 'children') {
      setCurrentTab('children');
    } else if (path === 'security') {
      setCurrentTab('security');
    } else {
      setCurrentTab('general');
    }
  }, [pathname]);

  return (
    <div className="h-fit overflow-x-auto sm:overflow-x-visible">
      <nav className="flex min-w-max gap-6 sm:flex-col">
        <Link
          to=""
          className={`relative flex w-max flex-col items-center gap-1 !text-base hover:!text-gray-50 ${
            currentTab === 'general' ? 'text-gray-50' : 'text-gray-400'
          }`}
        >
          <p className="flex min-w-max items-center gap-2">
            <BiUser size={20} /> General
          </p>
          <Divider className={`bg-primary-300 h-0.5 w-full rounded-full ${currentTab === 'general' ? 'w-full' : 'w-0'}`}></Divider>
        </Link>
        <Link
          to="children"
          className={`relative flex w-max flex-col items-center gap-1 !text-base hover:!text-gray-50 ${
            currentTab === 'children' ? 'text-gray-50' : 'text-gray-400'
          }`}
        >
          <p className="flex min-w-max items-center gap-2">
            <MdChildCare size={20} /> My children
          </p>
          <Divider className={`bg-primary-300 h-0.5 w-full rounded-full ${currentTab === 'children' ? 'w-full' : 'w-0'}`}></Divider>
        </Link>
        <Link
          to="security"
          className={`underlin relative flex w-max flex-col items-center gap-1 !text-base hover:!text-gray-50 ${
            currentTab === 'security' ? 'text-gray-50' : 'text-gray-400'
          }`}
        >
          <p className="flex min-w-max items-center gap-2">
            <VscShield size={20} /> Security
          </p>
          <Divider className={`bg-primary-300 h-0.5 w-full rounded-full ${currentTab === 'security' ? 'w-full' : 'w-0'}`}></Divider>
        </Link>
      </nav>
    </div>
  );
};

export default SettingsTabs;
