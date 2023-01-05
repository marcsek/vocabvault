import ListBox from '@ui/ListBox';
import { FormikProps } from 'formik';
import React from 'react';
import allCountries from '../../../assets/static/allCountries';
import { TLanguageDuo } from '../schemas';

interface Props<T> {
  formik: FormikProps<T>;
}

const LanguageComboInput = <T extends TLanguageDuo>({ formik }: Props<T>) => {
  return (
    <>
      <h1 className="text-base font-semibold leading-none">Languages</h1>
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <ListBox
          items={allCountries}
          label="Language 1"
          name="language1"
          value={formik.values.lang1}
          onChange={(e) => formik.setFieldValue('lang1', e)}
          fieldKey="code"
          fieldValue="language"
          disabledKeys={formik.values.lang2.code}
        />
        <ListBox
          items={allCountries}
          label="Language 2"
          value={formik.values.lang2}
          onChange={(e) => formik.setFieldValue('lang2', e)}
          fieldKey="code"
          fieldValue="language"
          disabledKeys={formik.values.lang1.code}
        />
      </div>
    </>
  );
};

export default LanguageComboInput;
