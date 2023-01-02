import { useWindowWidth } from '@react-hook/window-size';

const useWindowBreakpoint = () => {
  const windowWidth = useWindowWidth();

  if (windowWidth <= 1024) {
    return 'sm';
  } else if (windowWidth <= 1280) {
    return 'xl';
  }

  return 'humongous';
};

export default useWindowBreakpoint;
