import { Listbox } from '@headlessui/react';
import React from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

export type TListBoxInput = { [key: string]: string };

export interface ListBoxProps<T> {
  items: T[];
  label: string;
  name?: string;
  value: T;
  onChange: (value: T) => void;
  fieldKey: string;
  fieldValue: string;
  disabledKeys?: string[] | string;
}

const ListBox = <T extends TListBoxInput>({ items, label, value, onChange, fieldKey, fieldValue, disabledKeys, name }: ListBoxProps<T>) => {
  return (
    <div className="w-full">
      <Listbox value={value} onChange={onChange} name={name}>
        <div className="relative flex flex-col gap-2">
          <Listbox.Label className="text-sm text-gray-50">{label}</Listbox.Label>
          <Listbox.Button className="focus:outline-primary-300 box-border flex cursor-default justify-between rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-5 outline outline-1 outline-gray-500 duration-75 focus:outline-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:outline-gray-600">
            {value[fieldValue]}
            <HiOutlineChevronDown />
          </Listbox.Button>
          <Listbox.Options className="absolute top-full z-10 mt-2 max-h-64 w-full overflow-auto rounded-[4px] bg-gray-800 py-2 outline outline-1 outline-gray-500/50">
            <>
              {items.map((item) => (
                <Listbox.Option
                  className="cursor-default px-3 text-base font-medium"
                  key={item[fieldKey]}
                  value={item}
                  disabled={disabledKeys?.includes(item[fieldKey])}
                >
                  {({ selected, active, disabled }) => (
                    <p
                      className={`text-gray-200 ${selected ? '!font-bold !text-gray-50' : ''} ${
                        active ? 'bg-gray-700 !text-gray-50' : ''
                      } ${disabled ? '!text-gray-400' : ''} rounded-default py-2 px-2 duration-100`}
                    >
                      {item[fieldValue]}
                    </p>
                  )}
                </Listbox.Option>
              ))}
            </>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default ListBox;
