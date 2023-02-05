import { inferProcedureOutput } from '@trpc/server';
import Table from '@ui/Table/Table';
import React from 'react';
import { sessionRouter } from 'server/src/routers/session';
import { dateFormatSettings } from '../../../utils/dateFormatSettings';

const perPage = 10;

const capitalize = (toCap: string) => toCap.toLowerCase().charAt(0).toUpperCase() + toCap.toLowerCase().slice(1);

export type TSessionHistory = inferProcedureOutput<typeof sessionRouter.getSessionAsHistoryByUserId>;

interface Props {
  history: TSessionHistory | undefined;
  page: number;
  setPage: (e: number) => void;
  loading: boolean;
}

const HistoryList = ({ history, page, setPage, loading }: Props) => {
  console.log(history);

  const parsedHistory = history?.sessions.map((e) => ({
    wordSourceName: e.wordSource.name,
    accuracy: <PercentageIndicator value={e.SessionStatistics?.accuracy ?? 0} />,
    user: e.user?.name,
    type: capitalize(e.type),
    id: e.id,
    startedAt: new Date(e.startedAt).toLocaleDateString('en-GB', dateFormatSettings),
  }));

  return (
    <div className="min-h-[622px]">
      <Table
        rows={parsedHistory ?? []}
        loading={loading}
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
        minWidth={700}
      />
    </div>
  );
};

const PercentageIndicator = ({ value }: { value: number }) => {
  const colors =
    value >= 85
      ? 'bg-success-400/30 text-success-200'
      : value >= 55
      ? 'bg-warning-400/30 text-warning-200'
      : 'bg-error-400/30 text-error-200';

  return <div className={colors + ' rounded-default px-1.5 py-1 text-sm font-semibold leading-none'}>{value}%</div>;
};

export default HistoryList;
