import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon, KeyboardAvoidingView, TextInput, Typography } from '../../components';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { ROUTES } from '../../navigation/params';
import { replace } from '../../navigation/utils';
import { appStore } from '../../store';
import { useRegister } from './hooks/useRegister';
import { signUpSchema } from './schema';
import { SignUpFormData } from './type';
import { useCredential } from '../../navigation/flows/flowCredential/context';

function SignUpScreen() {
  const userEmail = appStore.user.get()?.email;
  const { state, setEmail } = useCredential();

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: userEmail ?? state.email ?? '',
      password: '',
      username: '',
    }
  })

  const { mutate: register, isPending } = useRegister();

  const signin = () => {
    replace(ROUTES.FLOW_CREDENTAIL, {
      screen: ROUTES.SIGN_IN,
    })
  }

  const onSubmit = (data: SignUpFormData) => {
    Keyboard.dismiss();
    register(data, {
      onSuccess: () => {
        setEmail(data.email);
        replace(ROUTES.FLOW_CREDENTAIL, {
          screen: ROUTES.VERIFY_EMAIL,
        })
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.imageplaceholder}>
          <Icon name='leaf' size={32} color={pallet.primary} />
        </View>

        <Typography style={styles.subtitle} level="headlineLarge">
          Join Tribe
        </Typography>
        <Typography style={styles.body} level="bodyMedium">
          Begin your journey into organic,
          grounded spaces.
        </Typography>

        <View style={styles.inputWrapper}>
          <View style={styles.textBlock}>
            <Typography level="labelSmall" style={styles.primaryText}>
              Username
            </Typography>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextInput
                  placeholder="Choose a name"
                  value={value}
                  onChangeText={onChange}
                  error={error?.message}
                />
              )}
            />
          </View>

          <View style={styles.textBlock}>
            <Typography level="labelSmall" style={styles.primaryText}>
              Email
            </Typography>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextInput
                  placeholder="hello@tribe-app.com"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={error?.message}
                />
              )}
            />
          </View>

          <View style={styles.textBlock}>
            <View style={styles.textRow}>
              <Typography level="labelSmall" style={styles.primaryText}>
                Password
              </Typography>
            </View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextInput
                  placeholder="********"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                  error={error?.message}
                />
              )}
            />
          </View>
        </View>

        <Button
          style={styles.button}
          title={isPending ? 'Creating account...' : 'Create Account'}
          level="primary"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />

        <View style={styles.signUpRow}>
          <Typography level="bodyMedium" style={styles.signUpText}>
            Already have an account?
          </Typography>
          <Typography
            onPress={signin}
            level="bodyMedium"
            style={styles.signUpLink}
          >
            Sign In
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
    width: 64,
    height: 64,
    backgroundColor: pallet.variant.neutral['100'],
    alignSelf: 'stretch',
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 96,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },

  subtitle: {
    fontFamily: fonts.literata.semiBold,
    color: pallet.variant.neutral['1000'],
    marginBottom: 12,
    textAlign: 'center',
  },

  body: {
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['1000'],
    textAlign: 'center',
    marginHorizontal: 20,
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

  errorText: {
    color: 'red',
    fontFamily: fonts.nunito.regular,
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

export default SignUpScreen;
