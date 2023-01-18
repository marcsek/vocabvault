import React, { useEffect, useRef } from 'react';
import TextField from '@ui/TextField';
import { useFormik } from 'formik';
import UserSelect from '../../../../components/UserSelect/UserSelect.component';
import DragAndDrop from '../DragAndDrop/DragAndDrop.component';
import LanguageComboInput from '../LanguageComboInput';
import allCountries from '../../../../assets/static/allCountries';
import { trpc } from '../../../../utils/trpc';
import { toFormikValidationSchema } from '../../../../utils/helpers/zodToFormik';
import { CreateWordSourceSchema, TWordPair, TWordPairArray, WordPairOptimizedArraySchema } from 'server/src/schemas/wordSource.schema';
import Button, { ButtonProps } from '@ui/Button';
import { FiAperture } from 'react-icons/fi';
import useHandleDropInputChange from '../../hooks/useHandleDropInputChange';

interface Props {
  submitFormButton: (value: React.ReactElement<ButtonProps>) => void;
}

const CreateDatasourceForm = ({ submitFormButton }: Props) => {
  const createWordSource = trpc.wordSources.createWordSource.useMutation({});
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(CreateWordSourceSchema.omit({ wordPairs: true }).merge(WordPairOptimizedArraySchema)),
    validateOnBlur: false,
    initialValues: {
      name: '',
      wordPairs: [] as TWordPair[],
      firstLanguage: allCountries[0],
      secondLanguage: allCountries[1],
      sharedWith: [],
      activeFile: null,
    },
    onSubmit: (data) => {
      //TODO: shared with ma returnovat id
      // have to parse because ts doesn't formik validates this as not empty
      console.log('Submit');
      createWordSource.mutate({
        name: data.name,
        wordPairs: data.wordPairs as TWordPairArray,
        firstLanguage: data.firstLanguage,
        secondLanguage: data.secondLanguage,
        sharedWith: [],
      });
    },
  });

  const handleDropInputChange = useHandleDropInputChange({ formik });

  //💀 ja uz neviem
  useEffect(() => {
    submitFormButton(
      <Button
        disabled={!formik.isValid}
        loading={createWordSource.isLoading}
        type="submit"
        Icon={<FiAperture />}
        onClick={() => submitButtonRef.current?.click()}
        className="min-w-[94px]"
      >
        Create
      </Button>
    );
  }, [createWordSource.isLoading, formik.isValid]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-10 md:gap-8 lg:flex-row">
      <div className="flex flex-1 flex-col gap-10">
        <div>
          <TextField onBlur={formik.handleBlur} labelText="Name" name="name" value={formik.values.name} onChange={formik.handleChange} />
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
        <DragAndDrop activeFile={formik.values.activeFile} setActiveFile={(e) => handleDropInputChange(e)} />
      </div>
      <button className="hidden" ref={submitButtonRef} disabled={!formik.isValid && formik.touched.name} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateDatasourceForm;
