import React, { useContext, useEffect, useRef } from 'react';
import TextField from '@ui/TextField';
import { useFormik } from 'formik';
import ChildSelect, { TGetChildrenOutput } from '../../../../components/UserSelect/ChildSelect.component';
import DragAndDrop from '../DragAndDrop/DragAndDrop.component';
import LanguageComboInput from '../LanguageComboInput';
import allCountries from '../../../../assets/static/allCountries';
import { toFormikValidationSchema } from '../../../../utils/helpers/zodToFormik';
import { CreateWordSourceSchema, TWordPair, TWordPairArray, WordPairOptimizedArraySchema } from 'server/src/schemas/wordSource.schema';
import useHandleDropInputChange from '../../hooks/useHandleDropInputChange';
import { useCreateWordSource } from '../../../../queries/wordSource';
import { ButtonPropsContext } from '@ui/TitleLayout/TitleLayout';
import { useNavigate } from 'react-router-dom';

const CreateWordSourceOptimizedSchema = CreateWordSourceSchema.omit({ wordPairs: true, sharedWith: true }).merge(
  WordPairOptimizedArraySchema
);

const CreateDatasourceForm = () => {
  const navigate = useNavigate();
  const createWordSource = useCreateWordSource(() => navigate('/word-sources', { replace: true }));
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { setButtonProps } = useContext(ButtonPropsContext);

  const formik = useFormik({
    validationSchema: toFormikValidationSchema(CreateWordSourceOptimizedSchema),
    validateOnBlur: false,
    initialValues: {
      name: '',
      wordPairs: [] as TWordPair[],
      firstLanguage: allCountries[0],
      secondLanguage: allCountries[1],
      sharedWith: [] as TGetChildrenOutput,
      activeFile: null,
    },
    onSubmit: (data) => {
      // have to parse because ts doesn't formik validates this as not empty
      createWordSource.mutate({
        name: data.name,
        wordPairs: data.wordPairs as TWordPairArray,
        firstLanguage: data.firstLanguage,
        secondLanguage: data.secondLanguage,
        sharedWith: data.sharedWith.map((e) => e.id),
      });
    },
  });

  const handleDropInputChange = useHandleDropInputChange({ formik });

  useEffect(() => {
    setButtonProps({ disabled: !formik.isValid, loading: createWordSource.isLoading, onClick: () => submitButtonRef.current?.click() });
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
          <ChildSelect
            fieldValue="name"
            fieldKey="id"
            label="Child select"
            name="user-select"
            onChange={(e) => formik.setFieldValue('sharedWith', e)}
          />
        </div>
      </div>
      <div className="min-h-[15rem] flex-1">
        <DragAndDrop activeFile={formik.values.activeFile} setActiveFile={(e) => handleDropInputChange(e)} />
      </div>
      <button className="hidden" ref={submitButtonRef} disabled={!formik.isValid && formik.touched.name} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateDatasourceForm;
