import React from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { BsLightningCharge } from 'react-icons/bs';
import Divider from '@ui/Divider';

interface Props {
  currentTab: 'details' | 'actions';
  setCurrentTab: React.Dispatch<React.SetStateAction<'details' | 'actions'>>;
}

const TabSelector = ({ currentTab, setCurrentTab }: Props) => {
  return (
    <nav className="flex w-full gap-6">
      <button
        onClick={() => setCurrentTab('details')}
        className={`relative flex items-center gap-2 duration-200 hover:!text-gray-50 ${currentTab === 'details' ? 'text-gray-50' : 'text-gray-400'
          }`}
      >
        <RxMagnifyingGlass /> Details
        {currentTab === 'details' && (
          <Divider framerId="tab-underline" className="bg-primary-300 absolute -bottom-0.5 h-0.5 w-full rounded-full"></Divider>
        )}
      </button>
      <button
        onClick={() => setCurrentTab('actions')}
        className={`underlin relative flex items-center gap-2 duration-200 hover:!text-gray-50 ${currentTab === 'actions' ? 'text-gray-50' : 'text-gray-400'
          }`}
      >
        <BsLightningCharge /> Actions
        {currentTab === 'actions' && (
          <Divider framerId="tab-underline" className="bg-primary-300 absolute -bottom-0.5 h-0.5 w-full rounded-full"></Divider>
        )}
      </button>
    </nav>
  );
};

export default TabSelector;
