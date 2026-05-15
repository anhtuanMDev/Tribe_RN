import * as Sentry from '@sentry/react-native';
import { toast } from '../../../../store';

export const handlePostError = (error: any) => {
  if (!error.response) {
    toast.show({ variant: 'error', title: 'No internet connection', position: 'bottom' });
    return;
  }

  const status = error.response?.status;
  const serverMessage = error.response?.data?.error;

  if (status >= 500) {
    Sentry.captureException(error);
    toast.show({ variant: 'error', title: 'Something went wrong', position: 'bottom' });
    return;
  }

  switch (status) {
    case 400:
      toast.show({ variant: 'error', title: serverMessage ?? 'Invalid request', position: 'bottom' });
      return;
    case 403:
      toast.show({ variant: 'error', title: serverMessage ?? "You don't have access to this", position: 'bottom' });
      return;
    case 404:
      toast.show({ variant: 'error', title: serverMessage ?? 'Not found', position: 'bottom' });
      return;
    case 429:
      toast.show({ variant: 'error', title: serverMessage ?? 'Too many requests, please wait', position: 'bottom' });
      return;
    default:
      Sentry.captureException(error);
      toast.show({ variant: 'error', title: 'Something went wrong', position: 'bottom' });
      return;
  }
};