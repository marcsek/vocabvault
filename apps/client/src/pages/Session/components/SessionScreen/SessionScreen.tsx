import React, { useState } from 'react';
import useSession from '../../hooks/useSession';
import useSubmitButton from '../../hooks/useSubmitButton';
import SessionAnswerPopup from './SessionAnswerPopup';
import SessionBar from './SessionBar';
import SessionControls from './SessionControls';
import SessionCourtain from './SessionCourtain';
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
  const [courtain, setCourtain] = useState(false);
  const session = useSession({ handleCorrect, handleIncorrect, handleEnd, handleRoundEnd, wordPairs, repetitions });
  const { submitButton, submitButtonRef, setSubmitDisabled } = useSubmitButton({
    validity: answerValidity.validity,
    onIncorrectClick: handleIncorrectClick,
  });

  const onSubmit = () => {
    session.handleWordSubmit(answerValue);
    setAnswerValue('');
  };

  function handleCorrect() {
    setAnswerValidity({ validity: 'VALID', message: '' });
    setSubmitDisabled(true);
    setTimeout(() => {
      setAnswerValidity({ validity: 'UNSET', message: '' });
      setSubmitDisabled(false);
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
    }, 3500);
  }

  return (
    <div className="flex h-full flex-col items-center justify-between pt-7">
      {courtain && <SessionCourtain />}
      <div className="max-w-8xl flex w-full flex-col items-center gap-5 text-sm font-semibold text-gray-400">
        <SessionBar history={session.history} repetitions={repetitions} />
        <p>
          Tranlating from {translationLanguageName} to {proofLanguageName}
        </p>
      </div>
      <div className="absolute top-40 flex w-full flex-col items-center justify-center gap-7 md:relative md:top-0">
        <SessionForm
          disabled={answerValidity.validity !== 'UNSET' || courtain}
          submitButtonRef={submitButtonRef}
          handleSubmit={onSubmit}
          currentWord={session.currentWord}
          validity={answerValidity.validity}
          answerValue={answerValue}
          setAnswerValue={setAnswerValue}
        />
        <div className="h-14">{answerValidity.validity === 'INVALID' && <SessionAnswerPopup correctAnswer={answerValidity.message} />}</div>
      </div>
      <div className="flex w-full flex-col items-center gap-8 self-end">
        <div className="text-sm font-semibold leading-none text-gray-400">ROUND {session.currentRound}</div>
        <SessionControls validity={answerValidity.validity} ControlButton={submitButton} />
      </div>
    </div>
  );
};

export default SessionScreen;
