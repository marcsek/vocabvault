import { cva } from 'class-variance-authority';
import React, { ReactElement } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { FiAperture } from 'react-icons/fi';
import { IconType } from 'react-icons';

const buttonStyles = cva('rounded-default flex items-center justify-center gap-2 font-semibold duration-100 active:scale-[98%] h-fit', {
  variants: {
    intent: {
      primary: 'bg-primary-400 hover:bg-primary-500 text-gray-50 hover:shadow-[0px_4px_21px_-4px_#1E40AF]',
      secondary: 'bg-gray-100 hover:bg-gray-50 text-gray-700 hover:shadow-[0px_4px_21px_-4px_#FFFFFF]',
      outlined: 'bg-transparent outline outline-1 outline-gray-100 hover:bg-gray-100/5 hover:outline-2 box-border',
    },
    size: {
      small: 'px-3 py-2 text-sm',
      medium: 'px-4 py-2 text-base ',
    },
  },
  defaultVariants: { intent: 'primary', size: 'small' },
});

interface Props
  extends VariantProps<typeof buttonStyles>,
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  loading?: boolean;
  Icon?: ReactElement<IconType>;
}

export const Button = ({ loading = false, intent, size, className, Icon, children, ...props }: Props) => {
  return (
    <button className={`${className} ${buttonStyles({ intent, size })}`} {...props}>
      {loading ? (
        <div></div>
      ) : (
        <>
          <p className="text-lg">{Icon}</p>
          <p>{children ?? 'Button'}</p>
        </>
      )}
    </button>
  );
};
