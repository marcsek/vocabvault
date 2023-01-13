import { useState } from 'react';
import { TGetAllUserSourcesOutput } from 'server/src/schemas/wordSource.schema';

export type TSourceFilters = {
  type: { shared: boolean; private: boolean; watched: boolean };
  keyword: string;
};

const useFilters = (data: TGetAllUserSourcesOutput[]) => {
  const [filters, setFilters] = useState<TSourceFilters>({ type: { shared: true, private: true, watched: true }, keyword: '' });

  const filtered = data.filter((e) => {
    if (!e.name.includes(filters?.keyword ?? '')) return false;
    if (!filters.type[e.type]) return false;

    return true;
  });

  return { filtered, setFilters };
};

export default useFilters;
