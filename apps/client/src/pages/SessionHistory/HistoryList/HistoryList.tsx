import Table from '@ui/Table/Table';
import React, { useState } from 'react';
import { dateFormatSettings } from '../../../utils/dateFormatSettings';
import { trpc } from '../../../utils/trpc';

const perPage = 10;

const capitalize = (toCap: string) => toCap.toLowerCase().charAt(0).toUpperCase() + toCap.toLowerCase().slice(1);

const HistoryList = () => {
  const [page, setPage] = useState(0);
  const { data: history } = trpc.session.getSessionAsHistoryByUserId.useQuery({ userId: undefined, pagination: { page, perPage } });
  console.log(history);

  const parsedHistory = history?.sessions.map((e) => ({
    wordSourceName: e.wordSource.name,
    accuracy: e.SessionStatistics?.accuracy,
    user: e.user?.name,
    type: capitalize(e.type),
    id: e.id,
    startedAt: new Date(e.startedAt).toLocaleDateString('en-GB', dateFormatSettings),
  }));

  return (
    <div>
      <Table
        rows={parsedHistory ?? []}
        columns={{
          keyField: 'id',
          data: [
            { field: 'wordSourceName', headerName: 'Source name' },
            { field: 'user', headerName: 'Taken by' },
            { field: 'startedAt', headerName: 'Taken on' },
            { field: 'type', headerName: 'Type' },
            { field: 'accuracy', headerName: 'Accuracy' },
          ],
        }}
        pagination={{ page, perPage, setPage, total: history?.sessionCount ?? 0 }}
        centerLayout
      />
    </div>
  );
};

export default HistoryList;
