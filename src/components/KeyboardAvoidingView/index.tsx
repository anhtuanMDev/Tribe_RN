import {
  KeyboardAvoidingViewProps,
  KeyboardAvoidingView as NativeKeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

export function KeyboardAvoidingView({
  style,
  children,
  ...props
}: KeyboardAvoidingViewProps) {
  return (
    <NativeKeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      {...props}
    >
      <ScrollView
        overScrollMode="never"
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </NativeKeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
