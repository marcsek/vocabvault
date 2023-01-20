import React, { ReactElement } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { IconType } from 'react-icons';

const textFieldStyles = cva(
  'w-full rounded-[4px] bg-gray-800 px-3 py-2.5 text-base font-medium leading-5 outline outline-1 duration-75 focus:outline-2 disabled:bg-gray-700 disabled:text-gray-400 disabled:outline-gray-600 placeholder-gray-400',
  {
    variants: {
      state: {
        error: 'focus:outline-error-200 outline-error-200',
        default: 'focus:outline-primary-300 outline-gray-500',
      },
    },
    defaultVariants: { state: 'default' },
  }
);

interface Props
  extends VariantProps<typeof textFieldStyles>,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  helperText?: string;
  labelText: string;
  Icon?: ReactElement<IconType>;
  IconLeft?: ReactElement<IconType>;
  handleIconClick?: () => void;
}

const TextField = ({ helperText, labelText, className, state, Icon, IconLeft, handleIconClick, ...props }: Props) => {
  return (
    <div className="relative -z-0 flex w-full flex-col gap-2 text-gray-50">
      <label className="w-full">
        <p className="mb-2 text-sm font-medium">{labelText}</p>
        <input className={`${className} ${textFieldStyles({ state })} ${!!Icon ? 'pr-9' : !!IconLeft ? 'pl-9' : ''}`} {...props}></input>
      </label>
      <>
        <div className="absolute top-[39px] left-3 text-lg">{IconLeft}</div>
        {!!Icon && (
          <button
            id="show-password"
            type="button"
            role="switch"
            aria-pressed="false"
            onClick={handleIconClick}
            className="absolute top-[34px] right-3 rounded-full p-1 text-lg text-gray-300 ring-gray-700 focus:ring"
          >
            {Icon}
          </button>
        )}
        {!!helperText && (
          <span className={`text-xs font-medium ${state === 'error' ? 'text-error-200' : 'text-gray-400'}`}>{helperText}</span>
        )}
      </>
    </div>
  );
};

export default TextField;
