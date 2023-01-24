import Divider from '@ui/Divider';
import ListBox from '@ui/ListBox';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useGetAvailableWordSources } from '../../../../queries/wordSource';
import SessionDetailBox from '../SessionDetailBox';

const typesOfSession = [
  { id: '1', name: 'Practice' },
  { id: '2', name: 'Test' },
];

const numbersOfRepetition = [{ id: '2' }, { id: '3' }, { id: '4' }];

const defaultListBoxValue = { id: '0', name: 'Select wordsource' };
const defaultTranlastionLanguage = { code: 'd', languageName: 'kazachstan' };

const NewSessionForm = () => {
  //TODO: toto pravdepodobne robit tak, ze budem pozorovat zmenu idcka, vsetko musi mat default,
  // ak nie je selectnuty source, tak ostatne disablnut, veci ktore sa pocitaju podla word sourcu asi musia mat vlastny state
  const { data: wordSources } = useGetAvailableWordSources();
  const strippedWordSource = wordSources?.map((e) => {
    return {
      id: e.id,
      name: e.name,
    };
  });
  const findWordSource = (id: string) => wordSources?.find((e) => e.id === id);

  const formik = useFormik({
    initialValues: {
      type: typesOfSession[0],
      document: defaultListBoxValue,
      numOfPairs: 10,
      groupNumber: 1,
      translationLanguage: defaultTranlastionLanguage,
      numOfRepetition: numbersOfRepetition[0],
    },
    onSubmit: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    // if (formik.values.document.id === '0') {
    //   formik.setValues((e) => {
    //     return { ...e, translationLanguage: defaultTranlastionLanguage };
    //   });
    // }
    formik.setValues((e) => {
      return { ...e, translationLanguage: findWordSource(formik.values.document.id)?.firstLanguage ?? defaultTranlastionLanguage };
    });
  }, [formik.values.document.id]);

  return (
    <div>
      <div className="flex flex-col gap-12">
        <div className="flex gap-10">
          <ListBox
            fieldKey="id"
            fieldValue="name"
            items={typesOfSession}
            label="Type of session"
            onChange={(e) => formik.setFieldValue('type', e)}
            value={formik.values.type}
          />
          <div className="flex w-full flex-col gap-4">
            <ListBox
              fieldKey="id"
              fieldValue="name"
              items={strippedWordSource ?? []}
              label="Select wordsource"
              onChange={(e) => formik.setFieldValue('document', e)}
              value={formik.values.document}
            />
            <SessionDetailBox
              firstLanguageName={findWordSource(formik.values.document.id)?.firstLanguage.languageName}
              secondLanguageName={findWordSource(formik.values.document.id)?.secondLanguage.languageName}
              wordPairCount={findWordSource(formik.values.document.id)?.wordPairsCount}
            />
          </div>
        </div>
        <Divider className="w-full outline-dashed outline-1 outline-gray-500" />
        <div className="flex flex-col gap-10">
          <div className="flex gap-10">
            <ListBox
              fieldKey="id"
              fieldValue="name"
              items={typesOfSession}
              label="Type of session"
              onChange={(e) => formik.setFieldValue('type', e)}
              value={formik.values.type}
            />
            <ListBox
              fieldKey="id"
              fieldValue="name"
              items={typesOfSession}
              label="Type of session"
              onChange={(e) => formik.setFieldValue('type', e)}
              value={formik.values.type}
            />
          </div>
          <div className="flex gap-10">
            <ListBox
              fieldKey="id"
              fieldValue="name"
              items={typesOfSession}
              label="Type of session"
              onChange={(e) => formik.setFieldValue('type', e)}
              value={formik.values.type}
            />
            <ListBox
              fieldKey="id"
              fieldValue="id"
              items={numbersOfRepetition}
              label="Number of repetitions"
              onChange={(e) => formik.setFieldValue('numOfRepetition', e)}
              value={formik.values.numOfRepetition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSessionForm;
