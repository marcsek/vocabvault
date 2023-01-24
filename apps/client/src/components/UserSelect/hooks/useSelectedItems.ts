import { useState } from 'react';

const useSelectedItems = <T extends { id: string }>(initialData: T[]) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialData);

  const handleSelect = (item: T) => {
    setSelectedItems((prev) => {
      if (!prev.some((e) => e.id === item.id)) {
        return [item, ...prev];
      }
      return prev;
    });
  };

  const handleUnselect = (user: T) => {
    setSelectedItems((prev) => prev.filter((el) => el.id != user.id));
  };

  return { selectedItems, handleUnselect, handleSelect };
};

export default useSelectedItems;
