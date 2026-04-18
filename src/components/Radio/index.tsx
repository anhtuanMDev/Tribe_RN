import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { pallet } from '../../config/pallet';
import { convertAlpha } from '../../utils/assets';
import Typography from '../Typography';
import { RadioContext, useRadio } from './context';
import { RADIO_SIZE } from './mock';
import { RadioGroupProps, RadioItemProps, RadioLabelProps } from './type';
import { scheduleOnUI } from 'react-native-worklets';

// ─── Radio.Group ─────────────────────────────────────────────────────────────

function Group({
  value,
  onChange,
  name,
  children,
  style,
  disabled = false,
}: RadioGroupProps) {
  return (
    <RadioContext.Provider value={{ value, onChange, name, disabled }}>
      <View style={style}>{children}</View>
    </RadioContext.Provider>
  );
}

// ─── Radio.Item ───────────────────────────────────────────────────────────────

function Item({ value, style, label }: RadioItemProps) {
  const { value: selected, onChange, disabled } = useRadio();
  const isSelected = selected.value === value;
  console.log(
    `[Radio.Item] render — value: ${value}, selected.value: ${selected.value}, isSelected: ${isSelected}`,
  );

  const scale = useSharedValue(1);
  const isMounted = useRef(false); // ← skip mount trigger

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    scheduleOnUI(() => {
      'worklet';
      cancelAnimation(scale);

      if (isSelected) {
        scale.value = withSequence(
          withTiming(1.2, { duration: 120 }),
          withSpring(1),
        );
      } else {
        scale.value = withSequence(
          withTiming(0.5, { duration: 120 }),
          withSpring(1),
        );
      }
    });
  }, [isSelected, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    console.log('[Radio.Item] animatedStyle eval — scale:', scale.value);
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handleSelected = () => {
    if (!disabled) onChange({ label, value });
  };

  return (
    <Pressable
      onPress={handleSelected}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
      style={[styles.item, style]}
    >
      <Animated.View style={animatedStyle}>
        <View
          style={[
            styles.outer,
            isSelected && styles.outerSelected,
            disabled && styles.disabled,
          ]}
        >
          {isSelected && (
            <View style={[styles.inner, disabled && styles.disabledInner]} />
          )}
        </View>
      </Animated.View>
      {label ? (
        <Typography disabled={disabled} level={'labelMedium'}>
          {label}
        </Typography>
      ) : null}
    </Pressable>
  );
}

// ─── Radio.Label ──────────────────────────────────────────────────────────────

function Label({ children, style, disable }: RadioLabelProps) {
  return (
    <Typography disabled={disable} level={'labelMedium'} style={style}>
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
  outer: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: 2,
    borderColor: convertAlpha(30, pallet.variant.neutral['500']),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outerSelected: {
    borderColor: pallet.primary,
    backgroundColor: pallet.variant.neutral['0'],
  },
  inner: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: pallet.primary,
    borderRadius: RADIO_SIZE,
  },
  disabled: {
    opacity: 0.4,
    borderColor: pallet.variant.neutral['200'],
  },
  disabledInner: {
    borderColor: pallet.variant.neutral['200'],
  },
});

// ─── Export ───────────────────────────────────────────────────────────────────

export const Radio = { Group, Item, Label };
