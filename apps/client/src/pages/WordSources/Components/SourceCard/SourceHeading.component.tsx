import Divider from '@ui/Divider';
import React from 'react';

interface Props {
  name: string;
  firstLangCode: string;
  secondLangCode: string;
  creator: { profileImage?: string; id: string; name: string };
}

const countryFlagURL = (code: string) => `https://flagcdn.com/w80/${code}.png`;

const SourceHeading = ({ name, firstLangCode, secondLangCode, creator }: Props) => {
  return (
    <div className="flex flex-col gap-4 leading-none">
      <h3 className="font-semibold">{name}</h3>
      <div className="flex items-center gap-6 text-xl font-bold leading-none">
        <div className="flex items-center gap-2">
          <img className="box-border h-5 rounded-sm" src={countryFlagURL(firstLangCode)} alt={firstLangCode}></img>
          <p className="uppercase">{firstLangCode}</p>
        </div>
        <Divider className="h-1 w-6 rounded-full" />
        <div className="flex items-center gap-2">
          <img className="box-border h-5 rounded-sm" src={countryFlagURL(secondLangCode)} alt={secondLangCode}></img>
          <p className="uppercase">{secondLangCode}</p>
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-400">{`Creator: ${creator.name}`}</p>
    </div>
  );
};

export default SourceHeading;
