import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { toast } from '../../../store';
import api from '../../../utils/axios';
import { handlePostError } from '../utils';

export const useCancelJoin = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, void>({
    mutationFn: async () => {
      await api.post(API_PATH.POSTS.CANCEL(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      toast.show({
        variant: 'success',
        title: 'Left the event.',
        position: 'bottom',
      });
    },
    onError: handlePostError,
  });
};
