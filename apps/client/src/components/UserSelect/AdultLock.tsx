import Link from '@ui/Link';
import React from 'react';
import { CgLock } from 'react-icons/cg';

const AdultLock = () => {
  return (
    <div className="rounded-default absolute -inset-3 z-20 flex flex-col items-center justify-center gap-2 bg-gray-800/30 text-gray-400 backdrop-blur-sm">
      <CgLock className="text-xl" />
      <p className="flex items-center gap-1 text-sm leading-none">
        Sharing only available for
        <Link to="/settings/role" className="text-primary-200 hover:text-primary-200 hover:underline">
          Adult
        </Link>
        acounts.
      </p>
    </div>
  );
};

export default AdultLock;
