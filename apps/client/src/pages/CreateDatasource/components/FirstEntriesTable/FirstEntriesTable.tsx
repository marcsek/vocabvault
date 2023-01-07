import Table from '@ui/Table/Table';
import React from 'react';
import { VscTable } from 'react-icons/vsc';
import { useWordPairPreview } from '../../context/filePreviewContext/wordPairsPreviewContext';

const FirstEntriesTable = () => {
  const { wordPairsPreview } = useWordPairPreview();
  const leftOverEntries = wordPairsPreview.total - Math.min(wordPairsPreview.total, 6);

  return (
    <div className="flex flex-col gap-6 lg:col-span-2">
      <h1 className="text-base font-semibold text-gray-50">Word pairs</h1>
      {!wordPairsPreview.pairs.length ? (
        <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 border border-gray-600">
          <VscTable size={50} className="text-gray-500" />
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm leading-none text-gray-50">You first need to upload your database.</p>
            <span className="text-xs leading-none text-gray-400">Then the first 6 entries will show up here.</span>
          </div>
        </div>
      ) : (
        <>
          <Table
            rows={wordPairsPreview.pairs}
            columns={{
              keyField: 'firstValue',
              data: [
                { field: 'firstValue', headerName: `Column 1 (${wordPairsPreview.firstColumnName})` },
                { field: 'secondValue', headerName: `Column 2 (${wordPairsPreview.firstColumnName})` },
              ],
            }}
          />
          {!!leftOverEntries && <p className="m-auto text-sm leading-none text-gray-400">{`And ${leftOverEntries} more...`}</p>}
        </>
      )}
    </div>
  );
};

export default FirstEntriesTable;
