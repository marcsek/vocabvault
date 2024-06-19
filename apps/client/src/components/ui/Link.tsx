import React from 'react';
import { IconType } from 'react-icons';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export type TUiLinkProps = {
  children?: React.ReactNode;
  to: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  hoverEffect?: boolean;
  Icon?: React.ReactElement<IconType>;
  ariaLabel?: string;
};

const Link = React.forwardRef<HTMLAnchorElement, TUiLinkProps>(
  ({ Icon, className, active, hoverEffect, ariaLabel, children, ...props }, ref) => {
    return (
      <RouterLink
        aria-label={ariaLabel}
        ref={ref}
        {...props}
        className={`${className} rounded-default relative box-border flex items-center gap-2 text-base font-bold leading-none text-gray-100 duration-200 lg:text-sm ${
          hoverEffect ? 'hover:bg-gray-700 hover:text-gray-50' : 'hover:text-gray-400'
        }`}
      >
        {Icon}
        {children}
        <AnimatePresence>
          {active && (
            <motion.div
              transition={{ duration: 0.5, type: 'spring' }}
              layoutId="underline"
              className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full lg:left-1/2 lg:top-full lg:h-1 lg:translate-y-0"
            >
              <motion.div
                initial={{ scale: 0, translateX: '-50%' }}
                animate={{ scale: 1, translateX: '-50%' }}
                exit={{ scale: 0 }}
                className="bg-primary-300 h-full w-full -translate-x-1/2 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </RouterLink>
    );
  }
);

export default Link;
