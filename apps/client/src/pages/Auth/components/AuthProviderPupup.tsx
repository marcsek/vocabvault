import { useQueryClient } from '@tanstack/react-query';
import Button from '@ui/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trpc } from '../../../utils/trpc';
import handleSucessRedirect from './utils/handleSucessRedirect';
import { FcGoogle } from 'react-icons/fc';
import { ImGithub } from 'react-icons/im';
import Cookies from 'js-cookie';

//window atributes
const width = 500;
const height = 700;
const left = window.screenX + (window.outerWidth - width) / 2;
const top = window.screenY + (window.outerHeight - height) / 2.5;
const url = 'https://vocab-backend.up.railway.app/api/auth/';

interface Props {
  providerName: 'Github' | 'Google';
}

const AuthProviderWindow = ({ providerName }: Props) => {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trpcContext = trpc.useContext();

  const handleSubmit = () => {
    const popup = window.open(url + providerName.toLocaleLowerCase(), '_blank', `width=${width},height=${height},left=${left},top=${top}`);
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) return;

    const timer = setInterval(() => {
      if (externalPopup?.closed) {
        const hasCookie = Boolean(Cookies.get('is_loggedin'));
        if (hasCookie) {
          handleSucessRedirect({ navigate, queryClient, trpcContext });
        } else {
          setErrorMessage('Could not log you in.');
        }

        if (timer) clearInterval(timer);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [externalPopup]);

  return (
    <div className="w-full">
      <Button className="w-full" onClick={handleSubmit} intent="outlined" Icon={providerName === 'Google' ? <FcGoogle /> : <ImGithub />}>
        {providerName}
      </Button>
      <p className="text-error-200 absolute mt-1 text-xs">{errorMessage}</p>
    </div>
  );
};

export default AuthProviderWindow;
