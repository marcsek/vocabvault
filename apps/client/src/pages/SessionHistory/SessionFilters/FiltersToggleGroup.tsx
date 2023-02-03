import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';
import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { AiOutlinePercentage } from 'react-icons/ai';
import { FiType } from 'react-icons/fi';
import Divider from '@ui/Divider';
import { RiHistoryLine } from 'react-icons/ri';
import { THistoryFilters } from '../hooks/useHistoryFilters';

type TOrderFilters = Pick<THistoryFilters, 'reverse' | 'orderBy'>;

interface Props {
  orderFilters: TOrderFilters;
  setOrderFilters: (e: TOrderFilters) => void;
}

const FiltersToggleGroup = ({ orderFilters, setOrderFilters }: Props) => {
  return (
    <label className="flex flex-col gap-2">
      <p className="sr-only text-sm leading-none">Order filters</p>
      <div className="rounded-default flex h-fit items-center gap-2 border border-gray-600 p-1.5 text-gray-400">
        <ToggleGroup.Root
          type="single"
          value={orderFilters.orderBy}
          onValueChange={(value) => {
            if (value) setOrderFilters({ ...orderFilters, orderBy: value as 'time' });
          }}
          className=" flex gap-2"
        >
          <ToggleGroup.Item
            value="time"
            className="radix-state-on:bg-primary-500/30 focus:ring-primary-200/30 radix-state-on:text-primary-200 rounded-default p-1 focus:ring"
          >
            <RiHistoryLine size={22} />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="percentage"
            className="radix-state-on:bg-primary-500/30 focus:ring-primary-200/30 radix-state-on:text-primary-200 rounded-default p-1 focus:ring"
          >
            <AiOutlinePercentage size={22} />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="type"
            className="radix-state-on:bg-primary-500/30 focus:ring-primary-200/30 radix-state-on:text-primary-200 rounded-default p-1 focus:ring"
          >
            <FiType size={22} />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
        <Divider className="h-7 w-0.5" />
        <Toggle.Root
          pressed={orderFilters.reverse}
          onPressedChange={() => setOrderFilters({ ...orderFilters, reverse: !orderFilters.reverse })}
          className="radix-state-on:bg-primary-500/30 focus:ring-primary-200/30 radix-state-on:text-primary-200 rounded-default p-1 focus:ring"
        >
          <CgArrowsExchangeAltV size={22} />
        </Toggle.Root>
      </div>
    </label>
  );
};

export default FiltersToggleGroup;
