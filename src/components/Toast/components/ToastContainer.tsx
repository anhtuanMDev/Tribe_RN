import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer, useSelector } from '@legendapp/state/react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toastStore, visibleBottom, visibleTop } from '../../../store';
import { DECK_TRANSLATE_STEP, MAX_VISIBLE } from '../../../config/toast';
import type { ToastItem, ToastPosition } from '../type';
import { ToastItemComponent } from './ToastItem';

// ─── Layout constants ─────────────────────────────────────────────────────────

/**
 * Approximate height of a single toast card.
 * Increase this if you have toasts with multi-line messages.
 */
const CARD_HEIGHT = 68;
const DECK_HEADROOM = (MAX_VISIBLE - 1) * DECK_TRANSLATE_STEP + 12;
const DECK_CONTAINER_HEIGHT = CARD_HEIGHT + DECK_HEADROOM;

// ─── Per-position stack ───────────────────────────────────────────────────────

interface PositionStackProps {
    position: ToastPosition;
    inset: number;
}

/**
 * observer() makes this component reactive.
 * Subscribes only to the computed value it reads (top OR bottom queue).
 * The other position stack is completely isolated — adding a bottom toast
 * never re-renders the top stack.
 */
const PositionStack = observer(function PositionStack({
    position,
    inset,
}: PositionStackProps) {
    const ids = useSelector(position === 'top' ? visibleTop : visibleBottom);
    const offset = useSelector(toastStore.defaults.offset.get);

    if (ids.length === 0) return null;

    const stackSize = ids.length;

    return (
        <View
            style={[
                styles.stack,
                position === 'top'
                    ? { top: inset + offset }
                    : { bottom: inset + offset },
                { height: DECK_CONTAINER_HEIGHT },
            ]}
            pointerEvents="box-none"
        >
            {ids.map((id, arrayIndex) => {
                const item = toastStore.items.get()[id] as ToastItem | undefined;
                if (!item) return null;

                /**
                 * depthIndex:
                 *   newest (last in array)  → depthIndex 0              (front)
                 *   oldest (first in array) → depthIndex stackSize - 1  (back)
                 */
                const depthIndex = stackSize - 1 - arrayIndex;

                return (
                    <ToastItemComponent
                        key={id}
                        item={item}
                        depthIndex={depthIndex}
                        stackSize={stackSize}
                    />
                );
            })}
        </View>
    );
});

// ─── Root container ───────────────────────────────────────────────────────────

export function ToastContainer() {
    const insets = useSafeAreaInsets();

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <PositionStack position="top" inset={insets.top + 8} />
            <PositionStack position="bottom" inset={insets.bottom + 8} />
        </View>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    stack: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 9999,
    },
});