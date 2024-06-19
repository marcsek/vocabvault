import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import handleSucessRedirect from '../pages/Auth/components/utils/handleSucessRedirect';
import { trpc } from '../utils/trpc';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { getQueryKey } from '@trpc/react-query';
import { useEffect } from 'react';

export const useGetUser = () => {
  const hasCookie = Boolean(Cookies.get('is_loggedin'));
  const windowIsPopup = window.opener && window.opener !== window;
  const queryClient = useQueryClient();

  const result = trpc.user.getUser.useQuery(undefined, {
    retry: false,
    throwOnError: false,
    suspense: true,
    refetchInterval: 600000,
    enabled: hasCookie && !windowIsPopup,
  });

  useEffect(() => {
    if (result?.error?.data?.code === 'UNAUTHORIZED') {
      //hack lebo z nejake dovodu nemozem setovat data na null aj ked default tanstack query je null
      const userQueryKey = getQueryKey(trpc.user.getUser);
      const q = [...userQueryKey, { type: 'query' }];

      queryClient.setQueryData(q, null);
    }
  }, [result.isError]);

  return result;
};

export const useGetParent = () => {
  return trpc.user.getUserParent.useQuery();
};

export const useGetChildren = () => {
  return trpc.user.getUserChildren.useQuery();
};

export const useChangeUserRole = () => {
  const trpcContext = trpc.useUtils();
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
  const trpcContext = trpc.useUtils();

  return trpc.user.addChild.useMutation({
    onSuccess(data) {
      const previousChildren = trpcContext.user.getUserChildren.getData();

      if (!previousChildren) return;

      trpcContext.user.getUserChildren.setData(undefined, [...previousChildren, ...(data || [])]);
    },

    onError() {
      toast.error("Couldn't add child.");
    },
  });
};

export const useRemoveChild = () => {
  const trpcContext = trpc.useUtils();

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
  const trpcContext = trpc.useUtils();

  return trpc.auth.login.useMutation({
    onSuccess() {
      handleSucessRedirect({ trpcContext, navigate, queryClient });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const trpcContext = trpc.useUtils();

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
      const userKey = getQueryKey(trpc.user.getUser, undefined, 'query');
      queryClient.setQueryData(userKey, null);
      queryClient.clear();
    },
    onError() {
      toast.error('Failed to logout.');
    },
  });
};

export const useUpdateUser = () => {
  const trpcContext = trpc.useUtils();

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
