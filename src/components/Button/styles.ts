import { StyleSheet } from 'react-native';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils/assets';

const buttonStyle = StyleSheet.create({
  primary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.primary,
    overflow: 'hidden',
  },

  secondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.secondary,
    overflow: 'hidden',
  },

  tertiary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.tertiary,
    overflow: 'hidden',
  },

  error: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.error,
    overflow: 'hidden',
  },

  outline: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: pallet.primary,
    backgroundColor: pallet.background,
    paddingHorizontal: 24,
    paddingVertical: 12,
    overflow: 'hidden',
  },

  // icon 14x14
  icon: {
    padding: 17,
    borderRadius: 360,
    backgroundColor: pallet.primary,
    overflow: 'hidden',
  },

  // icon 20x20
  iconOutline: {
    padding: 13,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: convertAlpha(30, pallet.variant.neutral['500']),
    backgroundColor: pallet.variant.neutral['200'],
    overflow: 'hidden',
  },

  ghost: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: pallet.background,
    overflow: 'hidden',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
});

export default buttonStyle;
