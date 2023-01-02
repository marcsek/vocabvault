import { useEffect, useState } from 'react';

const useHasScrolled = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    setHasScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return hasScrolled;
};

export default useHasScrolled;
