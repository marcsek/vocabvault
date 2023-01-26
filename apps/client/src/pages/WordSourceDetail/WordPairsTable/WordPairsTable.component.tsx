import Table from '@ui/Table/Table';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetWordSourceWordPairs } from '../../../queries/wordSource';
import { useWordPairPreview } from '../../CreateDatasource/context/filePreviewContext/wordPairsPreviewContext';
const perPage = 10;

const WordPairsTable = () => {
  const [page, setPage] = useState(0);
  const { id: paramsID } = useParams();
  const { wordPairsPreview } = useWordPairPreview();

  const { data: wordPairs } = useGetWordSourceWordPairs(paramsID ?? '', { pagination: { page, perPage } });

  return (
    <div className="flex flex-col gap-6 lg:col-span-2">
      <h1 className="h-fit text-base font-semibold text-gray-50">Word pairs</h1>
      <div className="h-96">
        <Table
          pagination={{ page, setPage, perPage, total: wordPairs?._count.wordPairs ?? 0 }}
          rows={wordPairs?.wordPairs ?? []}
          columns={{
            keyField: 'id',
            data: [
              {
                field: 'firstValue',
                headerName: `Column 1 (${wordPairsPreview.firstColumnName || wordPairs?.firstLanguage.languageName})`,
              },
              {
                field: 'secondValue',
                headerName: `Column 2 (${wordPairsPreview.secondColumnName || wordPairs?.secondLanguage.languageName})`,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default WordPairsTable;
