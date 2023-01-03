import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../providers/UserContext.provider';
import handleSucessRedirect from '../handleSucessRedirect';

const AuthProviderWindow = () => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const connectClick = () => {
    const left = window.screenX + (window.outerWidth - 500) / 2;
    const top = window.screenY + (window.outerHeight - 700) / 2.5;
    const url = `http://localhost:3002/api/auth/google`;
    const popup = window.open(url, '_blank', `width=${500},height=${700},left=${left},top=${top}`);
    setExternalPopup(popup);
  };

  const daco = async () => {
    await handleSucessRedirect({ navigate, queryClient });
    console.log(user);
  };

  useEffect(() => {
    if (!externalPopup) return;

    const timer = setInterval(() => {
      if (externalPopup?.closed) {
        const hasCookie = !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/);
        if (hasCookie) daco();
        if (!hasCookie) console.log('nemas cookie');

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
