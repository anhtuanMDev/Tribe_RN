import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View, ViewProps } from 'react-native';
import { Typography } from '../../components';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { useCountdown } from '../../utils';
const INITIAL_TIME = 60;

type ResendCodeProps = {
  onResend?: () => void;
  status: 'idle' | 'pending' | 'success' | 'error';
  style?: ViewProps['style'];
};

export const ResendCode = ({ onResend, status, style }: ResendCodeProps) => {
  const { timeLeft, isRunning, start } = useCountdown(INITIAL_TIME);

  useEffect(() => {
    start();
  }, []);
  useEffect(() => {
    if (status === 'success') start();
  }, [status]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isPending = status === 'pending';
  const canResend = !isRunning && !isPending;

  return (
    <View style={[styles.container, style]}>
      {canResend ? (
        <Pressable onPress={onResend} disabled={isPending}>
          <Typography
            style={[styles.contextText, styles.resendLink]}
            level="labelLarge"
          >
            Resend code
          </Typography>
        </Pressable>
      ) : (
        <Typography style={styles.contextText} level="labelLarge">
          {status === 'pending'
            ? 'Sending...'
            : `Resend code in ${formatTime(timeLeft)}`}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextText: {
    color: pallet.variant.neutral['1000'],
    fontFamily: fonts.nunito.bold,
  },
  resendLink: {
    color: pallet.primary,
    fontFamily: fonts.nunito.bold,
    textAlign: 'center',
  },
});
