import ListBox from '@ui/ListBox';
import React from 'react';
import ThinkingIcon from '../../../assets/Icons/ThinkingIcon.svg';

type TSessionType = { id: string; description: string };

interface Props {
  items: TSessionType[];
  value: TSessionType;
  onChange: (e: TSessionType) => void;
}

const SessionTypeSelector = (props: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <ListBox {...props} fieldKey="id" fieldValue="id" label="Type of session" />
      <p className="flex items-center gap-2 text-sm leading-none text-gray-200">
        {/* <RxInfoCircled size={16} /> */}
        {/* {props.value.description} */}
        <SessionDetailInformation />
      </p>
    </div>
  );
};

const SessionDetailInformation = () => {
  return (
    <div className="flex items-center justify-center gap-2 leading-none">
      <div className="bg-primary-500/30 rounded-default flex h-12 w-12 items-center justify-center">
        <img className="scale-150" src={ThinkingIcon}></img>
      </div>
      <div className="flex flex-col gap-1">
        <h3>Test</h3>
        <p>Test your knowledge.</p>
      </div>
    </div>
  );
};

export default SessionTypeSelector;
