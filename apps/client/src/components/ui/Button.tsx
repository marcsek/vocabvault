import { cva } from 'class-variance-authority';
import React, { ReactElement } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { IconType } from 'react-icons';
import SpinnerSmall from './utils/SpinnerSmall';
import { PolymorphicProps } from './types';

const buttonStyles = cva(
  'rounded-default disabled:bg-gray-600/25 disabled:text-gray-400 disabled:ring-2 disabled:ring-gray-500 disa disabled:hover:shadow-none disabled:active:scale-100 flex items-center justify-center gap-2 font-semibold duration-100 active:scale-[98%] box-border',
  {
    variants: {
      intent: {
        primary: 'bg-primary-400 hover:bg-primary-500 text-gray-50 hover:shadow-[0px_4px_21px_-4px_#1E40AF]',
        secondary: 'bg-gray-100 hover:bg-gray-50 text-gray-700 hover:shadow-[0px_4px_21px_-4px_#FFFFFF]',
        outlined: 'bg-transparent border border-gray-100 hover:bg-gray-100/5',
        asWrapper: 'bg-transparent hover:bg-gray-100/5 gap-0',
      },
      size: {
        small: 'px-3 py-2 text-sm h-9',
        medium: 'px-4 py-2 text-base h-10',
        asWraper: 'p-none',
      },
    },
    defaultVariants: { intent: 'primary', size: 'small' },
  }
);

export type ButtonProps = {
  loading?: boolean;
  Icon?: ReactElement<IconType>;
  to?: string;
} & VariantProps<typeof buttonStyles>;

const defaultElement = 'button';
const Button = <Element extends React.ElementType = typeof defaultElement>(props: PolymorphicProps<Element, ButtonProps>) => {
  const { as: Component = defaultElement, loading = false, className, intent, size, children, Icon, ...rest } = props;

  return (
    <Component className={`${buttonStyles({ intent, size })} ${className} ${loading ? 'disabled' : ''}`} {...rest}>
      {loading ? (
        <SpinnerSmall />
      ) : (
        <>
          {!!Icon && <p className="text-lg">{Icon}</p>}
          {children ?? 'Button'}
        </>
      )}
    </Component>
  );
};

export default Button;
