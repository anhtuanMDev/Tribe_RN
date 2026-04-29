import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Keyboard,
    KeyboardEvent,
    Platform,
    ScrollView,
    ScrollViewProps,
    StyleSheet,
} from 'react-native';

interface KeyboardAwareViewProps extends ScrollViewProps {
    children: React.ReactNode;
}

export function KeyboardAwareView({ children, style, ...props }: KeyboardAwareViewProps) {
    const scrollRef = useRef<ScrollView>(null);
    const paddingAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const onShow = (e: KeyboardEvent) => {
            Animated.timing(paddingAnim, {
                toValue: e.endCoordinates.height,
                duration: e.duration || 250,
                useNativeDriver: false,
            }).start();

            // scroll to end so focused input is visible
            setTimeout(() => {
                scrollRef.current?.scrollToEnd({ animated: true });
            }, 100);
        };

        const onHide = (e: KeyboardEvent) => {
            Animated.timing(paddingAnim, {
                toValue: 0,
                duration: e.duration || 250,
                useNativeDriver: false,
            }).start();
        };

        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, onShow);
        const hideSub = Keyboard.addListener(hideEvent, onHide);

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, [paddingAnim]);

    return (
        <ScrollView
            ref={scrollRef}
            style={[styles.container, style]}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            {...props}
        >
            <Animated.View style={{ paddingBottom: paddingAnim }}>
                {children}
            </Animated.View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});