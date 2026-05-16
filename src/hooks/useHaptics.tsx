import { useCallback } from 'react';
import { Platform } from 'react-native';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

type HapticType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error'
  | 'selection';

export function useHaptics() {
  const trigger = useCallback((type: HapticType = 'light') => {
    if (Platform.OS === 'web') return;

    const hapticMap: Record<HapticType, string> = {
      light: 'impactLight',
      medium: 'impactMedium',
      heavy: 'impactHeavy',
      success: 'notificationSuccess',
      warning: 'notificationWarning',
      error: 'notificationError',
      selection: 'selection',
    };

    try {
      ReactNativeHapticFeedback.trigger(
        hapticMap[type] as HapticFeedbackTypes,
        {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        },
      );
    } catch (_) {}
  }, []);

  return {
    light: useCallback(() => trigger('light'), [trigger]),
    medium: useCallback(() => trigger('medium'), [trigger]),
    heavy: useCallback(() => trigger('heavy'), [trigger]),
    success: useCallback(() => trigger('success'), [trigger]),
    warning: useCallback(() => trigger('warning'), [trigger]),
    error: useCallback(() => trigger('error'), [trigger]),
    selection: useCallback(() => trigger('selection'), [trigger]),
    trigger,
  };
}
