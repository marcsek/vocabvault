import React from 'react';
import Pagination from './Pagination';

interface Props {
  paginate?: boolean;
  columns: { keyField: string; data: { field: string; headerName: string }[] };
  rows: { [key: string]: string | number }[];
}

const Table = ({ columns, rows, paginate = false }: Props) => {
  return (
    <div className="flex h-full w-full flex-col items-end gap-4" aria-label="table">
      <div className="h-full w-full overflow-auto">
        <div className="grid min-w-[500px] grid-cols-1 grid-rows-1">
          <div className="rounded-default grid-cols-tableRow sticky top-0 box-border grid border border-gray-600 bg-gray-700 px-4 py-2 text-sm leading-none text-gray-400">
            {columns.data.map((col) => (
              <div key={col.field} className="">
                {col.headerName}
              </div>
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
      {paginate && <Pagination />}
    </div>
  );
};

export default Table;
