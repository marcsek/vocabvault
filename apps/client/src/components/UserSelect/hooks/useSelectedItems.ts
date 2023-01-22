import { useEffect, useState } from 'react';
import { useIsFirstRender } from 'usehooks-ts';

const useSelectedItems = <T extends { id: string }>(pickedItem: T, initialData: T[]) => {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialData);
  const firstRender = useIsFirstRender();

  useEffect(() => {
    if (!firstRender) {
      setSelectedItems((prev) => {
        if (!prev.some((e) => e.id === pickedItem.id)) {
          return [pickedItem, ...prev];
        }

        return prev;
      });
    }
  }, [pickedItem]);

  const handleUnselect = (user: T) => {
    setSelectedItems((prev) => prev.filter((el) => el.id != user.id));
  };

  return { selectedItems, handleUnselect };
};

export default useSelectedItems;
