import { useState } from 'react';
import { useGetSessionAsHistoryByUserId } from '../../../queries/session';

export interface THistoryFilters {
  currentUser: { id: string; name: string };
  orderBy: 'percentage' | 'time' | 'type';
  reverse: boolean;
  page: number;
  sessionType?: string;
  source?: { id: string; name: string };
}

const perPage = 10;

const useHistoryFilters = ({ initialFilers }: { initialFilers: THistoryFilters }) => {
  const [filters, setFilters] = useState<THistoryFilters>(initialFilers);
  const { data: history, isLoading } = useGetSessionAsHistoryByUserId({
    userId: filters.currentUser.id,
    pagination: { page: filters.page, perPage },
    orderFilters: { orderBy: filters.orderBy, reverse: filters.reverse },
    advancedFilters: { sessionType: filters.sessionType?.toUpperCase() as 'TEST', sourceId: filters.source?.id },
  });

  return { history, filters, setFilters, isLoading };
};

export default useHistoryFilters;
