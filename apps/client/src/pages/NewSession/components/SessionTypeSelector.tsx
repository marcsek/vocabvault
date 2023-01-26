import ListBox from '@ui/ListBox';
import React from 'react';
import { RxInfoCircled } from 'react-icons/rx';

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
        <RxInfoCircled size={16} />
        {props.value.description}
      </p>
    </div>
  );
};

export default SessionTypeSelector;
