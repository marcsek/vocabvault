import React from 'react';
import { Popover } from '@headlessui/react';
import ListBox from '@ui/ListBox';
import { useGetAvailableWordSources } from '../../../queries/wordSource';
import { THistoryFilters } from '../hooks/useHistoryFilters';
import Button from '@ui/Button';
import { BiReset } from 'react-icons/bi';
import { MixerHorizontalIcon } from '@radix-ui/react-icons/';

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
    setFilters((prev) => ({ ...prev, sessionType: undefined, source: undefined }));
  };

  return (
    <Popover className="relative">
      <Popover.Button className="rounded-default h-11 border border-gray-600 bg-gray-800 p-2.5 hover:bg-gray-700">
        {/* <AiOutlineControl size={26} className="text-gray-400" /> */}
        <MixerHorizontalIcon className="h-full w-full text-gray-400" />
        {(currentType.id !== 'All' || currentSource.id !== '0') && (
          <div className="bg-primary-200 absolute top-2 right-2 h-2 w-2 rounded-full" />
        )}
      </Popover.Button>

      <Popover.Panel className="rounded-default absolute z-10 flex -translate-x-3/4 translate-y-2 flex-col gap-4 border border-gray-600 bg-gray-800 p-6 md:translate-x-0">
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
              setFilters((prev) => ({ ...prev, sessionType: valuesToSet }));
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
              setFilters((prev) => ({ ...prev, source: valuesToSet }));
            }}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default FiltersPopover;
