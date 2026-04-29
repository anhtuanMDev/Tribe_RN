import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import api from '../../../utils/axios';
import { navigate, replace } from '../../../navigation/utils';
import { ROUTES } from '../../../navigation/params';

export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: (data: { email: string, code: string }) => api.post(API_PATH.AUTH.VERIFY_EMAIL, data),
        onSuccess: (response: any) => {
            navigate(ROUTES.FLOW_CREDENTAIL, {
                screen: ROUTES.SIGN_IN,
            })
        },
        onError: (error: any) => {
            console.log(error?.response?.data?.error);
        },
    });
};
