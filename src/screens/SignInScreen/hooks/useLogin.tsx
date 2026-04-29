import * as Sentry from '@sentry/react-native';
import { useMutation } from '@tanstack/react-query';
import { API_PATH } from '../../../config/apiPath';
import { toast } from '../../../store';
import api from '../../../utils/axios';
import { navigate } from '../../../navigation/utils';
import { ROUTES } from '../../../navigation/params';
import { useCredential } from '../../../navigation/flows/flowCredential/context';

export const useLogin = () => {
  const { setEmail } = useCredential();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      api.post(API_PATH.AUTH.LOGIN, data),
    onSuccess: (response: any, variables) => {
      setEmail(variables.email);
      navigate(ROUTES.FLOW_BOTTOM, {
        screen: ROUTES.HOME
      });
    },
    onError: (error: any, variables) => {
      setEmail(variables.email);
      handleLoginError(error);
    },
  });
};

const handleLoginError = (error: any) => {
  if (!error.response) {
    toast.show({ variant: 'error', title: 'No internet connection', position: 'bottom' })
    return;
  }

  const status = error.response.status;
  const serverMessage = error.response.data?.error;

  if (status >= 500) {
    Sentry.captureException(error);
    toast.show({ variant: 'error', title: 'Something went wrong', position: 'bottom' })
    return;
  }

  switch (status) {
    case 400:
      toast.show({ variant: 'error', title: serverMessage ?? 'Invalid request', position: 'bottom' })
      return;
    case 401:
      toast.show({ variant: 'error', title: serverMessage ?? 'Session expired', position: 'bottom' })
      return;
    case 403:
      toast.show({ variant: 'error', title: serverMessage ?? 'You don\'t have access to this', position: 'bottom' })
      return;
    case 404:
      toast.show({ variant: 'error', title: serverMessage ?? 'Resource not found', position: 'bottom' })
      return;
    case 409:
      toast.show({
        variant: 'error',
        position: 'bottom',
        title: serverMessage ?? 'User already exists',
        action: {
          label: 'VerifyEmail', onPress: () => {
            navigate(ROUTES.FLOW_CREDENTAIL, {
              screen: ROUTES.SIGN_UP,
            })
          }
        }
      })
      return;
    case 429:
      toast.show({ variant: 'error', title: serverMessage ?? 'Too many requests, please wait', position: 'bottom' })
      return;
    default:
      Sentry.captureException(error);
      console.log(error);
      toast.show({ variant: 'error', title: 'Something went wrong', position: 'bottom' })
      return;
  }
};
