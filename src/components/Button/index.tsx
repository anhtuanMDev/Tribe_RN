import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { pallet } from '../../config/pallet';
import buttonStyle from './styles';

export type ButtonProps = {
  level: keyof typeof buttonStyle;
  disableStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
} & Omit<PressableProps, 'style'>;

function Button({
  disabled,
  fullWidth,
  disableStyle,
  level = 'primary',
  style: customStyle,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      {...rest}
      disabled={disabled}
      style={[
        styles.shadow,
        buttonStyle[level],
        fullWidth && styles.fullWidth,
        customStyle,
        disabled ? (disableStyle ? disableStyle : styles.disable) : undefined,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },

  shadow: {
    shadowColor: pallet.variant.neutral['1000'],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.0,
    elevation: 1,
  },

  disable: {
    opacity: 0.5,
  },
});

export default Button;
