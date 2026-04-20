import { StyleSheet } from 'react-native';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';

const typographyStyle = StyleSheet.create({
  /** ---------------- DISPLAY ---------------- */
  displayLarge: {
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  displayMedium: {
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  displaySmall: {
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  displayItalic: {
    fontSize: 48,
    lineHeight: 48,
    letterSpacing: 0,
    fontFamily: fonts.literata.extraLightItalic,
    color: pallet.variant.neutral['900'],
  },

  /** ---------------- HEADLINE ---------------- */
  headlineLarge: {
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  headlineMedium: {
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
    fontFamily: fonts.literata.regular,
    color: pallet.variant.neutral['900'],
  },
  headlineItalic: {
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0,
    fontFamily: fonts.literata.extraLightItalic,
    color: pallet.variant.neutral['900'],
  },

  /** ---------------- BODY ---------------- */
  bodyLarge: {
    fontSize: 18,
    lineHeight: 30,
    letterSpacing: 0,
    fontFamily: fonts.nunito.regular,
    color: pallet.variant.neutral['900'],
  },
  bodyMedium: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: fonts.nunito.regular,
    color: pallet.variant.neutral['900'],
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: fonts.nunito.regular,
    color: pallet.variant.neutral['900'],
  },

  /** ---------------- LABEL ---------------- */
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['900'],
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['900'],
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['900'],
  },

  /** ---------------- LINK ---------------- */
  linkLarge: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontFamily: fonts.nunito.regular,
    textDecorationLine: 'underline',
    color: pallet.primary,
  },
  linkMedium: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    fontFamily: fonts.nunito.bold,
    textDecorationLine: 'underline',
    color: pallet.primary,
  },
  linkSmall: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
    fontFamily: fonts.nunito.bold,
    textDecorationLine: 'underline',
    color: pallet.primary,
  },

  /** ---------------- BUTTON ---------------- */
  button: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '500',
    fontFamily: fonts.nunito.bold,
    color: pallet.variant.neutral['0'],
  },
});

export default typographyStyle;
