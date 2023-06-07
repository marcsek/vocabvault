import TitleLayout from '@ui/TitleLayout/TitleLayout';
import CreateDatasourceForm from './components/CreateDatasourceForm/CreateDatasourceForm';
import FirstEntriesTable from './components/FirstEntriesTable/FirstEntriesTable';
import { WordPairPreviewContextProvider } from './context/filePreviewContext/wordPairsPreviewContext';
import { FiAperture } from 'react-icons/fi';

const CreateDatasource = () => {
  return (
    <TitleLayout
      buttonForSubmit={{ title: 'Create', Icon: <FiAperture /> }}
      headingLeft={<h1 className="text-xl font-bold leading-none md:text-2xl">Create new wordsource</h1>}
    >
      <div className="flex w-full flex-col gap-10 lg:gap-14">
        <WordPairPreviewContextProvider>
          <CreateDatasourceForm />
          <FirstEntriesTable />
        </WordPairPreviewContextProvider>
      </div>
    </TitleLayout>
  );
};

export default CreateDatasource;
