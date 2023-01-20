import React from 'react';
import WordsIcon from '../../../../assets/Icons/WordsIcon.svg';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbCalendarTime } from 'react-icons/tb';
import { TGetAllWordSourcesOutput } from '../../WordSources.page';

type Props = Pick<TGetAllWordSourcesOutput[number], 'wordPairsCount' | 'documentType' | 'createdAt'>;

const SourceStats = ({ wordPairsCount, documentType, createdAt }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-1 text-sm">
        <img src={WordsIcon} className="h-5 w-5 object-fill"></img>
        <p className="leading-none">{wordPairsCount}</p>
        <p className="leading-none text-gray-400">word pairs</p>
      </div>
      <div className="flex items-end gap-1 text-sm">
        <HiOutlineDocumentText size={20} className="text-gray-400" />
        <p className="capitalize leading-none">{documentType}</p>
        <p className="leading-none text-gray-400">document type</p>
      </div>
      <div className="flex items-end gap-1 text-sm">
        <TbCalendarTime size={20} className="text-gray-400" />
        <p className="leading-none">{new Date(createdAt).toDateString()}</p>
        <p className="leading-none text-gray-400">creation date</p>
      </div>
    </div>
  );
};

export default SourceStats;
