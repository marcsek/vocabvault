import { useRef } from 'react';

const useTimeSnapshot = () => {
  const initialSnapShot = useRef(new Date());

  const finishSnapshot = () => {
    return [initialSnapShot.current, new Date()] as const;
  };

  return finishSnapshot;
};

export default useTimeSnapshot;
