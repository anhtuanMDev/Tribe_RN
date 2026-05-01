import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Icon,
  InputCode,
  KeyboardAwareView,
  TextInput,
  Typography,
  ResendCode,
} from '../../components';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { ROUTES } from '../../navigation/params';
import { replace } from '../../navigation/utils';
import { useForgotPassword } from './hooks/useForgotPassword';
import { forgotPasswordSchema } from './schema';
import { ForgotPasswordFormData } from './type';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  FadeOut,
} from 'react-native-reanimated';

function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '', code: '' },
  });

  const { sendCode, verifyCode, requestStatus, confirmStatus } =
    useForgotPassword();

  const isPendingRequest = requestStatus === 'pending';
  const isPendingConfirm = confirmStatus === 'pending';
  const codeSent = requestStatus === 'success';

  // Animation
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  useEffect(() => {
    if (codeSent) {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      opacity.value = 0;
      translateY.value = 20;
    }
  }, [codeSent]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const onPressSendCode = (data: ForgotPasswordFormData) => {
    sendCode(data.email);
  };

  const onSubmit = (data: ForgotPasswordFormData) => {
    verifyCode(data.email, data.code);
  };

  const signin = () => {
    replace(ROUTES.FLOW_CREDENTAIL, { screen: ROUTES.SIGN_IN });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareView>
        <Pressable onPress={signin} style={styles.navigationBlock}>
          <Icon name="arrow" size={24} color={pallet.primary} />
          <Typography style={styles.navigationText} level="bodyLarge">
            Back to login
          </Typography>
        </Pressable>

        <Typography level="displayLarge">Forgot Password?</Typography>
        <Typography style={styles.subtitle} level="bodyLarge">
          Enter your email to receive a 6-digit verification code.
        </Typography>

        <View style={styles.formWrapper}>
          <View style={styles.textBlock}>
            <Typography level="labelSmall" style={styles.primaryText}>
              Email
            </Typography>
            <Controller
              control={control}
              name="email"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextInput
                  placeholder="hello@tribe-app.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={error?.message}
                  editable={!isPendingRequest}
                />
              )}
            />
            {!codeSent && (
              <Typography
                level="labelLarge"
                onPress={
                  isPendingRequest ? undefined : handleSubmit(onPressSendCode)
                }
                style={[styles.sendText, isPendingRequest && { opacity: 0.5 }]}
              >
                {isPendingRequest
                  ? 'Sending...'
                  : codeSent
                  ? 'Resend Code'
                  : 'Send Verification Code'}
              </Typography>
            )}
          </View>

          {codeSent && (
            <Animated.View
              exiting={FadeOut}
              style={[styles.textBlock, animatedStyle]}
            >
              <Typography level="labelSmall" style={styles.primaryText}>
                Verification Code
              </Typography>
              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, value } }) => (
                  <InputCode
                    length={6}
                    value={value}
                    onChangeText={onChange}
                    onFinsh={() => handleSubmit(onSubmit)()}
                  />
                )}
              />
              <ResendCode
                onResend={() => handleSubmit(onPressSendCode)()}
                status={requestStatus}
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAwareView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallet.background,
    paddingHorizontal: 24,
    paddingTop: 37,
  },
  navigationBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    marginBottom: 32,
  },
  navigationText: {
    fontFamily: fonts.nunito.bold,
    color: pallet.primary,
    textAlignVertical: 'center',
  },
  subtitle: {
    marginTop: 12,
    marginBottom: 32,
  },
  formWrapper: {
    paddingTop: 8,
    rowGap: 32,
  },
  textBlock: {
    rowGap: 7,
  },
  primaryText: {
    color: pallet.primary,
    fontFamily: fonts.nunito.regular,
  },
  sendText: {
    color: pallet.primary,
    textAlign: 'right',
    marginTop: 12,
    fontFamily: fonts.nunito.bold,
  },
});

export default ForgotPasswordScreen;
