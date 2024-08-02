import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import ListBox from '@ui/ListBox';
import { useGetAvailableWordSources } from '../../../queries/wordSource';
import { THistoryFilters } from '../hooks/useHistoryFilters';
import Button from '@ui/Button';
import { BiReset } from 'react-icons/bi';
import { MixerHorizontalIcon } from '@radix-ui/react-icons/';
import { motion, AnimatePresence } from 'framer-motion';

const sessionType = [{ id: 'Test' }, { id: 'Practice' }, { id: 'All' }];
const defaultSource = { id: '0', name: 'All' };

interface Props {
  filters: THistoryFilters;
  setFilters: React.Dispatch<React.SetStateAction<THistoryFilters>>;
}

const FiltersPopover = ({ setFilters, filters }: Props) => {
  const { data: wordSources } = useGetAvailableWordSources();
  const parsedSources = [...(wordSources?.map((e) => ({ id: e.id, name: e.name })) ?? []), defaultSource];

  const currentSource = filters.source ? filters.source : defaultSource;
  const currentType = filters.sessionType ? { id: filters.sessionType } : { id: 'All' };

  const resetFilters = () => {
    setFilters((prev) => ({ ...prev, sessionType: undefined, source: undefined, page: 0 }));
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="rounded-default h-11 border border-gray-600 bg-gray-800 p-2.5 hover:bg-gray-700">
            <MixerHorizontalIcon className="h-full w-full text-gray-200" />
            <AnimatePresence>
              {(currentType.id !== 'All' || currentSource.id !== '0') && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="bg-primary-200 absolute right-2 top-2 h-2 w-2 rounded-full"
                />
              )}
            </AnimatePresence>
          </PopoverButton>
          <AnimatePresence>
            {open && (
              <PopoverPanel
                as={motion.div}
                static
                style={{ translateX: '-50%', left: 0, top: '120%' }}
                className="rounded-default absolute z-10 flex translate-y-2 flex-col gap-4 border border-gray-600 bg-gray-800 p-6"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Advanced filters</p>
                  <Button
                    intent="asWrapper"
                    className="bg-primary-500/30 hover:bg-primary-500/50 text-primary-200 h-fit !rounded-full !p-2"
                    onClick={resetFilters}
                  >
                    <BiReset size={20} />
                  </Button>
                </div>

                <div className="flex w-48 grid-cols-2 flex-col gap-4 md:w-80">
                  <ListBox
                    items={sessionType}
                    fieldKey="id"
                    fieldValue="id"
                    label="Session type"
                    value={currentType}
                    onChange={(e) => {
                      const valuesToSet = e.id !== 'All' ? e.id : undefined;
                      setFilters((prev) => ({ ...prev, sessionType: valuesToSet, page: 0 }));
                    }}
                  />
                  <ListBox
                    items={parsedSources}
                    fieldKey="id"
                    fieldValue="name"
                    label="Word source"
                    value={currentSource}
                    onChange={(e) => {
                      const valuesToSet = e.id !== '0' ? e : undefined;
                      setFilters((prev) => ({ ...prev, source: valuesToSet, page: 0 }));
                    }}
                  />
                </div>
              </PopoverPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
};

export default FiltersPopover;
