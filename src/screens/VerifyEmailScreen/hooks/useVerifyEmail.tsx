import * as Sentry from '@sentry/react-native';
import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { ROUTES } from '../../../navigation/params';
import { navigate, replace } from '../../../navigation/utils';
import { toast } from '../../../store';
import api from '../../../utils/axios';

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: { email: string; code: string }) =>
      api.post(API_PATH.AUTH.VERIFY_EMAIL, data),
    onSuccess: (response: any) => {
      toast.show({
        variant: 'success',
        title: 'Verified successfully',
        message: "Now you're all set, please log in.",
        position: 'bottom',
      });

      replace(ROUTES.FLOW_CREDENTAIL, {
        screen: ROUTES.SIGN_IN,
      });
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};

const handleError = (error: any) => {
  if (!error.response) {
    toast.show({
      variant: 'error',
      title: 'No internet connection',
      position: 'bottom',
    });
    return;
  }

  const status = error.response.status;
  const serverMessage = error.response.data?.message;

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
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Invalid request',
        position: 'bottom',
      });
      return;
    case 401:
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Session expired',
        position: 'bottom',
      });
      return;
    case 403:
      toast.show({
        variant: 'error',
        title: serverMessage ?? "You don't have access to this",
        position: 'bottom',
      });
      return;
    case 404:
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Not found',
        position: 'bottom',
      });
      return;
    case 409:
      toast.show({
        variant: 'error',
        position: 'bottom',
        title: serverMessage ?? 'Already verified',
        action: {
          label: 'Log in',
          onPress: () =>
            navigate(ROUTES.FLOW_CREDENTAIL, { screen: ROUTES.SIGN_IN }),
        },
      });
      return;
    case 410:
      toast.show({
        variant: 'error',
        position: 'bottom',
        title: serverMessage ?? 'Code expired',
      });
      return;
    case 429:
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Too many requests, please wait',
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
