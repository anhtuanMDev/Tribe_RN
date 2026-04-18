import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import typographyStyle from './styles';
import { pallet } from '../../config/pallet';

export type TypographyProps = {
  level: keyof typeof typographyStyle;
  style?: TextProps['style'];
} & TextProps;

function Typography({level, style: customStyle, disabled, ...rest}: TypographyProps) {
  return <Text style={[typographyStyle[level], customStyle, disabled && styles.disable]} {...rest} />;
}

const styles = StyleSheet.create({
  disable: {
    color: pallet.neutral,
  }
})

export default Typography;
