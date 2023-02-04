import TextArea from '@ui/TextArea';
import React, { useEffect, useRef } from 'react';
import { TAnswerValidity } from './SessionScreen';

interface Props extends Pick<TAnswerValidity, 'validity'> {
  handleSubmit: () => void;
  proofLanguageName: string;
  currentWord: string;
  answerValue: string;
  setAnswerValue: React.Dispatch<React.SetStateAction<string>>;
  submitButtonRef: React.RefObject<HTMLButtonElement>;
  disabled: boolean;
}

const SessionForm = ({
  handleSubmit,
  validity,
  currentWord,
  answerValue,
  setAnswerValue,
  submitButtonRef,
  disabled,
  proofLanguageName,
}: Props) => {
  const focusRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  useEffect(() => {
    if (!disabled) focusRef.current?.focus();
  }, [disabled]);

  const submitOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col items-center gap-10 px-9">
      <h1
        className={`text-center text-5xl font-bold leading-none duration-200 md:text-6xl ${
          validity === 'VALID' ? 'text-success-200' : validity === 'INVALID' ? 'text-error-200' : 'text-gray-50'
        }`}
      >
        {currentWord}
      </h1>
      <div className="flex w-full max-w-[26rem] flex-col">
        <p className="self-center text-sm leading-none text-gray-500">Type in {proofLanguageName}</p>
        <TextArea
          disabled={disabled}
          type="text"
          ref={focusRef}
          labelText=""
          value={answerValue}
          onKeyDown={submitOnEnter}
          onChange={(e) => setAnswerValue(e.target.value)}
        />
      </div>
      <button type="submit" className="hidden" ref={submitButtonRef}></button>
    </form>
  );
};

export default SessionForm;
