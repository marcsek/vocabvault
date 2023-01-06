import React from 'react';
import TextField from '@ui/TextField';
import { useFormik } from 'formik';
import UserSelect from '../../../../components/UserSelect/UserSelect.component';
import { FormikDataResourceSchema } from '../../schemas';
import DragAndDrop from '../DragAndDrop/DragAndDrop.component';
import LanguageComboInput from '../LanguageComboInput';
import allCountries from '../../../../assets/static/allCountries';
import { def } from '../../../../assets/static/temporary';

interface Props {
  submitButtonRef: React.RefObject<HTMLButtonElement>;
}

const CreateDatasourceForm = ({ submitButtonRef }: Props) => {
  const formik = useFormik({
    validationSchema: FormikDataResourceSchema,
    initialValues: { name: '', file: null, lang1: allCountries[0], lang2: allCountries[1], sharedWith: def },
    onSubmit: (data) => {
      console.log('submit', data);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-10 md:gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-10">
        <div>
          <TextField labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-6">
          <LanguageComboInput formik={formik} />
        </div>
        <div className="flex justify-between gap-6">
          <UserSelect
            fieldValue="name"
            fieldKey="id"
            label="User"
            name="user-select"
            onChange={(e) => formik.setFieldValue('sharedWith', e)}
          />
        </div>
      </div>
      <div className="min-h-[15rem] flex-1 lg:h-full">
        <DragAndDrop onChange={(e) => formik.setFieldValue('file', e)} />
      </div>
      <button className="hidden" ref={submitButtonRef} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateDatasourceForm;
