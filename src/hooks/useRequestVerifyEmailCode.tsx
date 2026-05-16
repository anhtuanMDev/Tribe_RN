import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../config/apiPath';
import { VerificationPurposeType } from '../config/type';
import { toast } from '../store';
import api from '../utils/axios';
import { handleRequestCodeError } from './utils';

// register use difference request code flow, this hook is to request verification code email for other feature
const useRequestVerifyEmailCode = () => {
  return useMutation({
    mutationFn: (data: { email: string; purpose: VerificationPurposeType }) =>
      api.post(API_PATH.AUTH.REQUEST_VERIFICATION, data),
    onSuccess: () => {
      toast.show({
        variant: 'success',
        title: 'Check your email for the verification code.',
        position: 'bottom',
      });
    },
    onError: (error: any) => {
      handleRequestCodeError(error);
    },
  });
};

export { useRequestVerifyEmailCode };
