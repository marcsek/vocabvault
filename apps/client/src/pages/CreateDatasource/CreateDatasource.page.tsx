import TitleLayout from '@ui/TitleLayout';
import { useRef } from 'react';
import Button from '@ui/Button';
import { FiAperture } from 'react-icons/fi';
import CreateDatasourceForm from './components/CreateDatasourceForm/CreateDatasourceForm';
import FirstEntriesTable from './components/FirstEntriesTable/FirstEntriesTable';

const CreateDatasource = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  return (
    <TitleLayout
      title="Create new datasource"
      button={
        <Button type="submit" Icon={<FiAperture />} onClick={() => submitRef.current?.click()}>
          Create
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <CreateDatasourceForm submitButtonRef={submitRef} />
        <FirstEntriesTable />
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
