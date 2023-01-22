import React, { useEffect, useRef } from 'react';
import TextField from '@ui/TextField';
import { useFormik } from 'formik';

import { UpdateWordSourceSchema } from 'server/src/schemas/wordSource.schema';
import Button, { ButtonProps } from '@ui/Button';
import { FiAperture } from 'react-icons/fi';
import { toFormikValidationSchema } from '../../../utils/helpers/zodToFormik';
import LanguageComboInput from '../../CreateDatasource/components/LanguageComboInput';
import ChildSelect from '../../../components/UserSelect/ChildSelect.component';
import { useUpdateWordSource } from '../../../queries/wordSource';
import { inferProcedureOutput } from '@trpc/server';
import { wordSourceRouter } from 'server/src/routers/wordSource';

export type TGetSourceByIdOuput = inferProcedureOutput<typeof wordSourceRouter.getWordSourceByID>;

interface Props {
  submitFormButton: (value: React.ReactElement<ButtonProps>) => void;
  initialDetails: TGetSourceByIdOuput;
}

const UpdateDatasourceForm = ({ submitFormButton, initialDetails }: Props) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const update = useUpdateWordSource();

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(UpdateWordSourceSchema.omit({ sharedWith: true, id: true })),
    validateOnBlur: false,
    initialValues: {
      name: initialDetails.name,
      firstLanguage: initialDetails.firstLanguage,
      secondLanguage: initialDetails.secondLanguage,
      sharedWith: initialDetails.userAvailableSources,
    },
    onSubmit: ({ sharedWith, ...data }) => {
      const childIds = sharedWith.map((e) => e.id);

      update.mutate({ sharedWith: childIds, id: initialDetails.id, ...data });
    },
  });

  //💀 ja uz neviem
  useEffect(() => {
    submitFormButton(
      <Button
        disabled={!formik.isValid}
        loading={update.isLoading}
        type="submit"
        Icon={<FiAperture />}
        onClick={() => submitButtonRef.current?.click()}
      >
        Update
      </Button>
    );
  }, [formik.isValid, update.isLoading]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-10 md:gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-10">
        <div>
          <TextField onBlur={formik.handleBlur} labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
        </div>
        <div className="flex flex-col gap-6">
          <LanguageComboInput formik={formik} />
        </div>
      </div>
      <div className="flex flex-1 justify-between gap-6">
        <ChildSelect
          fieldValue="name"
          fieldKey="id"
          label="Child select"
          name="user-select"
          flow="vertical"
          initialChildren={initialDetails.userAvailableSources}
          onChange={(e) => formik.setFieldValue('sharedWith', e)}
        />
      </div>

      <button className="hidden" ref={submitButtonRef} disabled={!formik.isValid && formik.touched.name} type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateDatasourceForm;
