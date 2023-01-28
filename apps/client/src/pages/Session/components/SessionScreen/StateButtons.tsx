import Button from '@ui/Button';
import React from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';

interface SessionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const NeutralButton = ({ onClick, disabled }: SessionButtonProps) => {
  return (
    <Button disabled={disabled} className="w-full" size="medium" onClick={onClick} Icon={<RxMagnifyingGlass size={20} />}>
      Check
    </Button>
  );
};

export const IncorrectButton = React.forwardRef<HTMLButtonElement, SessionButtonProps>(({ onClick }, ref) => {
  return (
    <Button size="medium" intent="warning" className="w-full" onClick={onClick} ref={ref}>
      Continue
    </Button>
  );
});
