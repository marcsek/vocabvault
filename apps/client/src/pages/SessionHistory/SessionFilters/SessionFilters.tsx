import ListBox from '@ui/ListBox';
import { useMemo, useState } from 'react';
import { useUser } from '../../../providers/UserContext.provider';
import { useGetChildren } from '../../../queries/user';

const SessionFilters = () => {
  const { data: children } = useGetChildren();
  const user = useUser();
  const [currentUser, setCurrectUser] = useState<{ id: string; name: string }>({ id: user?.id ?? '', name: 'You' });

  const allUsers = useMemo(() => {
    if (!children || !user) return [];

    return [...children.map((e) => ({ id: e.id, name: e.name })), { id: user.id, name: 'You' }];
  }, [children, user]);

  return (
    <div className="flex justify-end">
      <div className="max-w-xs flex-1">
        <ListBox label="User" items={allUsers} value={currentUser} fieldKey="id" fieldValue="name" onChange={setCurrectUser} />
      </div>
    </div>
  );
};

export default SessionFilters;
