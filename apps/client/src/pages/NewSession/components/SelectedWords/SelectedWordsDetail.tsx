import { useGetWordSourceWordPairs } from '../../../../queries/wordSource';
import { TSelectedWords } from '../../context/SelectedWordsContext';

export const SelectedWordsDetail = ({ id, languageCode, pairsInGroup, selectedGroup }: NonNullable<TSelectedWords>) => {
  const take = pairsInGroup;
  const skip = (selectedGroup - 1) * take;
  const { data: wordPairs } = useGetWordSourceWordPairs(id, { takeSkip: { skip, take } });

  return (
    <div className="flex flex-grow flex-wrap gap-2 self-start p-4">
      {wordPairs?.wordPairs.map((e, idx) => (
        <div className="flex min-w-max items-center gap-2" key={e.id}>
          <p className="text-gray-200">{wordPairs.firstLanguage.code === languageCode ? e.firstValue : e.secondValue}</p>
          {idx < wordPairs?.wordPairs.length - 1 && <div className="flex items-center justify-center text-xl text-gray-500">•</div>}
        </div>
      ))}
    </div>
  );
};
