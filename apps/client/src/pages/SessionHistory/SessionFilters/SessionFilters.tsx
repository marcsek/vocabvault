import ListBox from '@ui/ListBox';
import { useMemo } from 'react';
import { useUser } from '../../../providers/UserContext.provider';
import { useGetChildren } from '../../../queries/user';
import { THistoryFilters } from '../hooks/useHistoryFilters';
import FiltersPopover from './FiltersPopover';
import FiltersToggleGroup from './FiltersToggleGroup';

interface Props {
  filters: THistoryFilters;
  setFilters: React.Dispatch<React.SetStateAction<THistoryFilters>>;
}

const SessionFilters = ({ filters, setFilters }: Props) => {
  const { data: children } = useGetChildren();
  const user = useUser();

  const allUsers = useMemo(() => {
    if (!children || !user) return [];

    return [...children.map((e) => ({ id: e.id, name: e.name })), { id: user.id, name: 'You' }];
  }, [children, user]);

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <label className="flex flex-col gap-2">
        <p className="text-sm leading-none">Filters</p>
        <div className="flex items-end justify-center gap-4">
          <FiltersToggleGroup
            orderFilters={{ orderBy: filters.orderBy, reverse: filters.reverse }}
            setOrderFilters={(e) => setFilters((prev) => ({ ...prev, orderBy: e.orderBy, reverse: e.reverse }))}
          />
          <FiltersPopover setFilters={setFilters} filters={filters} />
        </div>
      </label>
      <div className="w-full flex-1 md:max-w-xs">
        <ListBox
          label="User"
          items={allUsers}
          value={filters.currentUser}
          fieldKey="id"
          fieldValue="name"
          onChange={(e) => setFilters((prev) => ({ ...prev, currentUser: e, page: 0 }))}
        />
      </div>
    </div>
  );
};

export default SessionFilters;
