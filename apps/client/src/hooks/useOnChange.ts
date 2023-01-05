import { useEffect } from 'react';

interface Props<T> {
  onChange: (value: T) => void;
  changedValue: T;
}

const useOnChange = <T>({ onChange, changedValue }: Props<T>) => {
  useEffect(() => {
    onChange(changedValue);
  }, [changedValue]);
};

export default useOnChange;
