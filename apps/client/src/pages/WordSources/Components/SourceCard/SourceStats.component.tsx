import React from 'react';
import WordsIcon from '../../../../assets/Icons/WordsIcon.svg';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbCalendarTime } from 'react-icons/tb';

interface Props {
  wordPairs: number;
  docType: string;
  creationDate: string;
}

const SourceStats = ({ wordPairs, docType, creationDate }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-1 text-sm">
        <img src={WordsIcon} className="h-5 w-5 object-fill"></img>
        <p className="leading-none">{wordPairs}</p>
        <p className="leading-none text-gray-400">word pairs</p>
      </div>
      <div className="flex items-end gap-1 text-sm">
        <HiOutlineDocumentText size={20} className="text-gray-400" />
        <p className="capitalize leading-none">{docType}</p>
        <p className="leading-none text-gray-400">document type</p>
      </div>
      <div className="flex items-end gap-1 text-sm">
        <TbCalendarTime size={20} className="text-gray-400" />
        <p className="leading-none">{new Date(creationDate).toDateString()}</p>
        <p className="leading-none text-gray-400">creation date</p>
      </div>
    </div>
  );
};

export default SourceStats;
