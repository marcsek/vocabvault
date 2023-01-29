import ListBox from '@ui/ListBox';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { TLanguageDuo } from 'server/src/schemas/wordSource.schema';
import allCountries from '../../../assets/static/allCountries';
import { useWordPairPreview } from '../context/filePreviewContext/wordPairsPreviewContext';

interface Props<T> {
  formik: FormikProps<T>;
}

const LanguageComboInput = <T extends TLanguageDuo>({ formik }: Props<T>) => {
  const { setWordPairsPreview } = useWordPairPreview();

  useEffect(() => {
    setWordPairsPreview((prev) => {
      return {
        ...prev,
        secondColumnName: formik.values.secondLanguage.languageName,
        firstColumnName: formik.values.firstLanguage.languageName,
      };
    });
  }, [formik.values.firstLanguage, formik.values.secondLanguage]);

  return (
    <>
      <h1 className="text-base font-semibold leading-none">Languages</h1>
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <ListBox
          items={allCountries}
          label="Language 1"
          name="language1"
          value={formik.values.firstLanguage}
          onChange={(e) => formik.setFieldValue('firstLanguage', e)}
          fieldKey="code"
          fieldValue="languageName"
          disabledKeys={[formik.values.secondLanguage.code]}
        />
        <ListBox
          items={allCountries}
          label="Language 2"
          value={formik.values.secondLanguage}
          onChange={(e) => formik.setFieldValue('secondLanguage', e)}
          fieldKey="code"
          fieldValue="languageName"
          disabledKeys={[formik.values.firstLanguage.code]}
        />
      </div>
    </>
  );
};

export default LanguageComboInput;
