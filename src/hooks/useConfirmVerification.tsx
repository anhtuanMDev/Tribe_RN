import { useMutation } from '@tanstack/react-query';
import { VerificationPurposeType } from '../config/type';
import { API_PATH } from '../config/apiPath';
import api from '../utils/axios';
import { handleConfirmVerificationError } from './utils';

export const useConfirmVerification = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      code: string;
      purpose: VerificationPurposeType;
    }) => api.post(API_PATH.AUTH.CONFIRM_VERIFICATION, data),
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error: any) => {
      handleConfirmVerificationError(error);
    },
  });
};
