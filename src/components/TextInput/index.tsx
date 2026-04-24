import React from 'react';
import {
  BlurEvent,
  FocusEvent,
  TextInput as NativeTextInput,
  StyleSheet,
  TextInputProps,
  TextProps,
  View,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { Typography } from '../Typography';

export type CustomTextInputProps = {
  lead?: React.ReactNode;
  action?: React.ReactNode;
  textStyle?: TextProps['style'];
  error?: string;
} & TextInputProps;

function TextInput({
  lead,
  error,
  action,
  textStyle,
  style: containerStyle,
  onFocus: onInputFocused,
  onBlur: onInputBlur,
  ...rest
}: CustomTextInputProps) {
  const focusProgress = useSharedValue(0);

  const onFocus = (e: FocusEvent) => {
    focusProgress.value = withTiming(1, { duration: 200 });
    onInputFocused?.(e);
  };

  const onBlur = (e: BlurEvent) => {
    focusProgress.value = withTiming(0, { duration: 200 });
    onInputBlur?.(e);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      [pallet.variant.neutral['300'], pallet.primary],
    ),
    borderWidth: withTiming(focusProgress.value === 1 ? 2 : 1, {
      duration: 200,
    }),
  }));

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        {lead}
        <NativeTextInput
          onBlur={onBlur}
          onFocus={onFocus}
          style={[styles.input, textStyle]}
          {...rest}
        />
        {action}
      </Animated.View>
      {error && <Typography level="linkSmall" style={styles.error}>{error}</Typography>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    paddingVertical: 17,
    paddingHorizontal: 21,
    flexShrink: 1,
    borderWidth: 1,
    borderRadius: 16,
  },

  input: {
    color: pallet.variant.neutral['900'],
    height: 22,
    fontFamily: fonts.nunito.regular,
    fontSize: 16,
    flexGrow: 1,
    lineHeight: 22,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },

  error: {
    color: pallet.error,
    fontFamily: fonts.nunito.regular,
    marginTop: 4,
    marginLeft: 4,
  },
});

export { TextInput };
