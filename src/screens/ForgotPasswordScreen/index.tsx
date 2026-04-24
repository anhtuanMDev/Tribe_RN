import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { pallet } from '../../config/pallet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon, InputCode, InputCodeCell, KeyboardAvoidingView, TextInput, Typography } from '../../components'
import { fonts } from '../../config/constants'
import { Controller, useForm } from 'react-hook-form'
import { ForgotPasswordFormData } from './type'
import { forgotPasswordSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { navigate, replace } from '../../navigation/utils'
import { ROUTES } from '../../navigation/params'

function ForgotPasswordScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      code: '',
    }
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
  }

  const signin = () => {
    replace(ROUTES.FLOW_CREDENTAIL, {
      screen: ROUTES.SIGN_IN,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Pressable onPress={signin} style={styles.navigationBlock}>
          <Icon name='arrow' size={24} color={pallet.primary} />
          <Typography style={styles.navigationText} level="bodyLarge">
            Back to login
          </Typography>
        </Pressable>

        <Typography level="displayLarge">
          Forgot Password?
        </Typography>
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

            <Typography level="labelLarge" style={styles.sendText}>
              Send Verification Code
            </Typography>
          </View>

          <View style={styles.textBlock}>
            <Typography level="labelSmall" style={styles.primaryText}>
              Verification Code
            </Typography>

            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <InputCode
                  length={6}
                  value={value}
                  onChangeText={onChange}
                  onFinsh={() => {
                    navigate(ROUTES.FLOW_CREDENTAIL, {
                      screen: ROUTES.SIGN_IN,
                    })
                  }}
                />
              )}
            />

            <View style={styles.resendBlock}>
              <Icon name='clock' color={pallet.variant.tertiary['600']} size={20} />
              <Typography level="labelLarge" style={styles.resendText}>
                Resend code in 60s
              </Typography>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallet.background,
    paddingHorizontal: 24,
    paddingTop: 37
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

  secondaryText: {
    color: pallet.secondary,
    fontFamily: fonts.nunito.bold,
  },

  sendText: {
    color: pallet.primary,
    textAlign: 'right',
    marginTop: 12,
    fontFamily: fonts.nunito.bold,
  },

  resendBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
    justifyContent: 'center',
  },

  resendText: {
    color: pallet.variant.tertiary['600'],
    fontFamily: fonts.nunito.bold,
    flexShrink: 1,
  }
})

export default ForgotPasswordScreen
