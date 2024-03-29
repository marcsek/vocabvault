import ListBox from '@ui/ListBox';
import { useFormik } from 'formik';
import { useContext, useEffect, useRef } from 'react';
import { useGetAvailableWordSources } from '../../../../queries/wordSource';
import { TGetAllWordSourcesOutput } from '../../../WordSources/WordSources.page';
import { useSelectedWords } from '../../context/SelectedWordsContext';
import SessionTypeSelector from '../SessionTypeSelector';
import WordSourceSelector from '../WordSourceSelector/WordSourceSelector';
import { generateAvailableGroupNumbers, generateAvailableNumberOfPairs, generateOutput } from './generators';
import { useNavigate } from 'react-router-dom';
import { TNewSessionProps } from '../../types';
import { ButtonPropsContext } from '@ui/TitleLayout/TitleLayout';
import { motion, useAnimationControls } from 'framer-motion';
import SessionFormDivider from './SessionFormDivider';

const typesOfSession = [
  { id: 'Practice', description: 'Practice aims to make learning words effective by repeating a word until you don\t get it right.' },
  { id: 'Test', description: 'Test can help you get a better picture about your progress.' },
];

export type TSessionTypes = typeof typesOfSession;

const numbersOfRepetition = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

const defaultListBoxValue = { id: '0', name: 'Select wordsource' };
const defaultTranlastionLanguage = { code: '0', languageName: 'None' };
const defaultNumberOfPairs = { id: 5 };
const defaultGroupNumber = { id: 1 };

const NewSessionForm = () => {
  const { data: wordSources } = useGetAvailableWordSources();
  const { setSelectedWords } = useSelectedWords();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { setButtonProps } = useContext(ButtonPropsContext);

  const strippedWordSources = wordSources?.map((e) => ({ id: e.id, name: e.name }));
  const getFullWordSource = (id: string, wordSources?: TGetAllWordSourcesOutput) => wordSources?.find((e) => e.id === id);

  const pageTransitionAnimation = useAnimationControls();

  const formik = useFormik<TNewSessionProps>({
    initialValues: {
      type: typesOfSession[0],
      document: defaultListBoxValue,
      numOfWordPairs: defaultNumberOfPairs,
      availableNumOfWordPairs: [defaultNumberOfPairs],
      groupNumber: defaultGroupNumber,
      availableGroupNumbers: [defaultGroupNumber],
      translationLanguage: defaultTranlastionLanguage,
      allTranslationLanguages: [defaultTranlastionLanguage],
      numOfRepetition: numbersOfRepetition[0],
    },
    onSubmit: (data) => {
      handlePageTransition(data);
    },
  });

  const handlePageTransition = async (data: TNewSessionProps) => {
    await pageTransitionAnimation.start({ backgroundColor: 'rgb(25,25,25)', display: 'flex' });

    const output = generateOutput(data);

    navigate('/session', { state: output });
  };

  useEffect(() => {
    setSelectedWords({
      id: formik.values.document.id,
      languageCode: formik.values.translationLanguage.code,
      pairsInGroup: formik.values.numOfWordPairs.id,
      selectedGroup: formik.values.groupNumber.id,
    });
  }, [formik.values.translationLanguage.code, formik.values.document.id, formik.values.numOfWordPairs.id, formik.values.groupNumber.id]);

  const handleNumOfPairsInGroupChange = (newValue: { id: number }) => {
    formik.setValues((e) => ({
      ...e,
      groupNumber: { id: 1 },
      numOfWordPairs: newValue,
      availableGroupNumbers: generateAvailableGroupNumbers(getFullWordSource(e.document.id, wordSources)?.wordPairsCount ?? 0, newValue.id),
    }));
  };

  const handleWordSourceChange = (newDocument: { id: string; name: string }) => {
    const wordSource = getFullWordSource(newDocument.id, wordSources);

    if (!wordSource) return;

    const allTranslationLanguages = [wordSource.secondLanguage, wordSource.firstLanguage];
    const availableNumOfWordPairs = generateAvailableNumberOfPairs(wordSource.wordPairsCount);
    const availableGroupNumbers = generateAvailableGroupNumbers(wordSource.wordPairsCount, availableNumOfWordPairs[0].id);

    formik.setValues((e) => ({
      ...e,
      document: newDocument,
      numOfWordPairs: availableNumOfWordPairs[0],
      availableNumOfWordPairs,
      translationLanguage: allTranslationLanguages[0],
      groupNumber: { id: 1 },
      allTranslationLanguages,
      availableGroupNumbers,
    }));
  };

  useEffect(() => {
    setButtonProps({ disabled: formik.values.document.id === '0', loading: false, onClick: () => submitButtonRef.current?.click() });
  }, [formik.values.document.id]);

  return (
    <div>
      <motion.div animate={pageTransitionAnimation} className="pointer-events-none fixed inset-0 z-50 hidden" />
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-12">
        <div className="flex flex-col gap-10 xl:flex-row">
          <SessionTypeSelector items={typesOfSession} onChange={(e) => formik.setFieldValue('type', e)} value={formik.values.type} />
          <WordSourceSelector
            onChange={handleWordSourceChange}
            value={formik.values.document}
            items={strippedWordSources ?? []}
            firstLanguageName={getFullWordSource(formik.values.document.id, wordSources)?.firstLanguage.languageName}
            secondLanguageName={getFullWordSource(formik.values.document.id, wordSources)?.secondLanguage.languageName}
            wordPairCount={getFullWordSource(formik.values.document.id, wordSources)?.wordPairsCount}
          />
        </div>
        <SessionFormDivider isUnlocked={formik.values.document.id === '0'} />
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10 md:flex-row">
            <ListBox
              disabled={formik.values.document.id === '0'}
              fieldKey="id"
              fieldValue="id"
              items={formik.values.availableNumOfWordPairs}
              label="Number of pairs in a group"
              tooltipText="How many word pairs are there going to be in each group"
              onChange={handleNumOfPairsInGroupChange}
              value={formik.values.numOfWordPairs}
            />
            <ListBox
              disabled={formik.values.document.id === '0'}
              fieldKey="id"
              fieldValue="id"
              items={formik.values.availableGroupNumbers}
              label="Group number"
              tooltipText="You can select a group by its index, the selected group will show up in 'Selected words' window"
              onChange={(e) => formik.setFieldValue('groupNumber', e)}
              value={formik.values.groupNumber}
            />
          </div>
          <div className="flex flex-col gap-10 md:flex-row">
            <ListBox
              disabled={formik.values.document.id === '0'}
              fieldKey="code"
              fieldValue="languageName"
              items={formik.values.allTranslationLanguages}
              label="Translation language"
              onChange={(e) => formik.setFieldValue('translationLanguage', e)}
              tooltipText="Language you are going to be tranlasting from "
              value={formik.values.translationLanguage}
            />
            <ListBox
              fieldKey="id"
              fieldValue="id"
              disabled={formik.values.type.id === 'Test' || formik.values.document.id === '0'}
              items={numbersOfRepetition}
              label="Number of repetitions"
              tooltipText="# of times you will have get a word correct in order for it not to appear again (Practice mode)"
              onChange={(e) => formik.setFieldValue('numOfRepetition', e)}
              value={formik.values.numOfRepetition}
            />
          </div>
        </div>
        <button className="hidden" ref={submitButtonRef} disabled={!formik.isValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewSessionForm;
