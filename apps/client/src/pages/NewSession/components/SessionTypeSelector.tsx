import ListBox from '@ui/ListBox';
import React from 'react';
import ThinkingIcon from '../../../assets/Icons/ThinkingIcon.svg';
import LevelUpIcon from '../../../assets/Icons/LevelUpIcon.svg';

type TSessionType = { id: string; description: string };

interface Props {
  items: TSessionType[];
  value: TSessionType;
  onChange: (e: TSessionType) => void;
}

const SessionTypeSelector = (props: Props) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <ListBox {...props} fieldKey="id" fieldValue="id" label="Type of session" />
      <div className="flex items-center gap-2 text-sm leading-none text-gray-200">
        <SessionDetailInformation
          detail={props.value}
          Image={
            props.value.id === 'Test' ? (
              <img className="scale-[1.6]" src={ThinkingIcon}></img>
            ) : (
              <img className="scale-[1.2]" src={LevelUpIcon}></img>
            )
          }
        />
      </div>
    </div>
  );
};

interface InformationProps {
  Image: React.ReactNode;
  detail: TSessionType;
}
//bg-[conic-gradient(var(--tw-gradient-stops))] from-sky-700 via-emerald-500 to-pink-800
//bg-[conic-gradient(from 315deg, #FFD607, #FFFFFF)]
const SessionDetailInformation = ({ detail, Image }: InformationProps) => {
  return (
    <div className="flex max-h-12 items-center justify-center gap-2 leading-none">
      <div className="rounded-default relative flex h-14 w-14 items-center justify-center overflow-hidden">
        <div className="from-primary-300 animate-spin-slow absolute -inset-3 bg-[conic-gradient(var(--tw-gradient-stops))] via-gray-800"></div>
        <div className="rounded-default absolute inset-0.5 bg-[#1A2446]"></div>
        <div className="absolute">{Image}</div>
      </div>
      <div className="flex flex-col gap-1 leading-none">
        <h3 className="text-sm font-semibold">{detail.id}</h3>
        <p className="max-w-[20rem] text-xs text-gray-400">{detail.description}</p>
      </div>
    </div>
  );
};

export default SessionTypeSelector;
