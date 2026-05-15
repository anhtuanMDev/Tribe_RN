import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../../config/apiPath';
import { toast } from '../../../../store';
import api from '../../../../utils/axios';
import { handlePostError } from './handleError';

export const useDisbandPost = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, void>({
    mutationFn: async () => {
      await api.delete(API_PATH.POSTS.DETAIL(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.show({
        variant: 'success',
        title: 'Event disbanded.',
        position: 'bottom',
      });
      onSuccess?.();
    },
    onError: handlePostError,
  });
};
