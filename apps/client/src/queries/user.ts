import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import handleSucessRedirect from '../pages/Auth/components/utils/handleSucessRedirect';
import { trpc } from '../utils/trpc';
import Cookies from 'js-cookie';

export const useGetUser = () => {
  const hasCookie = Boolean(Cookies.get('is_loggedin'));
  const windowIsPopup = window.opener && window.opener !== window;

  return trpc.user.getUser.useQuery(undefined, {
    retry: false,
    useErrorBoundary: true,
    suspense: true,
    refetchInterval: 600000,
    enabled: hasCookie && !windowIsPopup,
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trpcContext = trpc.useContext();

  return trpc.auth.login.useMutation({
    onSuccess() {
      handleSucessRedirect({ trpcContext, navigate, queryClient });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trpcContext = trpc.useContext();

  return trpc.auth.register.useMutation({
    onSuccess() {
      handleSucessRedirect({ trpcContext, navigate, queryClient });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return trpc.auth.logout.useMutation({
    onSuccess() {
      const userKey = trpc.user.getUser.getQueryKey(undefined, 'query');
      queryClient.setQueryData(userKey, null);
    },
  });
};

export const useUpdateUser = () => {
  const trpcContext = trpc.useContext();

  return trpc.user.updateUser.useMutation({
    onSuccess(data) {
      const previousData = trpcContext.user.getUser.getData();
      if (!data || !previousData) return;

      trpcContext.user.getUser.setData(undefined, { ...previousData, ...data });
      console.log(data);
    },
  });
};
