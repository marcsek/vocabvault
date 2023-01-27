import TextField from '@ui/TextField';
import React, { useState } from 'react';
import useSession from '../../hooks/useSession';

interface Props {
  type: 'Practice' | 'Test';
  translationLanguageName: string;
  proofLanguageName: string;
  wordPairs: { value: string; proof: string }[];
  repetitions: number;
  onEnd: () => void;
}

const SessionScreen = ({ translationLanguageName, proofLanguageName, wordPairs, onEnd, repetitions }: Props) => {
  const session = useSession({ handleCorrect, handleIncorrect, handleEnd, wordPairs, repetitions });
  const [answerValues, setAnswerValue] = useState('');
  const [correctAnswerPopup, setCorrectAnswerPopup] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    session.handleWordSubmit(answerValues);
    setAnswerValue('');
  };

  function handleCorrect() {
    session.incrementPage();
  }

  function handleIncorrect(correct: string) {
    setCorrectAnswerPopup(correct);
    setTimeout(() => {
      setCorrectAnswerPopup('');
      session.incrementPage();
    }, 1000);
  }

  function handleEnd() {
    onEnd();
  }

  return (
    <div>
      <p>
        Tranlating from {translationLanguageName} to {proofLanguageName}
      </p>
      <form onSubmit={onSubmit}>
        <h1>{session.currentWord}</h1>
        <TextField labelText="" value={answerValues} onChange={(e) => setAnswerValue(e.target.value)} />
      </form>
      <div>{session.currentRound}</div>
      {[...session.history.values()].map((e) => (
        <div key={Math.random()}>
          all:{e.tries} correct:{e.correctTries}
        </div>
      ))}
      {correctAnswerPopup && <div>{correctAnswerPopup}</div>}
    </div>
  );
};

export default SessionScreen;
