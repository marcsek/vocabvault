import TitleLayout from '@ui/TitleLayout';
import { useRef, useState } from 'react';
import Button from '@ui/Button';
import { FiAperture } from 'react-icons/fi';
import CreateDatasourceForm from './components/CreateDatasourceForm/CreateDatasourceForm';
import FirstEntriesTable from './components/FirstEntriesTable/FirstEntriesTable';
import { WordPairPreviewContextProvider } from './context/filePreviewContext/wordPairsPreviewContext';

const CreateDatasource = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  const disabledButton = ({ disabled, loading }: { disabled: boolean; loading: boolean }) => {
    setButtonDisabled(disabled);
    setButtonLoading(loading);
  };

  return (
    <TitleLayout
      title="Create new datasource"
      button={
        <Button
          disabled={buttonDisabled}
          loading={buttonLoading}
          type="submit"
          Icon={<FiAperture />}
          onClick={() => submitRef.current?.click()}
        >
          Create
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <WordPairPreviewContextProvider>
          <CreateDatasourceForm disableButton={disabledButton} submitButtonRef={submitRef} />
          <FirstEntriesTable />
        </WordPairPreviewContextProvider>
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
