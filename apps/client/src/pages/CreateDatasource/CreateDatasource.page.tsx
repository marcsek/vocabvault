import MyListbox from '@ui/ListBox';
import TextField from '@ui/TextField';
import TitleLayout from '@ui/TitleLayout';
import { useFormik } from 'formik';
import { z } from 'zod';
import allCountries from '../../assets/static/allCountries';
import { toFormikValidationSchema } from '../Auth/components/utils/zodToFormik';
import DragAndDrop from './components/DragAndDrop/DragAndDrop.component';

const DataResourceSchema = z.object({ name: z.string(), file: z.instanceof(File) });

const CreateDatasource = () => {
  const formik = useFormik({
    validationSchema: toFormikValidationSchema(DataResourceSchema),
    initialValues: { name: '', file: null },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <TitleLayout title="Create new datasource">
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div>
            <TextField labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-base font-semibold leading-none">Languages</h1>
            <div className="flex justify-between gap-6">
              <MyListbox list={allCountries} label="Language 1" />
              <MyListbox list={allCountries} label="Language 2" />
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <TextField labelText="Name" />
            <TextField labelText="Name" />
          </div>
        </div>
        <div className="h-72 lg:h-full">
          <DragAndDrop />
        </div>
        <div className="bg-success-200 h-[26.25rem] lg:col-span-2"></div>
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
