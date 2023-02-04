import { motion } from 'framer-motion';
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
      className={`relative flex w-max flex-col items-center gap-1 text-sm duration-200 hover:!text-gray-50 ${
        isActive ? 'text-gray-50' : 'text-gray-400'
      }`}
    >
      <p className="flex min-w-max items-center gap-2">
        {Icon} {text}
      </p>
      <motion.div
        animate={{ width: isActive ? '100%' : '0%' }}
        transition={{ bounce: 0, type: 'spring', duration: 0.4 }}
        className={`bg-primary-300 h-0.5 w-full self-start rounded-full ${isActive ? 'w-full' : 'w-0'}`}
      />
    </Link>
  );
};

export default SettingsTabLink;
