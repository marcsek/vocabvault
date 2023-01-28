import { useState } from 'react';
import { useGetWordSourceWordPairs } from '../../../queries/wordSource';
import { TNewSessionOutput } from '../../NewSession/components/NewSessionForm/generators';
import SessionScreen from './SessionScreen/SessionScreen';

interface Props {
  take: number;
  skip: number;
  sessionState: TNewSessionOutput;
}

const SessionProvider = ({ sessionState, skip, take }: Props) => {
  const [isEnd, setIsEnd] = useState(false);

  const { data: wordPairs, isLoading } = useGetWordSourceWordPairs(sessionState.documentId, { takeSkip: { skip, take } });
  const isFirstLangPrimary = wordPairs?.firstLanguage.code === sessionState.translationLanguage.code;

  const transferedWordPairs = wordPairs?.wordPairs.map((e) => ({
    value: isFirstLangPrimary ? e.firstValue : e.secondValue,
    proof: isFirstLangPrimary ? e.secondValue : e.firstValue,
  }));

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

export default SessionProvider;
