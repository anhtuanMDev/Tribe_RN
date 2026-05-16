import * as Sentry from '@sentry/react-native';
import { toast } from '../store';

const handleRequestCodeError = (error: any) => {
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
      // Invalid purpose — frontend bug
      Sentry.captureException(error);
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Invalid request',
        position: 'bottom',
      });
      return;
    case 429:
      toast.show({
        variant: 'error',
        title: 'Too many attempts. Please wait before trying again.',
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


const handleConfirmVerificationError = (error: any) => {
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
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'Invalid code',
        position: 'bottom',
      });
      return;
    case 404:
      toast.show({
        variant: 'error',
        title: serverMessage ?? 'No verification request found',
        position: 'bottom',
      });
      return;
    case 410:
      toast.show({
        variant: 'error',
        title: 'Code expired. Please request a new one.',
        position: 'bottom',
      });
      return;
    case 429:
      toast.show({
        variant: 'error',
        title: 'Too many attempts. Please wait.',
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

export {
  handleConfirmVerificationError,
  handleRequestCodeError
};