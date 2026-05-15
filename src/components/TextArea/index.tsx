import React, { useRef, useState, useCallback } from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface AnimatedTextAreaProps
  extends Omit<TextInputProps, 'multiline'> {
  /** Floating label shown above the field */
  label?: string;
  /** Helper text shown below the field */
  helperText?: string;
  /** Error message — switches the field into error state */
  error?: string;
  /** Max character count. Shows counter when provided */
  maxLength?: number;
  /** Minimum visible lines (default: 3) */
  minLines?: number;
  /** Maximum lines before scrolling kicks in (default: 8) */
  maxLines?: number;
  /** Whether the field auto-grows with content (default: true) */
  autoGrow?: boolean;
  /** Controlled value */
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const LINE_HEIGHT = 22;
const PADDING_VERTICAL = 14;
const LABEL_FONT_SIZE = 16;
const LABEL_SMALL_FONT_SIZE = 12;

const COLORS = {
  border: '#D1D5DB',
  borderFocused: '#111827',
  borderError: '#EF4444',
  label: '#6B7280',
  labelFocused: '#111827',
  labelError: '#EF4444',
  text: '#111827',
  helper: '#9CA3AF',
  error: '#EF4444',
  counter: '#9CA3AF',
  counterError: '#EF4444',
  background: '#FFFFFF',
  clearButton: '#9CA3AF',
};

const TIMING_CONFIG = { duration: 180, easing: Easing.out(Easing.cubic) };
const SPRING_CONFIG = { damping: 20, stiffness: 260 };

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const TextArea = React.forwardRef<TextInput, AnimatedTextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength,
      minLines = 3,
      maxLines = 8,
      autoGrow = true,
      value,
      onChangeText,
      onFocus,
      onBlur,
      style,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const combinedRef = (ref as React.RefObject<TextInput>) ?? inputRef;

    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(value ?? '');

    const controlled = value !== undefined;
    const currentValue = controlled ? value : internalValue;
    const charCount = currentValue.length;
    const hasContent = charCount > 0;
    const isError = !!error;

    // ── Heights ──────────────────────────────
    const minHeight = minLines * LINE_HEIGHT + PADDING_VERTICAL * 2;
    const maxHeight = maxLines * LINE_HEIGHT + PADDING_VERTICAL * 2;
    const [inputHeight, setInputHeight] = useState(minHeight);

    const handleContentSizeChange = useCallback(
      (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        if (!autoGrow) return;
        const newHeight = Math.min(
          Math.max(
            e.nativeEvent.contentSize.height + PADDING_VERTICAL * 2,
            minHeight,
          ),
          maxHeight,
        );
        setInputHeight(newHeight);
      },
      [autoGrow, minHeight, maxHeight],
    );

    // ── Shared values ────────────────────────
    const focusProgress = useSharedValue(0); // 0 = blurred, 1 = focused
    const labelProgress = useSharedValue(hasContent ? 1 : 0); // 0 = resting, 1 = floated
    const shakeOffset = useSharedValue(0);
    const errorOpacity = useSharedValue(isError ? 1 : 0);

    // ── Focus handlers ───────────────────────
    const handleFocus = useCallback(() => {
      setIsFocused(true);
      focusProgress.value = withTiming(1, TIMING_CONFIG);
      labelProgress.value = withTiming(1, TIMING_CONFIG);
      onFocus?.();
    }, [focusProgress, labelProgress, onFocus]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      focusProgress.value = withTiming(0, TIMING_CONFIG);
      if (!currentValue) {
        labelProgress.value = withTiming(0, TIMING_CONFIG);
      }
      onBlur?.();
    }, [focusProgress, labelProgress, currentValue, onBlur]);

    // ── Text change ──────────────────────────
    const handleChangeText = useCallback(
      (text: string) => {
        if (!controlled) setInternalValue(text);
        onChangeText?.(text);
      },
      [controlled, onChangeText],
    );

    // ── Clear ────────────────────────────────
    const handleClear = useCallback(() => {
      if (!controlled) setInternalValue('');
      onChangeText?.('');
      combinedRef.current?.focus();
      labelProgress.value = withTiming(1, TIMING_CONFIG); // keep floated on focus
    }, [controlled, onChangeText, combinedRef, labelProgress]);

    // ── Error shake ──────────────────────────
    React.useEffect(() => {
      if (isError) {
        errorOpacity.value = withTiming(1, { duration: 200 });
        shakeOffset.value = withSpring(0, SPRING_CONFIG, () => {
          shakeOffset.value = withSpring(8, SPRING_CONFIG, () => {
            shakeOffset.value = withSpring(-8, SPRING_CONFIG, () => {
              shakeOffset.value = withSpring(4, SPRING_CONFIG, () => {
                shakeOffset.value = withSpring(0, SPRING_CONFIG);
              });
            });
          });
        });
      } else {
        errorOpacity.value = withTiming(0, { duration: 200 });
      }
    }, [isError, shakeOffset, errorOpacity]);

    // ── Animated styles ──────────────────────
    const containerAnimStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: shakeOffset.value }],
    }));

    const borderAnimStyle = useAnimatedStyle(() => {
      const borderColor = interpolateColor(
        focusProgress.value,
        [0, 1],
        [
          isError ? COLORS.borderError : COLORS.border,
          isError ? COLORS.borderError : COLORS.borderFocused,
        ],
      );
      const borderWidth = interpolate(focusProgress.value, [0, 1], [1, 2]);
      return { borderColor, borderWidth };
    });

    const labelAnimStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        labelProgress.value,
        [0, 1],
        [0, -(LABEL_FONT_SIZE / 2 + PADDING_VERTICAL - 2)],
      );
      const scale = interpolate(
        labelProgress.value,
        [0, 1],
        [1, LABEL_SMALL_FONT_SIZE / LABEL_FONT_SIZE],
      );
      const color = interpolateColor(
        focusProgress.value,
        [0, 1],
        [
          isError ? COLORS.labelError : COLORS.label,
          isError ? COLORS.labelError : COLORS.labelFocused,
        ],
      );
      return { transform: [{ translateY }, { scale }], color };
    });

    const helperAnimStyle = useAnimatedStyle(() => ({
      opacity: withTiming(isError ? 0 : 1, TIMING_CONFIG),
      transform: [{ translateY: withTiming(isError ? -4 : 0, TIMING_CONFIG) }],
    }));

    const errorAnimStyle = useAnimatedStyle(() => ({
      opacity: errorOpacity.value,
      transform: [
        { translateY: interpolate(errorOpacity.value, [0, 1], [4, 0]) },
      ],
    }));

    const clearAnimStyle = useAnimatedStyle(() => ({
      opacity: withTiming(hasContent && isFocused ? 1 : 0, TIMING_CONFIG),
      transform: [
        { scale: withSpring(hasContent && isFocused ? 1 : 0.6, SPRING_CONFIG) },
      ],
    }));

    // ── Input height animation ───────────────
    const inputContainerAnimStyle = useAnimatedStyle(() => ({
      height: autoGrow ? withSpring(inputHeight, SPRING_CONFIG) : undefined,
    }));

    return (
      <View style={styles.wrapper}>
        {/* Shake + border container */}
        <Animated.View style={[styles.fieldContainer, containerAnimStyle]}>
          <Animated.View style={[styles.border, borderAnimStyle]}>
            {/* Floating label */}
            {label && (
              <Animated.Text
                style={[styles.label, labelAnimStyle]}
                numberOfLines={1}
                onPress={() => combinedRef.current?.focus()}
              >
                {label}
              </Animated.Text>
            )}

            {/* Auto-grow input */}
            <Animated.View
              style={[
                styles.inputContainer,
                inputContainerAnimStyle,
                !autoGrow && { height: minHeight },
              ]}
            >
              <AnimatedTextInput
                ref={combinedRef}
                multiline
                scrollEnabled={autoGrow ? inputHeight >= maxHeight : true}
                value={currentValue}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onContentSizeChange={handleContentSizeChange}
                maxLength={maxLength}
                style={[
                  styles.input,
                  label ? styles.inputWithLabel : undefined,
                  style,
                ]}
                placeholderTextColor={COLORS.helper}
                textAlignVertical="top"
                {...rest}
              />
            </Animated.View>

            {/* Clear button */}
            <Animated.View style={[styles.clearButton, clearAnimStyle]}>
              <Pressable onPress={handleClear} hitSlop={8}>
                <Text style={styles.clearIcon}>✕</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </Animated.View>

        {/* Footer row */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            {helperText && (
              <Animated.Text style={[styles.helperText, helperAnimStyle]}>
                {helperText}
              </Animated.Text>
            )}
            {error && (
              <Animated.Text style={[styles.errorText, errorAnimStyle]}>
                {error}
              </Animated.Text>
            )}
          </View>

          {maxLength && (
            <Text
              style={[
                styles.counter,
                charCount > maxLength * 0.9 && styles.counterWarning,
              ]}
            >
              {charCount}/{maxLength}
            </Text>
          )}
        </View>
      </View>
    );
  },
);

export { TextArea };

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  fieldContainer: {
    width: '100%',
  },
  border: {
    borderRadius: 10,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    position: 'relative',
  },
  inputContainer: {
    overflow: 'hidden',
  },
  label: {
    position: 'absolute',
    top: PADDING_VERTICAL,
    left: 14,
    fontSize: LABEL_FONT_SIZE,
    color: COLORS.label,
    backgroundColor: COLORS.background,
    paddingHorizontal: 2,
    zIndex: 10,
    transformOrigin: 'left center',
  },
  inputWithLabel: {
    paddingTop: PADDING_VERTICAL + LABEL_SMALL_FONT_SIZE,
  },
  input: {
    fontSize: 16,
    color: COLORS.text,
    paddingHorizontal: 14,
    paddingVertical: PADDING_VERTICAL,
    lineHeight: LINE_HEIGHT,
    ...Platform.select({
      android: { textAlignVertical: 'top' },
    }),
  },
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  clearIcon: {
    fontSize: 13,
    color: COLORS.clearButton,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  footerLeft: {
    flex: 1,
    marginRight: 8,
    position: 'relative',
  },
  helperText: {
    fontSize: 12,
    color: COLORS.helper,
    lineHeight: 16,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    lineHeight: 16,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  counter: {
    fontSize: 12,
    color: COLORS.counter,
  },
  counterWarning: {
    color: COLORS.counterError,
  },
});
