import TextField from '@ui/TextField';
import TitleLayout from '@ui/TitleLayout';
import { useFormik } from 'formik';
import allCountries from '../../assets/static/allCountries';
import UserSelect from '../../components/UserSelect/UserSelect.component';
import DragAndDrop from './components/DragAndDrop/DragAndDrop.component';
import { def } from '../../assets/static/temporary';
import { useRef } from 'react';
import Button from '@ui/Button';
import { FiAperture } from 'react-icons/fi';
import LanguageComboInput from './components/LanguageComboInput';
import { FormikDataResourceSchema } from './schemas';

const CreateDatasource = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik({
    validationSchema: FormikDataResourceSchema,
    initialValues: { name: '', file: null, lang1: allCountries[0], lang2: allCountries[1], sharedWith: def },
    onSubmit: (data) => {
      console.log('submit', data);
    },
  });

  return (
    <TitleLayout
      title="Create new datasource"
      button={
        <Button type="submit" Icon={<FiAperture />} onClick={() => submitRef.current?.click()}>
          Create
        </Button>
      }
    >
      <form onSubmit={formik.handleSubmit} className="grid w-full grid-cols-1 gap-10 md:gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
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
        <div className="h-72 lg:h-full">
          <DragAndDrop onChange={(e) => formik.setFieldValue('file', e)} />
        </div>
        <div className="bg-success-200 h-[26.25rem] lg:col-span-2"></div>
        <button className="hidden" ref={submitRef} type="submit">
          Submit
        </button>
      </form>
    </TitleLayout>
  );
};

export default CreateDatasource;
