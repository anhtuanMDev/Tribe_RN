import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import api from '../../../utils/axios';
import { useCredential } from '../../../navigation/flows/flowCredential/context';
import { navigate, replace } from '../../../navigation/utils';
import { ROUTES } from '../../../navigation/params';
import { VerificationPurpose } from '../../../config/constants';

export const useRegister = () => {
    const { setEmail } = useCredential();

    return useMutation({
        mutationFn: (data: { email: string; username: string; password: string }) =>
            api.post(API_PATH.AUTH.REGISTER, data),
        onSuccess: (_response: any, variables: { email: string; username: string; password: string }) => {
            setEmail(variables.email);
            navigate(ROUTES.FLOW_CREDENTAIL, {
                screen: ROUTES.VERIFY_EMAIL,
                params: { purpose: VerificationPurpose.REGISTER }
            })
        },
        onError: (error: any) => {
            console.log(error?.response?.data?.error);
        },
    });
};
