import TitleLayout from '@ui/TitleLayout/TitleLayout';
import { useUser } from '../../providers/UserContext.provider';
import HistoryList from './HistoryList/HistoryList';
import useHistoryFilters from './hooks/useHistoryFilters';
import SessionFilters from './SessionFilters/SessionFilters';

const SessionHistory = () => {
  const user = useUser();
  const { filters, history, setFilters, isLoading } = useHistoryFilters({
    initialFilers: { currentUser: { id: user?.id ?? '', name: 'Your' }, orderBy: 'time', page: 0, reverse: false },
  });

  return (
    <TitleLayout headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">Session history</h1>}>
      <SessionFilters filters={filters} setFilters={setFilters} />
      <HistoryList
        loading={isLoading}
        page={filters.page}
        setPage={(e) => setFilters((prev) => ({ ...prev, page: e }))}
        history={history}
        currentUserName={filters.currentUser.name}
      />
    </TitleLayout>
  );
};

export default SessionHistory;
