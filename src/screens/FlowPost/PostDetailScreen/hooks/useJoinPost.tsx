import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../../config/apiPath';
import { toast } from '../../../../store';
import api from '../../../../utils/axios';
import { handlePostError } from './handleError';

export const useJoinPost = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, void>({
    mutationFn: async () => {
      await api.post(API_PATH.POSTS.JOIN(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      toast.show({
        variant: 'success',
        title: 'Request sent!',
        position: 'bottom',
      });
    },
    onError: error => {
      const serverMessage = error.response?.data?.error;
      if (error.response?.status === 400 && serverMessage) {
        toast.show({
          variant: 'error',
          title: serverMessage,
          position: 'bottom',
        });
        return;
      }
      handlePostError(error);
    },
  });
};
