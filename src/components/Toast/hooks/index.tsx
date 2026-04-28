/**
 * useToastAnimation.ts
 *
 * Handles all animation logic for a single toast card:
 *   - Entry: spring/slide/fade in on mount
 *   - Depth: scale + translateY + opacity driven by depthIndex
 *   - Swipe: pan gesture → dismiss when threshold exceeded
 *   - Exit: animateOut() returns a Promise that resolves when done
 *
 * CONTRACT with ToastItem:
 *   • depthIndex changes  → card animates to new deck position
 *   • animateOut()        → runs exit animation, resolves when complete
 *   • onDismiss           → called by swipe gesture (runOnJS) after threshold
 */

import { useCallback, useEffect, useRef } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    runOnJS,
    Easing,
} from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { ToastAnimation, ToastPosition } from '../type';
import { DECK_OPACITY_STEP, DECK_SCALE_STEP, DECK_TRANSLATE_STEP } from '../../../config/toast';

// ─── Constants ────────────────────────────────────────────────────────────────

/** px threshold to trigger swipe-dismiss */
const SWIPE_THRESHOLD = 60;
/** Duration for timing-based animations (ms) */
const TIMING_DURATION = 320;

// ─── Spring configs ───────────────────────────────────────────────────────────

const SPRING_ENTRY = { damping: 18, stiffness: 220, mass: 0.8 };
const SPRING_DEPTH = { damping: 20, stiffness: 260, mass: 0.7 };
const SPRING_SWIPE_BACK = { damping: 15, stiffness: 200 };

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseToastAnimationParams {
    animation: ToastAnimation;
    position: ToastPosition;
    swipeable: boolean;
    depthIndex: number;
    onDismiss: () => void;
}

interface UseToastAnimationResult {
    gesture: ReturnType<typeof Gesture.Pan>;
    animatedStyle: ReturnType<typeof useAnimatedStyle>;
    animateOut: () => Promise<void>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Target scale for a given depth slot */
const targetScale = (depth: number) => {
    'worklet';
    return 1 - depth * DECK_SCALE_STEP;
};

/** Target translateY for a given depth slot, direction-aware */
const targetTranslateY = (depth: number, position: ToastPosition) => {
    'worklet';
    const direction = position === 'top' ? 1 : -1;
    return depth * DECK_TRANSLATE_STEP * direction;
};
/** Target opacity for a given depth slot */
const targetOpacity = (depth: number) => {
    'worklet';
    return Math.max(0, 1 - depth * DECK_OPACITY_STEP);
};
// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToastAnimation({
    animation,
    position,
    swipeable,
    depthIndex,
    onDismiss,
}: UseToastAnimationParams): UseToastAnimationResult {
    // ── Shared values ──────────────────────────────────────────────────────────

    // translateY drives both entry/exit slide AND depth-peek offset
    const translateY = useSharedValue(position === 'top' ? -80 : 80);
    const translateX = useSharedValue(0);
    const scale = useSharedValue(targetScale(depthIndex));
    const opacity = useSharedValue(0);

    // Gesture-tracking shared values (worklet-safe)
    const gestureStartX = useSharedValue(0);
    const isDismissed = useSharedValue(false);

    // ── Entry animation ────────────────────────────────────────────────────────

    useEffect(() => {
        const toY = targetTranslateY(depthIndex, position);
        const toScale = targetScale(depthIndex);
        const toOpacity = targetOpacity(depthIndex);

        if (animation === 'spring') {
            translateY.value = withSpring(toY, SPRING_ENTRY);
            scale.value = withSpring(toScale, SPRING_ENTRY);
            opacity.value = withTiming(toOpacity, { duration: 200 });
        } else if (animation === 'slide') {
            translateY.value = withTiming(toY, {
                duration: TIMING_DURATION,
                easing: Easing.out(Easing.cubic),
            });
            scale.value = withTiming(toScale, { duration: TIMING_DURATION });
            opacity.value = withTiming(toOpacity, { duration: TIMING_DURATION });
        } else {
            // fade
            translateY.value = toY;
            scale.value = toScale;
            opacity.value = withTiming(toOpacity, { duration: TIMING_DURATION });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Depth change animation (depthIndex shifts when stack changes) ──────────

    useEffect(() => {
        const toY = targetTranslateY(depthIndex, position);
        const toScale = targetScale(depthIndex);
        const toOpacity = targetOpacity(depthIndex);

        translateY.value = withSpring(toY, SPRING_DEPTH);
        scale.value = withSpring(toScale, SPRING_DEPTH);
        opacity.value = withTiming(toOpacity, { duration: 180 });
        // We intentionally exclude entry deps — only respond to depth changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [depthIndex]);

    // ── Exit animation (imperative) ────────────────────────────────────────────

    const animateOut = useCallback((): Promise<void> => {
        return new Promise<void>(resolve => {
            'worklet';
            const exitY = position === 'top' ? -120 : 120;

            if (animation === 'spring') {
                translateY.value = withSpring(exitY, { damping: 14, stiffness: 180 }, () => {
                    runOnJS(resolve)();
                });
            } else if (animation === 'slide') {
                translateY.value = withTiming(
                    exitY,
                    { duration: 260, easing: Easing.in(Easing.cubic) },
                    () => { runOnJS(resolve)(); },
                );
            } else {
                // fade
                opacity.value = withTiming(0, { duration: 220 }, () => {
                    runOnJS(resolve)();
                });
            }

            opacity.value = withTiming(0, { duration: 200 });
        });
    }, [animation, position, translateY, opacity]);

    // ── Swipe gesture ──────────────────────────────────────────────────────────

    const gesture = Gesture.Pan()
        .enabled(swipeable)
        .onBegin(() => {
            gestureStartX.value = translateX.value;
        })
        .onUpdate(e => {
            if (isDismissed.value) return;
            translateX.value = gestureStartX.value + e.translationX;
            // Fade slightly as they drag
            opacity.value = Math.max(
                0.4,
                targetOpacity(depthIndex) - Math.abs(e.translationX) / 300,
            );
        })
        .onEnd(e => {
            if (isDismissed.value) return;

            const overThreshold = Math.abs(e.translationX) > SWIPE_THRESHOLD;

            if (overThreshold) {
                isDismissed.value = true;
                // Fly off screen in swipe direction
                const exitX = e.translationX > 0 ? 500 : -500;
                translateX.value = withTiming(exitX, { duration: 260 }, () => {
                    runOnJS(onDismiss)();
                });
                opacity.value = withTiming(0, { duration: 200 });
            } else {
                // Snap back
                translateX.value = withSpring(0, SPRING_SWIPE_BACK);
                opacity.value = withTiming(
                    targetOpacity(depthIndex),
                    { duration: 180 },
                );
            }
        });

    // ── Animated style ─────────────────────────────────────────────────────────

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { translateX: translateX.value },
            { scale: scale.value },
        ],
        opacity: opacity.value,
    }));

    return { gesture, animatedStyle, animateOut };
}