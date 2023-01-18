import Button from '@ui/Button';
import TextField from '@ui/TextField';
import { useFormik } from 'formik';
import React from 'react';
import { UpdateUserSchema } from 'server/src/schemas/user.schema';
import { useUser } from '../../../providers/UserContext.provider';
import { useUpdateUser } from '../../../queries/user';
import { toFormikValidationSchema } from '../../../utils/helpers/zodToFormik';

const General = () => {
  const update = useUpdateUser();
  const { user } = useUser();

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(UpdateUserSchema),
    initialValues: { name: user?.name ?? '', email: user?.email ?? '' },
    onSubmit: (data) => {
      update.mutate(data);
    },
  });

  return (
    <form className="flex w-full flex-col gap-12" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2 leading-none">
        <h2 className="text-xl font-bold text-gray-50">General</h2>
        <p className="text-sm text-gray-400">Settings for your general account usage.</p>
      </div>
      <div className="flex flex-col gap-8 lg:max-w-[32rem]">
        <TextField labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <TextField labelText="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <Button className="md:w-fit" loading={update.isLoading} type="submit">
        Save settings
      </Button>
    </form>
  );
};

export default General;
