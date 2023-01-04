import { useEffect } from 'react';

const AuthSuccessPopupPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 500);
  }, []);

  return <h1 className="absolute inset-1/2 min-w-max -translate-x-1/2 translate-y-1/2 text-2xl font-bold">Success</h1>;
};

export default AuthSuccessPopupPage;
