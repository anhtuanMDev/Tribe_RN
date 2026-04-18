import { StyleSheet } from 'react-native';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils/assets';

const buttonStyle = StyleSheet.create({
  primary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.primary,
  },

  secondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.secondary,
  },

  tertiary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.tertiary,
  },

  error: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.error,
  },

  outline: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: pallet.primary,
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  // icon 14x14
  icon: {
    padding: 17,
    borderRadius: Infinity,
    backgroundColor: pallet.primary,
  },

  // icon 20x20
  iconOutline: {
    padding: 13,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: convertAlpha(30, pallet.variant.neutral['500']),
    backgroundColor: pallet.variant.neutral['200'],
  },
});

export default buttonStyle;
