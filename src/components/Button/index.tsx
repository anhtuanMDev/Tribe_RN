import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';
import { pallet } from '../../config/pallet';
import buttonStyle from './styles';
import Typography from '../Typography';

export type ButtonProps = {
  title?: string;
  textStyle?: StyleProp<TextStyle>;
  level: keyof typeof buttonStyle;
  disableStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
} & Omit<PressableProps, 'style'>;

function Button({
  title,
  disabled,
  leftIcon,
  rightIcon,
  textStyle,
  fullWidth,
  disableStyle,
  level = 'primary',
  style: customStyle,
  ...rest
}: ButtonProps) {

  console.log('Skip', title);

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
      ]}>

      {leftIcon}
      {title && <Typography level="button" style={[styles.buttonText, textStyle]}>
        {title}
      </Typography>}
      {rightIcon}

    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },

  shadow: {
    alignSelf: 'flex-start',
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

  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Button;
