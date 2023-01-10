import TitleLayout from '@ui/TitleLayout';
import { ButtonProps } from '@ui/Button';
import CreateDatasourceForm from './components/CreateDatasourceForm/CreateDatasourceForm';
import FirstEntriesTable from './components/FirstEntriesTable/FirstEntriesTable';
import { WordPairPreviewContextProvider } from './context/filePreviewContext/wordPairsPreviewContext';
import { useState } from 'react';

const CreateDatasource = () => {
  const [submitButton, setSubmitButton] = useState<React.ReactElement<ButtonProps>>();

  return (
    <TitleLayout button={submitButton} headingLeft={<h1 className="text-xl font-bold leading-none md:text-2xl">Create new datasource</h1>}>
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <WordPairPreviewContextProvider>
          <CreateDatasourceForm submitFormButton={setSubmitButton} />
          <FirstEntriesTable />
        </WordPairPreviewContextProvider>
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
