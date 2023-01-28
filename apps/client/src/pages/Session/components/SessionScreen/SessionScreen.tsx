import React, { useState } from 'react';
import useSession from '../../hooks/useSession';
import useSubmitButton from '../../hooks/useSubmitButton';
import SessionAnswerPopup from './SessionAnswerPopup';
import SessionControls from './SessionControls';
import SessionForm from './SessionForm';

interface Props {
  type: 'Practice' | 'Test';
  translationLanguageName: string;
  proofLanguageName: string;
  wordPairs: { value: string; proof: string }[];
  repetitions: number;
  onEnd: () => void;
}

export type TAnswerValidity = { validity: 'VALID' | 'INVALID' | 'UNSET'; message: string };

const SessionScreen = ({ translationLanguageName, proofLanguageName, wordPairs, onEnd, repetitions }: Props) => {
  const [answerValue, setAnswerValue] = useState('');
  const [answerValidity, setAnswerValidity] = useState<TAnswerValidity>({ validity: 'UNSET', message: '' });
  const session = useSession({ handleCorrect, handleIncorrect, handleEnd, wordPairs, repetitions, handleRoundEnd });
  const { submitButton, submitButtonRef, setDisabled } = useSubmitButton({
    validity: answerValidity.validity,
    onIncorrectClick: handleIncorrectClick,
  });
  const [courtain, setCourtain] = useState(false);

  const onSubmit = () => {
    session.handleWordSubmit(answerValue);
    setAnswerValue('');
  };

  function handleCorrect() {
    setAnswerValidity({ validity: 'VALID', message: '' });
    setDisabled(true);
    setTimeout(() => {
      setAnswerValidity({ validity: 'UNSET', message: '' });
      setDisabled(false);
      session.incrementPage();
    }, 1000);
  }

  function handleIncorrect(correct: string) {
    setAnswerValidity({ validity: 'INVALID', message: correct });
  }

  function handleIncorrectClick() {
    setAnswerValidity({ validity: 'UNSET', message: '' });
    session.incrementPage();
  }

  function handleEnd() {
    onEnd();
  }

  function handleRoundEnd() {
    setCourtain(true);
    setTimeout(() => {
      setCourtain(false);
    }, 1000);
    console.log('round end');
  }

  return (
    <div className="flex h-full flex-col items-center justify-between">
      {courtain && <div className="absolute inset-0 z-30 bg-gray-800">Go next</div>}
      <div className="flex w-full flex-col items-center text-sm font-semibold text-gray-400">
        <p>
          Tranlating from {translationLanguageName} to {proofLanguageName}
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-7">
        <SessionForm
          disabled={answerValidity.validity === 'VALID'}
          submitButtonRef={submitButtonRef}
          handleSubmit={onSubmit}
          currentWord={session.currentWord}
          validity={answerValidity.validity}
          answerValue={answerValue}
          setAnswerValue={setAnswerValue}
        />
        <div className="h-14">{answerValidity.validity === 'INVALID' && <SessionAnswerPopup correctAnswer={answerValidity.message} />}</div>
      </div>
      <div className="flex w-full flex-col items-center gap-8">
        <div className="text-sm font-semibold leading-none text-gray-400">ROUND {session.currentRound}</div>
        <SessionControls validity={answerValidity.validity} ControlButton={submitButton} />
      </div>
    </div>
  );
};

export default SessionScreen;
