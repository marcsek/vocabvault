import Button from '@ui/Button';
import React from 'react';

interface SessionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const NeutralButton = ({ onClick, disabled }: SessionButtonProps) => {
  return (
    <Button disabled={disabled} size="medium" onClick={onClick}>
      Check my answer
    </Button>
  );
};

export const IncorrectButton = React.forwardRef<HTMLButtonElement, SessionButtonProps>(({ onClick }, ref) => {
  return (
    <Button size="medium" intent="warning" onClick={onClick} ref={ref}>
      Continue
    </Button>
  );
});
