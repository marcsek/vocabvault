import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';

interface Props {
  list: { key: string | number; value: string | number }[];
  label: string;
}

const MyListbox = ({ list, label }: Props) => {
  const [selectedPerson, setSelectedPerson] = useState(list[0]);

  return (
    <div className="z-10 w-full">
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className="relative flex flex-col gap-2">
          <Listbox.Label className="text-sm">{label}</Listbox.Label>
          <Listbox.Button className="focus:outline-primary-300 box-border flex justify-between rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-none placeholder-gray-400 outline outline-1 outline-gray-500 duration-75 focus:outline-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:outline-gray-600">
            {selectedPerson.value}
            <HiOutlineChevronDown />
          </Listbox.Button>
          <Listbox.Options className="absolute top-full mt-2 max-h-64 w-full overflow-auto rounded-[4px] bg-gray-800 py-2 outline outline-1 outline-gray-500/50">
            <>
              {list.map((item) => (
                <Listbox.Option className="cursor-default px-3 text-base font-medium" key={item.key} value={item}>
                  {({ selected, active, disabled }) => (
                    <p
                      className={`text-gray-200 ${selected ? '!font-bold !text-gray-50' : ''} ${
                        active ? 'bg-gray-700 !text-gray-50' : ''
                      } ${disabled ? '!text-gray-400' : ''} rounded-default py-2 px-2 duration-100`}
                    >
                      {item.value}
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

export default MyListbox;
