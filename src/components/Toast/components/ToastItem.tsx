/**
 * ToastItem.tsx
 *
 * Renders a single toast card. Aware of its depth in the deck.
 *
 * depthIndex:
 *   0 → front (newest, full size, full opacity, z-index highest)
 *   1 → middle (scaled down, peeking behind)
 *   2 → back  (smallest, dimmest)
 *
 * The depth-based scale + translateY is handled entirely inside
 * useToastAnimation — this component is just a layout shell.
 *
 * Dismiss flow:
 *   1. handleAnimatedDismiss() → animateOut() resolves
 *   2. dismissToast(id) removes from store
 *   3. Other toasts animate to their new depth positions automatically
 *      (their depthIndex prop changes → useEffect in hook fires)
 */

import React, { useCallback, useEffect, useRef } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';
import { ToastItem } from '../type';
import { dismissToast, pendingDismiss } from '../../../store';
import { useToastAnimation } from '../hooks';
import { useSelector } from '@legendapp/state/react';

// ─── Variant config ───────────────────────────────────────────────────────────

const VARIANT = {
    success: { accent: '#4ADE80', bg: '#052e16', glyph: '✓' },
    error: { accent: '#F87171', bg: '#2d0a0a', glyph: '✕' },
    warning: { accent: '#FBBF24', bg: '#2d1a00', glyph: '!' },
    info: { accent: '#60A5FA', bg: '#0a1a2d', glyph: 'i' },
    custom: { accent: '#A78BFA', bg: '#150d2d', glyph: '★' },
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

interface ToastItemProps {
    item: ToastItem;
    /**
     * 0 = frontmost (newest), increases toward back.
     * Used to compute deck scale/translate/opacity.
     */
    depthIndex: number;
    /** Total toasts in this position's visible stack (for z-index) */
    stackSize: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ToastItemComponent = React.memo(
    ({ item, depthIndex, stackSize }: ToastItemProps) => {
        const isDismissing = useRef(false);
        const shouldDismiss = useSelector(() => !!pendingDismiss.get()[item.id]);

        // Immediate store removal — called AFTER exit animation completes
        const handleDismiss = useCallback(() => {
            if (isDismissing.current) return;
            isDismissing.current = true;
            dismissToast(item.id);
        }, [item.id]);

        const { gesture, animatedStyle, animateOut } = useToastAnimation({
            animation: item.animation,
            position: item.position,
            swipeable: item.swipeable,
            depthIndex,
            onDismiss: handleDismiss, // used by swipe gesture's runOnJS
        });

        // Public dismiss: run exit animation, THEN remove from store
        const handleAnimatedDismiss = useCallback(async () => {
            if (isDismissing.current) return;
            await animateOut();
            handleDismiss();
        }, [animateOut, handleDismiss]);

        useEffect(() => {
            if (shouldDismiss) handleAnimatedDismiss();
        }, [shouldDismiss, handleAnimatedDismiss]);

        const v = VARIANT[item.variant];

        // Custom renderer — still gets gesture wrapper for swipe support
        if (item.renderCustom) {
            return (
                <GestureDetector gesture={gesture}>
                    <Animated.View
                        style={[
                            styles.absolute,
                            { zIndex: stackSize - depthIndex },
                            animatedStyle,
                        ]}
                    >
                        {item.renderCustom(item, handleAnimatedDismiss)}
                    </Animated.View>
                </GestureDetector>
            );
        }

        return (
            <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                        styles.absolute,
                        styles.card,
                        {
                            zIndex: stackSize - depthIndex,
                            borderColor: v.accent + '40',
                        },
                        item.containerStyle,
                        animatedStyle,
                    ]}
                    accessible
                    accessibilityRole="alert"
                    accessibilityLabel={`${item.variant}: ${item.title ?? ''} ${item.message ?? ''}`}
                >
                    {/* Subtle accent glow strip */}
                    <View style={[styles.accentStrip, { backgroundColor: v.accent }]} />

                    {/* Icon badge */}
                    <View style={[styles.badge, { backgroundColor: v.bg }]}>
                        {item.icon ?? (
                            <Text style={[styles.glyph, { color: v.accent }]}>
                                {v.glyph}
                            </Text>
                        )}
                    </View>

                    {/* Text */}
                    <View style={styles.textBlock}>
                        {item.title ? (
                            <Text
                                style={[styles.title, item.titleStyle]}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                        ) : null}
                        {item.message ? (
                            <Text
                                style={[styles.message, item.messageStyle]}
                                numberOfLines={2}
                            >
                                {item.message}
                            </Text>
                        ) : null}
                    </View>

                    {/* Right slot */}
                    {item.action ? (
                        <TouchableOpacity
                            onPress={() => {
                                item.action!.onPress();
                                handleAnimatedDismiss();
                            }}
                            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                        >
                            <Text style={[styles.actionLabel, { color: v.accent }]}>
                                {item.action.label}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleAnimatedDismiss}
                            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
                        >
                            <Text style={styles.closeGlyph}>✕</Text>
                        </TouchableOpacity>
                    )}
                </Animated.View>
            </GestureDetector>
        );
    },
);

ToastItemComponent.displayName = 'ToastItem';

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    /**
     * CRITICAL: all toasts in a deck are absolutely positioned
     * and stacked on top of each other. Their visual separation
     * comes purely from scale + translateY in the animation.
     */
    absolute: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111113',
        borderRadius: 16,
        borderWidth: 1,
        marginHorizontal: 12,
        paddingVertical: 13,
        paddingRight: 14,
        paddingLeft: 10,
        gap: 10,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 16,
            },
            android: { elevation: 10 },
        }),
    },
    accentStrip: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    badge: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    glyph: {
        fontSize: 14,
        fontWeight: '800',
    },
    textBlock: {
        flex: 1,
        gap: 2,
    },
    title: {
        color: '#FAFAFA',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.3,
    },
    message: {
        color: '#71717A',
        fontSize: 13,
        lineHeight: 18,
        letterSpacing: -0.1,
    },
    actionLabel: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
    closeGlyph: {
        color: '#3F3F46',
        fontSize: 13,
        fontWeight: '600',
    },
});