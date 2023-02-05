import { inferProcedureOutput } from '@trpc/server';
import Table from '@ui/Table/Table';
import React from 'react';
import { sessionRouter } from 'server/src/routers/session';
import { dateFormatSettings } from '../../../utils/dateFormatSettings';
import { motion } from 'framer-motion';
import SubSpinners from '../../../components/Spinners/SubSpinners';
import { CircleBackslashIcon } from '@radix-ui/react-icons';

const perPage = 10;

const capitalize = (toCap: string) => toCap.toLowerCase().charAt(0).toUpperCase() + toCap.toLowerCase().slice(1);

export type TSessionHistory = inferProcedureOutput<typeof sessionRouter.getSessionAsHistoryByUserId>;

interface Props {
  history: TSessionHistory | undefined;
  page: number;
  setPage: (e: number) => void;
  loading: boolean;
  currentUserName: string;
}

const HistoryList = ({ history, page, setPage, loading, currentUserName }: Props) => {
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
      {!parsedHistory?.length ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {!loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col items-center justify-center gap-2 text-gray-400"
            >
              <CircleBackslashIcon className="h-6 w-6" strokeWidth={3} />
              <p className="text-gray-200">{currentUserName}'s history is empty.</p>
            </motion.div>
          ) : (
            <SubSpinners />
          )}
        </motion.div>
      ) : (
        <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
        </motion.div>
      )}
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
