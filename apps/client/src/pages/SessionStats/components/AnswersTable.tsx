import Table from '@ui/Table/Table';
import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { TAnswerType } from '../types';
import { ImCross } from 'react-icons/im';
import { TiMinus } from 'react-icons/ti';

interface Props {
  data: TAnswerType[];
  type: 'Test' | 'Practice';
}

const perPage = 5;

const AnswersTable = ({ data, type }: Props) => {
  const [tableData, setTableData] = useState(data.slice(0, perPage));
  const [page, setPage] = useState(0);

  const handlePageChange = (e: number) => {
    setTableData(data.slice(e * perPage, e * perPage + perPage));
    setPage(e);
  };

  return (
    <div className="rounded-default relative flex flex-col gap-4 px-6 py-5 pb-8 leading-none outline outline-1 outline-gray-600">
      <p className="text-sm font-semibold text-gray-300">Solution details</p>
      <Table
        pagination={{
          page: page,
          perPage,
          setPage: handlePageChange,
          total: data.length,
        }}
        centerLayout
        columns={{
          keyField: 'word',
          data: [
            { field: 'word', headerName: 'Word' },
            { field: 'answer', headerName: 'Answer' },
            { field: type === 'Test' ? 'solution' : 'tries', headerName: type === 'Test' ? 'Your solution' : '# of tries' },
            { field: 'correct', headerName: 'Correctness' },
          ],
        }}
        rows={tableData.map((e) => ({
          ...e,
          correct: <CheckRounded type={e.correct} />,
        }))}
      />
    </div>
  );
};

const CheckRounded = ({ type }: { type: 'CORRECT' | 'INCORRECT' | 'SEMICORRECT' }) => {
  return (
    <div
      className={`${
        type === 'CORRECT'
          ? 'bg-success-400/30 text-success-200'
          : type === 'SEMICORRECT'
          ? 'bg-warning-400/30 text-warning-200'
          : 'text-error-200 bg-error-400/30'
      } flex h-[24px] w-[24px] items-center justify-center rounded-full`}
    >
      {type === 'CORRECT' ? (
        <BsCheck className="h-full w-full scale-110" />
      ) : type === 'INCORRECT' ? (
        <ImCross className="h-1/2 w-1/2" />
      ) : (
        <TiMinus className="h-full w-full" />
      )}
    </div>
  );
};

export default AnswersTable;
