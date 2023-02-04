import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession, { THistoryMap } from '../../hooks/useSession';
import useSubmitButton from '../../hooks/useSubmitButton';
import useTimeSnapshot from '../../hooks/useTimeSnapshot';
import presentSessionStatistics from '../../postSessionPresenter';
import SessionAnswerPopup from './SessionAnswerPopup';
import SessionBar from './SessionBar';
import SessionControls from './SessionControls';
import SessionCourtain from './SessionCourtain';
import SessionForm from './SessionForm';
import SessionScoreBoard from './SessionScoreBoard';
import { AnimatePresence } from 'framer-motion';

interface Props {
  type: 'Practice' | 'Test';
  translationLanguageName: string;
  proofLanguageName: string;
  wordPairs: { value: string; proof: string }[];
  repetitions: number;
  wordSourceId: string;
}

export type TAnswerValidity = { validity: 'VALID' | 'INVALID' | 'UNSET'; message: string };

const SessionScreen = ({ translationLanguageName, proofLanguageName, wordPairs, repetitions, type, wordSourceId }: Props) => {
  const [answerValue, setAnswerValue] = useState('');
  const [answerValidity, setAnswerValidity] = useState<TAnswerValidity>({ validity: 'UNSET', message: '' });
  const [courtain, setCourtain] = useState(false);
  const finishSnapshot = useTimeSnapshot();
  const session = useSession({ handleCorrect, handleIncorrect, handleEnd, handleRoundEnd, wordPairs, repetitions, type });
  const { submitButton, submitButtonRef, setSubmitDisabled } = useSubmitButton({
    validity: answerValidity.validity,
    onIncorrectClick: handleIncorrectClick,
    type,
  });
  const navigate = useNavigate();

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
    if (type === 'Test') {
      setSubmitDisabled(true);
      setTimeout(() => {
        setAnswerValidity({ validity: 'UNSET', message: '' });
        setSubmitDisabled(false);
        session.incrementPage();
      }, 1000);
    }
  }

  function handleIncorrectClick() {
    setAnswerValidity({ validity: 'UNSET', message: '' });
    session.incrementPage();
  }

  function handleEnd(history: THistoryMap) {
    const startEndTime = finishSnapshot();

    navigate('/session-stats', {
      state: presentSessionStatistics({ history, startEndTime, type, wordPairs, wordSourceId }),
      replace: true,
    });
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
        <SessionBar history={session.history} repetitions={repetitions} type={type} />
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
          proofLanguageName={proofLanguageName}
        />
        <div className="h-14">
          <AnimatePresence>
            {type !== 'Test' && answerValidity.validity === 'INVALID' && <SessionAnswerPopup correctAnswer={answerValidity.message} />}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-8 self-end">
        {type === 'Test' ? (
          <SessionScoreBoard history={session.history} />
        ) : (
          <div className="text-sm font-semibold leading-none text-gray-400">ROUND {session.currentRound}</div>
        )}
        <SessionControls validity={answerValidity.validity} ControlButton={submitButton} />
      </div>
    </div>
  );
};

export default SessionScreen;
