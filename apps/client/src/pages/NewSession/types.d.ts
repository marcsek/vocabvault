import { TLanguageDuo } from 'server/src/schemas/wordSource.schema';

interface TNewSessionProps {
  type: { id: string; description: string };
  document: { id: string; name: string };
  numOfWordPairs: { id: number };
  availableNumOfWordPairs: { id: number }[];
  groupNumber: { id: number };
  availableGroupNumbers: { id: number }[];
  translationLanguage: TLanguageDuo['firstLanguage'];
  allTranslationLanguages: TLanguageDuo['firstLanguage'][];
  numOfRepetition: { id: number };
}
