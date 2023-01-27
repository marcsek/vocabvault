import { TLanguageDuo } from 'server/src/schemas/wordSource.schema';

interface TNewSessionProps {
  type: { id: string; description: string };
  document: { id: string; name: string };
  numOfWordPairs: { id: string };
  availableNumOfWordPairs: { id: string }[];
  groupNumber: { id: string };
  availableGroupNumbers: { id: string }[];
  translationLanguage: TLanguageDuo['firstLanguage'];
  allTranslationLanguages: TLanguageDuo['firstLanguage'][];
  numOfRepetition: { id: string };
}
