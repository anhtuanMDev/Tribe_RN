import { zodResolver } from '@hookform/resolvers/zod';
import { use$ } from '@legendapp/state/react';
import React, { useCallback, useRef } from 'react';
import { Controller, ControllerFieldState, ControllerRenderProps, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, KeyboardAwareView, TextInput, Typography } from '../../components';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { ROUTES } from '../../navigation/params';
import { navigate } from '../../navigation/utils';
import { appStore } from '../../store';
import { useLogin } from './hooks/useLogin';
import { signInSchema } from './schema';
import { SignInFormData } from './type';
const navigateToSignUp = () => navigate(ROUTES.FLOW_CREDENTAIL, { screen: ROUTES.SIGN_UP });
const navigateToForgot = () => navigate(ROUTES.FLOW_CREDENTAIL, { screen: ROUTES.FORGOT_PASSWORD });

function SignInScreen() {

  const renderCount = useRef(0);
  renderCount.current += 1;
  console.log('SignInScreen render:', renderCount.current);
  const userEmail = use$(appStore.user)?.email;

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: userEmail ?? '',
      password: '',
    }
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = useCallback((data: SignInFormData) => {
    Keyboard.dismiss();
    login(data);
  }, [login]);

  const onPress = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const renderEmail = useCallback(({ field: { onChange, value }, fieldState: { error } }: {

    field: ControllerRenderProps<SignInFormData, 'email'>,
    fieldState: ControllerFieldState
  }) => {
    console.log('renderEmail called');
    return (
      <TextInput
        placeholder="hello@tribe-app.com"
        value={value}
        onChangeText={onChange}
        keyboardType="email-address"
        autoCapitalize="none"
        error={error?.message}
      />
    )
  }, []);

  const renderPassword = useCallback(({ field: { onChange, value }, fieldState: { error } }: {
    field: ControllerRenderProps<SignInFormData, 'password'>,
    fieldState: ControllerFieldState
  }) => {
    console.log('renderPassword called');
    return (
      <>
        <View style={styles.textRow}>
          <Typography level="labelSmall" style={styles.primaryText}>
            Password
          </Typography>
          <Typography onPress={navigateToForgot} level="labelSmall" style={styles.secondaryText}>
            Forgot password?
          </Typography>
        </View>
        <TextInput
          placeholder="********"
          value={value}
          onChangeText={onChange}
          secureTextEntry
          error={error?.message}
        />
      </>
    )
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareView>
        <Typography style={styles.title} level="headlineSmall">
          Tribe
        </Typography>

        <View style={styles.imageplaceholder} />

        <Typography style={styles.subtitle} level="headlineLarge">
          Welcome Back
        </Typography>
        <Typography style={styles.body} level="bodyMedium">
          Ready for your next adventure?
        </Typography>

        <View style={styles.inputWrapper}>
          <View style={styles.textBlock}>
            <Typography level="labelSmall" style={styles.primaryText}>
              Email
            </Typography>
            <Controller control={control} name="email" render={renderEmail} />
          </View>

          <View style={styles.textBlock}>
            <Controller control={control} name="password" render={renderPassword} />
          </View>
        </View>

        <Button
          style={styles.button}
          title={isPending ? 'Signing in...' : 'Sign In'}
          level="primary"
          onPress={onPress}
          disabled={isPending}
        />

        <View style={styles.signUpRow}>
          <Typography level="bodyMedium" style={styles.signUpText}>
            Don't have an account?
          </Typography>
          <Typography onPress={navigateToSignUp} level="bodyMedium" style={styles.signUpLink}>
            Sign Up
          </Typography>
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
  },
  title: {
    fontFamily: fonts.literata.extraBold,
    color: pallet.primary,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  imageplaceholder: {
    width: 192,
    height: 192,
    backgroundColor: pallet.primary,
    alignSelf: 'stretch',
    marginTop: 64,
    marginBottom: 40,
    borderRadius: 96,
    overflow: 'hidden',
    margin: 'auto',
  },
  subtitle: {
    fontFamily: fonts.literata.semiBold,
    color: pallet.variant.neutral['1000'],
    marginBottom: 8,
    textAlign: 'center',
  },
  body: {
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['1000'],
    textAlign: 'center',
  },
  inputWrapper: {
    marginTop: 40,
    rowGap: 12,
  },
  textBlock: {
    rowGap: 7,
  },
  primaryText: {
    color: pallet.primary,
    fontFamily: fonts.nunito.regular,
  },
  secondaryText: {
    color: pallet.secondary,
    fontFamily: fonts.nunito.bold,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    columnGap: 12,
  },
  signUpText: {
    color: pallet.secondary,
    fontFamily: fonts.nunito.regular,
  },
  signUpLink: {
    color: pallet.primary,
    fontFamily: fonts.nunito.bold,
  },
  button: {
    marginTop: 40,
    width: '100%',
  },
});

export default SignInScreen;