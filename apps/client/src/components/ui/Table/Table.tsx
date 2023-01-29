import React from 'react';
import Pagination from './Pagination';

interface Props<T, TKey> {
  pagination?: { page: number; perPage: number; setPage: React.Dispatch<React.SetStateAction<number>>; total: number };
  columns: { keyField: TKey; data: { field: string; headerName: string }[] };
  rows: T;
}

const Table = <T extends { [key: string]: string | number }[], TKey extends keyof T[number]>({
  columns,
  rows,
  pagination,
}: Props<T, TKey>) => {
  return (
    <div className="flex h-full w-full flex-shrink flex-col items-end justify-between gap-4" aria-label="table">
      <div className="w-full flex-1 flex-shrink overflow-auto">
        <div className="grid min-w-[500px] grid-cols-1 grid-rows-1">
          <div className="rounded-default grid-cols-tableRow sticky top-0 box-border grid border border-gray-600 bg-gray-700 px-4 py-2 text-sm leading-none text-gray-400">
            {columns.data.map((col) => (
              <div key={col.field}>{col.headerName}</div>
            ))}
          </div>

          {rows.map((row) => (
            <div
              key={row[columns.keyField]}
              className="grid-cols-tableRow box-border grid grid-rows-1 border-b border-gray-700 p-4 text-sm leading-none text-gray-50"
            >
              {columns.data.map((col) => (
                <div key={col.field}>{row[col.field]}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {pagination !== undefined && <Pagination currentPageTotal={rows.length} {...pagination} />}
    </div>
  );
};

export default Table;
