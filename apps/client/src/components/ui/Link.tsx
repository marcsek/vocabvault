import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
  to: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
};

export const Link = React.forwardRef<HTMLAnchorElement, Props>(({ className, active, children, to, onClick, ...props }, ref) => {
  return (
    <RouterLink
      ref={ref}
      to={to}
      onClick={onClick}
      {...props}
      className={`${className} box-border flex items-center text-base font-bold leading-none text-gray-100 duration-200 hover:text-gray-400 lg:text-sm`}
    >
      {children}
    </RouterLink>
  );
});
