import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Toggle from '@radix-ui/react-toggle';
import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { AiOutlinePercentage } from 'react-icons/ai';
import { FiType } from 'react-icons/fi';
import Divider from '@ui/Divider';
import { RiHistoryLine } from 'react-icons/ri';
import { THistoryFilters } from '../hooks/useHistoryFilters';
import { motion } from 'framer-motion';

type TOrderFilters = Pick<THistoryFilters, 'reverse' | 'orderBy'>;

interface Props {
  orderFilters: TOrderFilters;
  setOrderFilters: (e: TOrderFilters) => void;
}

const FiltersToggleGroup = ({ orderFilters, setOrderFilters }: Props) => {
  return (
    <label className="flex flex-col gap-2">
      <p className="sr-only text-sm leading-none">Order filters</p>
      <div className="rounded-default flex h-fit items-center gap-2 border border-gray-600 p-1.5">
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
            className=" radix-state-on:text-primary-200 rounded-default relative p-1 text-gray-200 duration-200"
          >
            <ToggleButton Icon={<RiHistoryLine size={22} />} active={orderFilters.orderBy === 'time'} />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="percentage"
            className=" radix-state-on:text-primary-200 rounded-default duration:200 relative p-1 text-gray-200"
          >
            <ToggleButton Icon={<AiOutlinePercentage size={22} />} active={orderFilters.orderBy === 'percentage'} />
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="type"
            className=" radix-state-on:text-primary-200 rounded-default duration:200 relative p-1 text-gray-200"
          >
            <ToggleButton Icon={<FiType size={22} />} active={orderFilters.orderBy === 'type'} />
          </ToggleGroup.Item>
        </ToggleGroup.Root>
        <Divider className="h-7 w-0.5" />
        <Toggle.Root
          pressed={orderFilters.reverse}
          onPressedChange={() => setOrderFilters({ ...orderFilters, reverse: !orderFilters.reverse })}
          className=" radix-state-on:text-primary-200 rounded-default relative p-1 text-gray-200 duration-200"
        >
          <ToggleButton Icon={<CgArrowsExchangeAltV size={22} />} active={orderFilters.reverse} />
        </Toggle.Root>
      </div>
    </label>
  );
};

const ToggleButton = ({ active, Icon }: { active: boolean; Icon: React.ReactNode }) => {
  return (
    <>
      <div className="relative z-10">{Icon}</div>
      <motion.div
        animate={{ scale: active ? 1 : 0 }}
        transition={{ type: 'spring', mass: 0.5, velocity: 5 }}
        className="bg-primary-500/30 rounded-default ring-primary-200/30 absolute inset-0 ring-2"
      />
    </>
  );
};

export default FiltersToggleGroup;
