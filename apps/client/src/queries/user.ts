import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import handleSucessRedirect from '../pages/Auth/components/utils/handleSucessRedirect';
import { trpc } from '../utils/trpc';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const useGetUser = () => {
  const hasCookie = Boolean(Cookies.get('is_loggedin'));
  const windowIsPopup = window.opener && window.opener !== window;
  const queryClient = useQueryClient();

  return trpc.user.getUser.useQuery(undefined, {
    onError(error) {
      if (error.data?.code === 'UNAUTHORIZED') {
        //hack lebo z nejake dovodu nemozem setovat data na null aj ked default tanstack query je null
        const q = [...trpc.user.getUser.getQueryKey(), { type: 'query' }];

        queryClient.setQueryData(q, null);
      }
    },

    retry: false,
    useErrorBoundary: false,
    suspense: true,
    refetchInterval: 600000,
    enabled: hasCookie && !windowIsPopup,
  });
};

export const useGetParent = () => {
  return trpc.user.getUserParent.useQuery();
};

export const useGetChildren = () => {
  return trpc.user.getUserChildren.useQuery();
};

export const useChangeUserRole = () => {
  const trpcContext = trpc.useContext();
  return trpc.user.changeType.useMutation({
    onSuccess(data) {
      trpcContext.user.getUser.setData(undefined, data);
    },

    onError() {
      toast.error("Coldn't change role.");
    },
  });
};

export const useAddChild = () => {
  const trpcContext = trpc.useContext();

  return trpc.user.addChild.useMutation({
    onSuccess(data) {
      const previousChildren = trpcContext.user.getUserChildren.getData();

      if (!previousChildren) return;

      trpcContext.user.getUserChildren.setData(undefined, [...previousChildren, ...data]);
    },

    onError() {
      toast.error("Couldn't add child.");
    },
  });
};

export const useRemoveChild = () => {
  const trpcContext = trpc.useContext();

  return trpc.user.removeChild.useMutation({
    onSuccess(data) {
      const previousChildren = trpcContext.user.getUserChildren.getData();

      if (!previousChildren) return;

      const newChildren = previousChildren.filter((child) => child.id !== data.id);

      trpcContext.user.getUserChildren.setData(undefined, newChildren);
    },

    onError() {
      toast.error("Couldn't delete child");
    },
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
      queryClient.clear();
    },
    onError() {
      toast.error('Failed to logout.');
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
    onError() {
      toast.error('Failed to update profile.');
    },
  });
};
