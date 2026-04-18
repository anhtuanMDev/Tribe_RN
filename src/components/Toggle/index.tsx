import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming
} from 'react-native-reanimated';
import { scheduleOnUI } from 'react-native-worklets';
import { pallet } from '../../config/pallet';

type ToggleProps = {
  value?: boolean;
  onChange?: (next: boolean) => Promise<void> | void;
  disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

function Toggle({ value = false, onChange, disabled }: ToggleProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [loading, setLoading] = useState(false);

  // ===== Reanimated shared values =====
  const progress = useSharedValue(value ? 1 : 0); // 0 -> off, 1 -> on
  const thumbWidth = useSharedValue(24);
  const translateX = useSharedValue(value ? 20 : 0);

  // Sync with external value
  useEffect(() => {
    if (internalValue !== value) {
      setInternalValue(value);
      scheduleOnUI(() => {
        'worklet';
        progress.value = withTiming(value ? 1 : 0, { duration: 200 });
        translateX.value = withTiming(value ? 20 : 0, { duration: 200 });
      });
    }
  }, [internalValue, progress, translateX, value]);

  const handlePress = async () => {
    if (disabled || loading) return;

    const prev = internalValue;
    const next = !prev;

    // optimistic update
    setInternalValue(next);

    // ===== Animation sequence =====
    scheduleOnUI((nextValue: boolean) => {
      'worklet';

      const toX = nextValue ? 20 : 0;

      // 1. stretch -> 2. move -> 3. shrink
      thumbWidth.value = withSequence(
        withTiming(44, { duration: 120 }), // stretch full
        withTiming(44, { duration: 80 }), // hold while moving
        withTiming(24, { duration: 120 }), // shrink back
      );

      translateX.value = withTiming(toX, { duration: 200 });

      // container color progress
      progress.value = withTiming(nextValue ? 1 : 0, { duration: 200 });
    }, next);

    try {
      setLoading(true);
      await onChange?.(next);
    } catch (err) {
      console.log('toggle error:', err);
      setInternalValue(prev);
    } finally {
      setLoading(false);
    }
  };

  // ===== Animated styles =====

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [pallet.variant.neutral['100'], pallet.variant.primary['400']],
      ),
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: thumbWidth.value,
      transform: [{ translateX: translateX.value }],
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [pallet.variant.neutral['0'], pallet.variant.primary['700']],
      ),
    };
  });

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[
        styles.container,
        containerAnimatedStyle,
        disabled && styles.disabled,
      ]}
    >
      <AnimatedView style={[styles.thumb, thumbAnimatedStyle]} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    padding: 3,
    overflow: 'hidden', // important for stretch effect
  },
  disabled: {
    opacity: 0.5,
  },
  thumb: {
    height: 24,
    borderRadius: 12,
  },
});

export default Toggle;
