import { useEffect } from 'react';

const LoginSucess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  return <h1 className="absolute inset-1/2 min-w-max -translate-x-1/2 translate-y-1/2 text-2xl font-bold">Very Nice!</h1>;
};

export default LoginSucess;
