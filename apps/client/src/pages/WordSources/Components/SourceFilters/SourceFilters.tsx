import TextField from '@ui/TextField';
import { useEffect, useState } from 'react';
import { TSourceFilters } from '../../hooks/useFilters';
import TypeFilters from './TypeFilters';

interface Props {
  setF: React.Dispatch<React.SetStateAction<TSourceFilters>>;
}

const SourceFilters = ({ setF }: Props) => {
  const [filters, setFilters] = useState({ type: { shared: true, private: true, watched: true }, keyword: '' });

  const handleTypeChange = (name: 'shared' | 'private' | 'watched') => {
    setFilters((prev) => {
      if (prev.type[name] && Object.values(prev.type).filter((value) => value === false).length === 2) return prev;

      return { ...prev, type: { ...prev.type, [name]: !prev.type[name] } };
    });
  };

  const handleKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => {
      return { ...prev, keyword: e.target.value };
    });
  };

  useEffect(() => {
    setF(filters);
  }, [filters]);

  return (
    <div className="flex w-full flex-col gap-4 md:w-80">
      <TextField value={filters.keyword} labelText="Keyword" className="w-full" onChange={handleKeyWordChange} />
      <TypeFilters handleGroupClick={handleTypeChange} checked={filters.type} />
    </div>
  );
};

export default SourceFilters;
