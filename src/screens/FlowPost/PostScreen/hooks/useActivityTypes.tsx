import { useQuery } from '@tanstack/react-query';
import { API_PATH } from '../../../../config/apiPath';
import api from '../../../../utils/axios';
import type { ActivityType } from '../types';

export const useActivityTypes = () => {
  return useQuery<ActivityType[]>({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await api.get(API_PATH.ACTIVITIES.LIST);
      return res.data;
    },
    staleTime: Infinity,
  });
};
