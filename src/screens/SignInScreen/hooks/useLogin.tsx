import { useMutation } from '@tanstack/react-query';
import { appStore } from '../../../store';
import api from '../../../utils/axios';
import { API_PATH } from '../../../config/apiPath';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post(API_PATH.AUTH.LOGIN, data),
    onSuccess: (response: any) => {
      console.log(response);
      //   appStore.token.set(response.data.token);
      //   appStore.refreshToken.set(response.data.refresh);
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.error);
    },
  });
};
