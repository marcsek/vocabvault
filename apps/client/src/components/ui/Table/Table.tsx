import React from 'react';
import SubSpinners from '../../Spinners/SubSpinners';
import Pagination from './Pagination';
import { motion } from 'framer-motion';

interface Props<TObj, TKey> {
  pagination?: { page: number; perPage: number; setPage: (page: number) => void; total: number };
  columns: { keyField: TKey; data: { field: TKey; headerName: string }[] };
  rows: TObj;
  centerLayout?: boolean;
  minWidth?: number;
  loading?: boolean;
}

const Table = <TObj extends { [key: string]: string | number | React.ReactNode }[], TKey extends keyof TObj[number]>({
  columns,
  rows,
  pagination,
  loading,
  centerLayout = false,
  minWidth = 500,
}: Props<TObj, TKey>) => {
  return (
    <div className="flex h-full w-full flex-shrink flex-col items-end justify-between gap-4" aria-label="table">
      <div className="relative w-full flex-1 flex-shrink overflow-auto">
        <div className={`grid grid-cols-1 grid-rows-1`} style={{ minWidth: minWidth }}>
          <div className="rounded-default grid-cols-tableRow sticky top-0 box-border grid border border-gray-600 bg-gray-700 px-4 py-2 text-sm leading-none text-gray-400">
            {columns.data.map((col) => (
              <div
                className={centerLayout ? 'col-span-3 flex justify-start last:col-span-1  last:justify-center' : ''}
                key={col.field.toString()}
              >
                {col.headerName}
              </div>
            ))}
          </div>
          <>
            {loading ? (
              <SubSpinners />
            ) : (
              <>
                {rows.map((row, index) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    key={row[columns.keyField]?.toString()}
                    className="grid-cols-tableRow box-border grid min-w-max grid-rows-1 items-center border-b border-gray-700 p-4 text-sm leading-none text-gray-50"
                  >
                    {columns.data.map((col) => (
                      <div
                        className={centerLayout ? 'col-span-3 flex justify-start last:col-span-1  last:justify-center' : ''}
                        key={col.field.toString()}
                      >
                        {row[col.field]}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </>
            )}
          </>
        </div>
      </div>
      {pagination !== undefined && <Pagination currentPageTotal={rows.length} {...pagination} />}
    </div>
  );
};

export default Table;
