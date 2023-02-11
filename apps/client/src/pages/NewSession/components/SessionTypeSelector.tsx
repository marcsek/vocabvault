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
      <p className="flex items-center gap-2 text-sm leading-none text-gray-200">
        <SessionDetailInformation
          detail={props.value}
          Image={
            props.value.id === 'Test' ? (
              <img className="scale-150" src={ThinkingIcon}></img>
            ) : (
              <img className="scale-110" src={LevelUpIcon}></img>
            )
          }
        />
      </p>
    </div>
  );
};

interface InformationProps {
  Image: React.ReactNode;
  detail: TSessionType;
}

const SessionDetailInformation = ({ detail, Image }: InformationProps) => {
  return (
    <div className="flex items-center justify-center gap-2 leading-none">
      <div className="bg-primary-500/30 rounded-default flex h-12 w-12 items-center justify-center">{Image}</div>
      <div className="flex flex-col gap-1 leading-none">
        <h3 className="text-sm font-semibold">{detail.id}</h3>
        <p className="text-xs text-gray-400">{detail.description}</p>
      </div>
    </div>
  );
};

export default SessionTypeSelector;
