import { ButtonProps } from '@ui/Button';
import React, { useEffect, useRef, useState } from 'react';
import { TAnswerValidity } from '../components/SessionScreen/SessionScreen';
import { IncorrectButton, NeutralButton } from '../components/SessionScreen/StateButtons';

interface Props extends Pick<TAnswerValidity, 'validity'> {
  onIncorrectClick: () => void;
}

const useSubmitButton = ({ onIncorrectClick, validity: valid }: Props) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const focusRef = useRef<HTMLButtonElement>(null);
  const [submitButton, setSubmitButton] = useState<React.ReactElement<ButtonProps>>(<NeutralButton />);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (valid === 'INVALID') {
      setSubmitButton(<IncorrectButton ref={focusRef} onClick={onIncorrectClick} />);
    } else {
      setSubmitButton(<NeutralButton disabled={disabled} onClick={() => submitButtonRef.current?.click()} />);
    }
  }, [valid]);

  useEffect(() => {
    focusRef.current?.focus();
  }, [submitButton]);

  return { submitButton, submitButtonRef, setSubmitDisabled: setDisabled };
};

export default useSubmitButton;
