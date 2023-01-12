import Divider from '@ui/Divider';
import React from 'react';
import { TGetAllUserSourcesOutput } from 'server/src/schemas/wordSource.schema';
import { BsFileWord } from 'react-icons/bs';
import { AiOutlineLock } from 'react-icons/ai';

interface Props {
  cardData: TGetAllUserSourcesOutput;
}

const SourceCard = ({
  cardData: { createdAt, creator, documentType, firstLanguage, secondLanguage, name, wordPairs, userAvailableSources, type, id },
}: Props) => {
  console.log(`https://flagsapi.com/${firstLanguage.code.toUpperCase()}/flat/64.png`);
  return (
    <div className="relative">
      <div className="rounded-default relative z-10 flex w-80 flex-col gap-6 border border-gray-600 bg-gray-800 p-6">
        <div className="flex flex-col gap-4 leading-none">
          <h3 className="font-semibold">{name}</h3>
          <div className="flex items-center gap-6 text-xl font-bold">
            <div className="flex items-center gap-2">
              <img
                className="box-border h-5 rounded-sm"
                src={`https://flagcdn.com/w80/${firstLanguage.code}.png`}
                alt={firstLanguage.code}
              ></img>
              <p className="uppercase">{firstLanguage.code}</p>
            </div>
            <Divider className="h-1 w-6 rounded-full" />
            <div className="flex items-center gap-2">
              <img
                className="box-border h-5 rounded-sm"
                // src={`https://flagsapi.com/${secondLanguage.code.toUpperCase()}/flat/64.png`}
                src={`https://flagcdn.com/w80/${secondLanguage.code}.png`}
                alt={secondLanguage.code}
              ></img>
              <p className="uppercase">{secondLanguage.code}</p>
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-400">{`Creator: ${creator.name}`}</p>
        </div>
        <Divider className=" w-full rounded-full outline-dashed outline-1 outline-gray-600" />
        <div className="flex flex-col gap-12 leading-none">
          <div className="flex flex-col gap-4">
            <div className="flex gap-1 text-sm ">
              <BsFileWord size={16} className="text-gray-400" />
              <p className="leading-none">{wordPairs.length}</p>
              <p className="leading-none text-gray-400">word pairs</p>
            </div>
            <div className="flex gap-1 text-sm ">
              <BsFileWord size={16} className="text-gray-400" />
              <p className="leading-none">{documentType}</p>
              <p className="leading-none text-gray-400">document type</p>
            </div>
            <div className="flex gap-1 text-sm ">
              <BsFileWord size={16} className="text-gray-400" />
              <p className="leading-none">{new Date(createdAt).toDateString()}</p>
              <p className="leading-none text-gray-400">creation date</p>
            </div>
          </div>
          <div className="flex">
            <p className="flex gap-2 text-sm font-semibold leading-none text-gray-300">
              Private <AiOutlineLock size={16}></AiOutlineLock>
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-default absolute left-4 -right-1 top-2 -bottom-1 rotate-3 bg-gray-700 drop-shadow-lg"></div>
    </div>
  );
};

export default SourceCard;
