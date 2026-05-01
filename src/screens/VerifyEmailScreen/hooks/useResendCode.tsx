import { useMutation } from '@tanstack/react-query';
import * as Sentry from '@sentry/react-native';
import { API_PATH } from '../../../config/apiPath';
import { VerificationPurposeType } from '../../../config/type';
import api from '../../../utils/axios';
import { toast } from '../../../store';

export const useResendCode = () => {
  return useMutation({
    mutationFn: (data: { email: string; purpose: VerificationPurposeType }) =>
      api.post(API_PATH.AUTH.RESEND_VERIFICATION, data),
    onSuccess: () => {
      toast.show({
        variant: 'success',
        title: 'Code sent. Check your email.',
        position: 'bottom',
      });
    },
    onError: (error: any) => {
      handleResendError(error);
    },
  });
};

const handleResendError = (error: any) => {
  if (!error.response) {
    toast.show({
      variant: 'error',
      title: 'No internet connection',
      position: 'bottom',
    });
    return;
  }

  const status = error.response.status;
  const serverMessage = error.response.data?.error;

  if (status >= 500) {
    Sentry.captureException(error);
    toast.show({
      variant: 'error',
      title: 'Something went wrong',
      position: 'bottom',
    });
    return;
  }

  switch (status) {
    case 400:
      // Bad purpose or missing email — should never happen if frontend is correct
      Sentry.captureException(error);
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Invalid request',
        position: 'bottom',
      });
      return;
    case 404:
      // Only returned for authenticated purposes (delete/change password)
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Account not found',
        position: 'bottom',
      });
      return;
    case 429:
      toast.show({
        variant: 'error',
        title: 'Too many attempts. Please wait before requesting another code.',
        position: 'bottom',
      });
      return;
    default:
      Sentry.captureException(error);
      toast.show({
        variant: 'error',
        title: 'Something went wrong',
        position: 'bottom',
      });
      return;
  }
};
