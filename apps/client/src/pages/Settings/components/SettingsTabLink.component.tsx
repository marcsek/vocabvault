import Divider from '@ui/Divider';
import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

interface Props {
  isActive: boolean;
  Icon: React.ReactElement<IconType>;
  text: string;
  to: string;
}

const SettingsTabLink = ({ isActive, Icon, text, to }: Props) => {
  return (
    <Link
      to={to}
      className={`relative flex w-max flex-col items-center gap-1 !text-base duration-200 hover:!text-gray-50 ${
        isActive ? 'text-gray-50' : 'text-gray-400'
      }`}
    >
      <p className="flex min-w-max items-center gap-2">
        {Icon} {text}
      </p>
      <Divider className={`bg-primary-300 h-0.5 w-full rounded-full ${isActive ? 'w-full' : 'w-0'}`} />
    </Link>
  );
};

export default SettingsTabLink;
