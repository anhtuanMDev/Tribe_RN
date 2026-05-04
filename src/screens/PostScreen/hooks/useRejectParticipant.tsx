import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { toast } from '../../../store';
import api from '../../../utils/axios';
import { handlePostError } from './handleError';

export const useRejectParticipant = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, number>({
    mutationFn: async userId => {
      await api.post(API_PATH.POSTS.REJECT(postId, userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', postId, 'requests'],
      });
      toast.show({
        variant: 'success',
        title: 'Participant rejected.',
        position: 'bottom',
      });
    },
    onError: handlePostError,
  });
};
