import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import api from '../../../utils/axios';
import type { PostParticipant } from '../types';

export const usePendingRequests = (id: number) => {
  return useQuery<PostParticipant[]>({
    queryKey: ['posts', id, 'requests'],
    queryFn: async () => {
      const res = await api.get(API_PATH.POSTS.REQUESTS(id));
      return res.data;
    },
  });
};
