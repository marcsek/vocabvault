import { ButtonProps } from '@ui/Button';
import TitleLayout from '@ui/TitleLayout';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDataSourceByID } from '../../queries/wordSource';
import { WordPairPreviewContextProvider } from '../CreateDatasource/context/filePreviewContext/wordPairsPreviewContext';
import TabSelector from './TabSelector';
import DeleteDatasourceForm from './UpdateDatasourceForm/DeleteDatasourceForm';
import UpdateDatasourceForm from './UpdateDatasourceForm/UpdateDatasourceForm';
import WordPairsTable from './WordPairsTable/WordPairsTable.component';

const WordSourceDetail = () => {
  const [submitButton, setSubmitButton] = useState<React.ReactElement<ButtonProps>>();
  const [currentTab, setCurrentTab] = useState<'details' | 'actions'>('details');
  const { id: paramsID } = useParams();
  const { data } = useGetDataSourceByID(paramsID ?? '');

  return (
    <TitleLayout
      button={submitButton}
      headingLeft={
        <div className="flex flex-col gap-6">
          <h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">
            Datasource controlpanel
            {/* <p className="text-xs text-gray-400">{data?.name}</p> */}
          </h1>
          <TabSelector currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      }
    >
      {currentTab === 'details' ? (
        <WordPairPreviewContextProvider>
          <div className="flex w-full flex-col gap-10 lg:gap-14">
            {data && <UpdateDatasourceForm submitFormButton={setSubmitButton} initialDetails={data} />}
            <WordPairsTable />
          </div>
        </WordPairPreviewContextProvider>
      ) : (
        <DeleteDatasourceForm />
      )}
    </TitleLayout>
  );
};

export default WordSourceDetail;