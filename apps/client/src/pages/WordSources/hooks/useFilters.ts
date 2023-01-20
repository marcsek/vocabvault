import { useState } from 'react';
import { TGetAllWordSourcesOutput } from '../WordSources.page';

export type TSourceFilters = {
  type: { shared: boolean; private: boolean; watched: boolean };
  keyword: string;
};

const useFilters = (data: TGetAllWordSourcesOutput) => {
  const [filters, setFilters] = useState<TSourceFilters>({ type: { shared: true, private: true, watched: true }, keyword: '' });

  const filtered = data.filter((e) => {
    if (!e.name.includes(filters?.keyword ?? '')) return false;
    if (!filters.type[e.type]) return false;

    return true;
  });

  return { filtered, setFilters, filters };
};

export default useFilters;
