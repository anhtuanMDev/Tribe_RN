import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScreenDimensions, VerificationPurposeType } from '../config/type';
import { API_PATH } from '../config/apiPath';
import api from './axios';
import { toast } from '../store';
import * as Sentry from '@sentry/react-native';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useCountdown = (initialSeconds: number) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const start = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimeLeft(initialSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [initialSeconds]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { timeLeft, isRunning, start, stop };
};

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

const useConfirmVerification = (onSuccess?: () => void) => {
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

function useScreenDimensions(): ScreenDimensions {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return {
    width,
    height,
    safeWidth: width - insets.left - insets.right,
    safeHeight: height - insets.top - insets.bottom,
    isLandscape: width > height,
  };
}

export {
  useCountdown,
  useRequestVerifyEmailCode,
  useConfirmVerification,
  useScreenDimensions,
};
