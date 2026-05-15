import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_PATH } from '../../../../config/apiPath';
import { toast } from '../../../../store';
import api from '../../../../utils/axios';
import type { CreatePostPayload, Post } from '../types';
import { handlePostError } from './handleError';

export const useCreatePost = (onSuccess?: (post: Post) => void) => {
  const queryClient = useQueryClient();

  return useMutation<Post, any, CreatePostPayload>({
    mutationFn: async data => {
      const res = await api.post(API_PATH.POSTS.LIST, data);
      return res.data;
    },
    onSuccess: post => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.show({
        variant: 'success',
        title: 'Event created!',
        position: 'bottom',
      });
      onSuccess?.(post);
    },
    onError: handlePostError,
  });
};
