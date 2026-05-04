import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { toast } from '../../../store';
import api from '../../../utils/axios';
import { handlePostError } from './handleError';

export const useApproveParticipant = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, any, number>({
    mutationFn: async userId => {
      await api.post(API_PATH.POSTS.APPROVE(postId, userId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', postId, 'requests'],
      });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      toast.show({
        variant: 'success',
        title: 'Participant approved.',
        position: 'bottom',
      });
    },
    onError: error => {
      // Post full is a 400 — show the server message directly
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
