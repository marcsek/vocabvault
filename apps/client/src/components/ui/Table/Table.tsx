import React from 'react';
import Pagination from './Pagination';

interface Props<TObj, TKey> {
  pagination?: { page: number; perPage: number; setPage: (page: number) => void; total: number };
  columns: { keyField: TKey; data: { field: TKey; headerName: string }[] };
  rows: TObj;
  centerLayout?: boolean;
}

const Table = <TObj extends { [key: string]: string | number | React.ReactNode }[], TKey extends keyof TObj[number]>({
  columns,
  rows,
  pagination,
  centerLayout = false,
}: Props<TObj, TKey>) => {
  return (
    <div className="flex h-full w-full flex-shrink flex-col items-end justify-between gap-4" aria-label="table">
      <div className="w-full flex-1 flex-shrink overflow-auto">
        <div className="grid min-w-[500px] grid-cols-1 grid-rows-1">
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

          {rows.map((row) => (
            <div
              key={row[columns.keyField]?.toString()}
              className="grid-cols-tableRow box-border grid grid-rows-1 items-center border-b border-gray-700 p-4 text-sm leading-none text-gray-50"
            >
              {columns.data.map((col) => (
                <div
                  className={centerLayout ? 'col-span-3 flex justify-start last:col-span-1  last:justify-center' : ''}
                  key={col.field.toString()}
                >
                  {row[col.field]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {pagination !== undefined && <Pagination currentPageTotal={rows.length} {...pagination} />}
    </div>
  );
};
// flex justify-start last:justify-center
// flex justify-center first:justify-start
// col-span-2 flex justify-start last:col-span-1  last:justify-center

export default Table;
