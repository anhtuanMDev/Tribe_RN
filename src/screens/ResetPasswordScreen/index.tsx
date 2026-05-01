import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRoute, RouteProp } from '@react-navigation/native';

import { Button, Icon, KeyboardAwareView, Typography } from '../../components';
import { TextInput } from '../../components/TextInput';
import { convertAlpha } from '../../utils';
import { pallet } from '../../config/pallet';
import { fonts, VerificationPurpose } from '../../config/constants';
import { FlowCredential } from '../../navigation/types';
import { ROUTES } from '../../navigation/params';

// ─── Schema ──────────────────────────────────────────────────────────────────

const baseSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[0-9]/, 'Must contain a number'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(data => data.currentPassword !== data.newPassword, {
    message: 'New password must differ from current password',
    path: ['newPassword'],
  });

type BaseFormValues = z.infer<typeof baseSchema>;
type ChangeFormValues = z.infer<typeof changePasswordSchema>;
type FormValues = BaseFormValues | ChangeFormValues;

// ─── Screen ───────────────────────────────────────────────────────────────────

const ResetPasswordScreen = () => {
  const route =
    useRoute<RouteProp<FlowCredential, typeof ROUTES.RESET_PASSWORD>>();
  const { purpose } = route.params;

  const isChangePassword = purpose === VerificationPurpose.CHANGE_PASSWORD;
  const schema = isChangePassword ? changePasswordSchema : baseSchema;

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isChangePassword
      ? { currentPassword: '', newPassword: '', confirmPassword: '' }
      : { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // call your API here
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareView>
        <Button
          level="ghost"
          focusable={false}
          style={styles.backButton}
          leftIcon={<Icon name="arrow" size={24} color={pallet.primary} />}
        />

        <View style={styles.iconContainer}>
          <Icon size={40} name="lock_reset" color={pallet.primary} />
        </View>

        <Typography style={styles.subtitle} level="headlineLarge">
          Reset Password
        </Typography>

        <Typography style={styles.body} level="bodyMedium">
          Ensure your account stays secure by choosing a strong, unique
          password.
        </Typography>

        {/* Current password — only for change_password purpose */}
        {isChangePassword && (
          <Animated.View
            entering={FadeInDown.duration(300).springify()}
            exiting={FadeOutUp.duration(200)}
            layout={LinearTransition.springify()}
            style={styles.fieldWrapper}
          >
            <Typography style={styles.label} level="labelMedium">
              Current Password
            </Typography>
            <Controller
              control={control}
              name="currentPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter current password"
                  secureTextEntry={!showCurrent}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value as string}
                  error={(errors as any).currentPassword?.message}
                  action={
                    <Button
                      level="ghost"
                      style={styles.eyeButton}
                      onPress={() => setShowCurrent(p => !p)}
                    />
                  }
                />
              )}
            />
          </Animated.View>
        )}

        {/* New password */}
        <Animated.View
          layout={LinearTransition.springify()}
          style={styles.fieldWrapper}
        >
          <Typography style={styles.label} level="labelMedium">
            New Password
          </Typography>
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter new password"
                secureTextEntry={!showNew}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.newPassword?.message}
                action={
                  <Button
                    level="ghost"
                    style={styles.eyeButton}
                    onPress={() => setShowNew(p => !p)}
                  />
                }
              />
            )}
          />
        </Animated.View>

        {/* Confirm password */}
        <Animated.View
          layout={LinearTransition.springify()}
          style={styles.fieldWrapper}
        >
          <Typography style={styles.label} level="labelMedium">
            Confirm Password
          </Typography>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Re-enter new password"
                secureTextEntry={!showConfirm}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.confirmPassword?.message}
                action={
                  <Button
                    level="ghost"
                    style={styles.eyeButton}
                    onPress={() => setShowConfirm(p => !p)}
                  />
                }
              />
            )}
          />
        </Animated.View>

        <Button
          level="primary"
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
          title="Reset Password"
        />
      </KeyboardAwareView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallet.background,
    paddingHorizontal: 24,
  },

  backButton: { backgroundColor: 'transparent' },

  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: convertAlpha(30, pallet.variant.tertiary['300']),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 37,
    marginBottom: 40,
    alignSelf: 'center',
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
    marginBottom: 32,
  },

  fieldWrapper: {
    marginBottom: 16,
  },

  label: {
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['700'],
    marginBottom: 6,
    marginLeft: 4,
  },

  eyeButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },

  submitButton: {
    marginTop: 32,
  },
});
