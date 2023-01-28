import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetWordSourceWordPairs } from '../../queries/wordSource';
import { TNewSessionOutput } from '../NewSession/components/NewSessionForm/generators';
import SessionScreen from './components/SessionScreen/SessionScreen';

const Session = () => {
  const location = useLocation();
  const sessionState = location.state as TNewSessionOutput;
  //TODO: navigatnut prec ked nemam state
  const take = sessionState.pairsInNumber;
  const skip = (sessionState.groupNumber - 1) * take;
  const { data: wordPairs, isLoading } = useGetWordSourceWordPairs(sessionState.documentId, { takeSkip: { skip, take } });

  const transferedWordPairs = wordPairs?.wordPairs.map((e) => ({
    value: wordPairs.firstLanguage.code === sessionState.translationLanguage.code ? e.firstValue : e.secondValue,
    proof: wordPairs.firstLanguage.code === sessionState.translationLanguage.code ? e.secondValue : e.firstValue,
  }));

  const [isEnd, setIsEnd] = useState(false);

  if (!sessionState) return <div>No state found.</div>;

  console.log(sessionState);

  return (
    <div className="!max-w-none !p-0">
      {isEnd ? (
        <div>End</div>
      ) : (
        <>
          {!isLoading && (
            <SessionScreen
              repetitions={sessionState.repetitions}
              onEnd={() => setIsEnd(true)}
              wordPairs={transferedWordPairs ?? []}
              type={sessionState.type}
              proofLanguageName={sessionState.proofLanguage.languageName}
              translationLanguageName={sessionState.translationLanguage.languageName}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Session;
