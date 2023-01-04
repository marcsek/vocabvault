import TextField from '@ui/TextField';
import TitleLayout from '@ui/TitleLayout';
import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from '../Auth/components/utils/zodToFormik';

const DataResourceSchema = z.object({ name: z.string() });

const CreateDatasource = () => {
  const formik = useFormik({
    validationSchema: toFormikValidationSchema(DataResourceSchema),
    initialValues: { name: '' },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <TitleLayout title="Create new datasource">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col">
          <div>
            <TextField labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
          </div>
          <div>
            <h1>Languages</h1>
            <div className="flex justify-between">
              <TextField className="w-full" labelText="Name" />
              <TextField className="w-full" labelText="Name" />
            </div>
          </div>
          <div className="flex ">
            <TextField className="w-full" labelText="Name" />
            <TextField className="w-full" labelText="Name" />
          </div>
        </div>
        <div className="bg-primary-300 h-20"></div>
        <div className="bg-success-200 h-[26.25rem] lg:col-span-2"></div>
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
