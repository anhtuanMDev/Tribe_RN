import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils/assets';
import { CheckboxContext, useCheckbox } from './context';
import { BOX_SIZE } from './mock';
import {
  CheckboxGroupProps,
  CheckboxItemProps,
  CheckboxLabelProps,
} from './type';
import { Typography } from '../Typography';

// ─── Useage
// const [checked, setChecked] = useState<SelectItemType[]>([]);

// const handleChange = (item: SelectItemType) => {
//   setChecked(prev =>
//     prev.some(v => v.value === item.value)
//       ? prev.filter(v => v.value !== item.value)  // uncheck
//       : [...prev, item]                            // check
//   );
// };

// <Checkbox.Group values={checked} onChange={handleChange} name="test">
//   <Checkbox.Item value={{ label: 'Option A', value: 1 }} label="Option A" />
//   <Checkbox.Item value={{ label: 'Option B', value: 2 }} label="Option B" />
// </Checkbox.Group>

// ─── Checkbox.Group ───────────────────────────────────────────────────────────

function Group({
  values,
  onChange,
  name,
  children,
  style,
  disabled = false,
}: CheckboxGroupProps) {
  return (
    <CheckboxContext.Provider value={{ values, onChange, name, disabled }}>
      <View style={style}>{children}</View>
    </CheckboxContext.Provider>
  );
}

// ─── Checkmark SVG path (pure View-based) ─────────────────────────────────────

function Checkmark() {
  return <View style={styles.checkmark} />;
}

// ─── Checkbox.Item ────────────────────────────────────────────────────────────

function Item({ value, style, label }: CheckboxItemProps) {
  const { values, onChange, disabled } = useCheckbox();
  const isChecked = values.some(v => v.value === value.value);
  const handleChecked = () => !disabled && onChange(value);

  return (
    <Pressable
      onPress={handleChecked}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      style={[styles.item, style]}
    >
      <View
        style={[
          styles.box,
          isChecked && styles.boxChecked,
          disabled && styles.boxDisabled,
          disabled && isChecked && styles.boxDisabledChecked,
        ]}
      >
        {isChecked && <Checkmark />}
      </View>
      {label ? (
        <Typography disabled={disabled} level={'labelMedium'}>
          {label}
        </Typography>
      ) : null}
    </Pressable>
  );
}

// ─── Checkbox.Label ───────────────────────────────────────────────────────────

function Label({ children, style, disabled }: CheckboxLabelProps) {
  return (
    <Typography disabled={disabled} level={'labelMedium'} style={style}>
      {children}
    </Typography>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  // Styles
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: convertAlpha(30, pallet.variant.neutral['500']),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: pallet.primary,
    borderColor: pallet.primary,
  },
  boxDisabled: {
    opacity: 0.4,
    borderColor: pallet.variant.neutral['400'],
    backgroundColor: pallet.variant.neutral['100'],
  },
  boxDisabledChecked: {
    // checked + disabled: keep shape but wash out the primary color
    opacity: 0.4,
    backgroundColor: pallet.variant.neutral['400'],
    borderColor: pallet.variant.neutral['400'],
  },

  checkmark: {
    width: 5,
    height: 9,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: pallet.variant.neutral['0'],
    marginBottom: 2,
    transform: [{ rotate: '45deg' }],
  },
});

// ─── Export ───────────────────────────────────────────────────────────────────

export const Checkbox = { Group, Item, Label };
