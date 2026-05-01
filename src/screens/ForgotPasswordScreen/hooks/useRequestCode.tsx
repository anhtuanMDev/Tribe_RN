import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import api from '../../../utils/axios';

export const useRequestCode = () => {
    return useMutation({
        mutationFn: (data: { email: string }) => api.post(API_PATH.AUTH.REQUEST_VERIFICATION, data),
        onSuccess: (response: any) => {
            console.log(response);
        },
        onError: (error: any) => {
            console.log(error?.response?.data?.error);
        },
    });
};
