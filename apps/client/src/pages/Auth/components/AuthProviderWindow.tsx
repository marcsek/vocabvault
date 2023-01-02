import React, { useEffect, useState } from 'react';

const AuthProviderWindow = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);

  const connectClick = () => {
    const left = window.screenX + (window.outerWidth - 500) / 2;
    const top = window.screenY + (window.outerHeight - 700) / 2.5;
    const url = `http://localhost:3002/api/auth/google`;
    const popup = window.open(url, '_blank', `width=${500},height=${700},left=${left},top=${top}`);
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) return;

    const timer = setInterval(() => {
      if (externalPopup?.closed) {
        if (timer) clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [externalPopup]);

  return (
    <button className="flex w-fit items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-base text-gray-200" onClick={connectClick}>
      <img
        className="h-4 w-4"
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
      ></img>
      Google
    </button>
  );
};

export default AuthProviderWindow;
