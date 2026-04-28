import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

// ─── Core enums ───────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'custom';
export type ToastPosition = 'top' | 'bottom';
export type ToastAnimation = 'spring' | 'slide' | 'fade';

// ─── Public config (what callers pass) ───────────────────────────────────────

export interface ToastConfig {
    /** Omit → auto-generated. Supply to replace an existing toast by ID. */
    id?: string;
    variant?: ToastVariant;
    title?: string;
    message?: string;
    /**
     * Duration in ms before auto-dismiss.
     * `0` = persist until manually dismissed.
     */
    duration?: number;
    position?: ToastPosition;
    animation?: ToastAnimation;
    /** Extra offset from safe-area edge (px). Default: 0. */
    offset?: number;
    /** Swipe-to-dismiss. Default: true. */
    swipeable?: boolean;
    /** Full custom render — receives item snapshot + dismiss callback. */
    renderCustom?: (item: ToastItem, dismiss: () => void) => ReactNode;
    /** Left slot. If omitted, variant icon is used. */
    icon?: ReactNode;
    /** Right slot — replaces the close button. */
    action?: { label: string; onPress: () => void };
    onDismiss?: () => void;
    // Style overrides
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    messageStyle?: StyleProp<TextStyle>;
}

// ─── Internal item (fully resolved) ──────────────────────────────────────────

export interface ToastItem {
    id: string;
    variant: ToastVariant;
    position: ToastPosition;
    duration: number;
    animation: ToastAnimation;
    offset: number;
    swipeable: boolean;
    title?: string;
    message?: string;
    renderCustom?: ToastConfig['renderCustom'];
    icon?: ReactNode;
    action?: ToastConfig['action'];
    onDismiss?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    messageStyle?: StyleProp<TextStyle>;
    createdAt: number;
}

// ─── Store shape ─────────────────────────────────────────────────────────────

export interface ToastQueues {
    /** Ordered IDs: index 0 = oldest, last = newest (frontmost in deck) */
    top: string[];
    bottom: string[];
}

export interface ToastDefaults {
    variant: ToastVariant;
    duration: number;
    position: ToastPosition;
    animation: ToastAnimation;
    offset: number;
    swipeable: boolean;
    /** Max visible toasts per position before oldest is evicted. */
    maxVisible: number;
}
