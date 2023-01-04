import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

const MyListbox = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className="w-64">
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className="flex flex-col gap-2">
          <Listbox.Button className="focus:outline-primary-300 flex w-64 justify-between rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-none placeholder-gray-400 outline outline-1 outline-gray-500 duration-75 focus:outline-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:outline-gray-600">
            {selectedPerson.name}
            <HiOutlineChevronDown />
          </Listbox.Button>
          <Listbox.Options className="rounded-[4px] bg-gray-800 py-2 outline outline-1 outline-gray-500/50">
            <>
              {people.map((person) => (
                <Listbox.Option
                  className="cursor-default text-base font-medium"
                  key={person.id}
                  value={person}
                  disabled={person.unavailable}
                >
                  {({ selected, active, disabled }) => (
                    <p
                      className={`${selected ? 'font-bold' : ''} ${active ? 'bg-gray-700' : ''} ${
                        disabled ? 'text-gray-400' : ''
                      } px-4 py-2`}
                    >
                      {person.name}
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
