import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { pallet } from '../../config/pallet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../../config/constants';
import { Button, KeyboardAvoidingView, TextInput, Typography } from '../../components';
import { navigate } from '../../navigation/utils';
import { ROUTES } from '../../navigation/params';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema } from './schema'
import { SignInFormData } from './type'
import { appStore } from '../../store';
import { useLogin } from './hooks/useLogin';

function SignInScreen() {
  const userEmail = appStore.user.get()?.email;

  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: userEmail ?? '',
      password: '',
    }
  })

  const { mutate: login, isPending, isError } = useLogin();

  const register = () =>
    navigate(ROUTES.FLOW_CREDENTAIL, {
      screen: ROUTES.SIGN_UP,
    });

  const forgot = () =>
    navigate(ROUTES.FLOW_CREDENTAIL, {
      screen: ROUTES.FORGOT_PASSWORD,
    });

  const onSubmit = (data: SignInFormData) => {
    Keyboard.dismiss();
    login(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="hello@tribe-app.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors?.email?.message}
                />
              )}
            />
          </View>

          <View style={styles.textBlock}>

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }, }) => (
                <>
                  <View style={styles.textRow}>
                    <Typography level="labelSmall" style={styles.primaryText}>
                      Password
                    </Typography>
                    <Typography
                      onPress={forgot}
                      level="labelSmall"
                      style={styles.secondaryText}
                    >
                      Forgot password?
                    </Typography>
                  </View>
                  <TextInput
                    placeholder="********"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                    error={errors?.password?.message}
                  />
                </>
              )}
            />
          </View>
        </View>

        <Button
          style={styles.button}
          title={isPending ? 'Signing in...' : 'Sign In'}
          level="primary"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />

        <View style={styles.signUpRow}>
          <Typography level="bodyMedium" style={styles.signUpText}>
            Don't have an account?
          </Typography>
          <Typography
            onPress={register}
            level="bodyMedium"
            style={styles.signUpLink}
          >
            Sign Up
          </Typography>
        </View>
      </KeyboardAvoidingView>
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
