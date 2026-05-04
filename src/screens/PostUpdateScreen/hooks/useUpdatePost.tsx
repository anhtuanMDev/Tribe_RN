import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { toast } from '../../../store';
import api from '../../../utils/axios';
import type { Post, UpdatePostPayload } from '../types';
import { handlePostError } from './handleError';

export const useUpdatePost = (id: number, onSuccess?: (post: Post) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Post, any, UpdatePostPayload>({
    mutationFn: async data => {
      const res = await api.patch(API_PATH.POSTS.DETAIL(id), data);
      return res.data;
    },
    onSuccess: post => {
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
      toast.show({
        variant: 'success',
        title: 'Event updated.',
        position: 'bottom',
      });
      onSuccess?.(post);
    },
    onError: handlePostError,
  });
};
