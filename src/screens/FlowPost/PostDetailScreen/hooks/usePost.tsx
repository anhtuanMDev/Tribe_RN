import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../../../../config/apiPath';
import api from '../../../../utils/axios';
import type { Post } from '../types';

export const usePost = (id: number) => {
  return useQuery<Post>({
    queryKey: ['posts', id],
    queryFn: async () => {
      const res = await api.get(API_PATH.POSTS.DETAIL(id));
      return res.data;
    },
  });
};
