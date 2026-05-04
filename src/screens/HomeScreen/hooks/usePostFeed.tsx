import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import api from '../../../utils/axios';
import type { FeedParams, Post } from '../types';

export const usePostFeed = (params: FeedParams) => {
  return useQuery<Post[]>({
    queryKey: ['posts', 'feed', params],
    queryFn: async () => {
      const res = await api.get(API_PATH.POSTS.LIST, { params });
      return res.data;
    },
    staleTime: 1000 * 30,
  });
};
