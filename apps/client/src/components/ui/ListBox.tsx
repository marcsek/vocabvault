import { Listbox } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';

export type TListBoxInput = { [key: string]: string | number };

export interface ListBoxProps<T, TKey> {
  disabled?: boolean;
  items: T[];
  label: string;
  name?: string;
  value: T;
  onChange: (value: T) => void;
  fieldKey: TKey;
  fieldValue: TKey;
  disabledKeys?: (string | number)[];
}

const ListBox = <T extends TListBoxInput, TKey extends keyof T>({
  items,
  label,
  value,
  fieldKey,
  fieldValue,
  disabledKeys,
  ...props
}: ListBoxProps<T, TKey>) => {
  return (
    <div className="h-fit w-full">
      <Listbox value={value} {...props}>
        {({ open }) => (
          <div className="relative flex flex-col gap-2">
            <Listbox.Label className="text-sm text-gray-50">{label}</Listbox.Label>
            <Listbox.Button className="focus:outline-primary-300 box-border flex cursor-default justify-between rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-5 outline outline-1 outline-gray-500 duration-75 focus:outline-2 disabled:bg-gray-800 disabled:text-gray-400 disabled:outline-gray-600">
              {value[fieldValue]}
              <HiChevronUpDown size={20} />
            </Listbox.Button>
            <AnimatePresence>
              {open && (
                <Listbox.Options
                  style={{ maxHeight: '256px' }}
                  as={motion.ul}
                  initial={{ height: 0, marginTop: '0rem' }}
                  animate={{ height: 'auto', marginTop: '1rem' }}
                  exit={{ height: 0, marginTop: '0.5rem', transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  static
                  className={`absolute top-full z-10 mt-2 box-border w-full rounded-[4px] bg-gray-800 outline outline-1 outline-gray-500/50 ${
                    items.length > 6 ? 'overflow-auto' : 'overflow-hidden'
                  }`}
                >
                  <div>
                    {items.map((item) => (
                      <Listbox.Option
                        className="box-border cursor-default px-3 text-base font-medium first:pt-2 last:pb-2"
                        key={item[fieldKey]}
                        value={item}
                        disabled={disabledKeys?.includes(item[fieldKey])}
                      >
                        {({ selected, active, disabled }) => (
                          <p
                            className={`text-gray-200 ${selected ? '!font-bold !text-gray-50' : ''} ${
                              active ? 'bg-gray-700 !text-gray-50' : ''
                            } ${disabled ? '!text-gray-400' : ''}
                          rounded-default box-border py-2 px-2 duration-100`}
                          >
                            {item[fieldValue]}
                          </p>
                        )}
                      </Listbox.Option>
                    ))}
                  </div>
                </Listbox.Options>
              )}
            </AnimatePresence>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default ListBox;
