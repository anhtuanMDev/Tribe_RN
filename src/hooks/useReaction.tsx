import { useState, useCallback, useRef } from 'react';
import {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useHaptics } from './useHaptics';

export type ReactionType =
  | 'like'
  | 'love'
  | 'haha'
  | 'wow'
  | 'sad'
  | 'angry'
  | 'care';

export function useReaction(
  initialReaction: ReactionType | undefined,
  initialCount: number,
  onReact: (reaction: ReactionType | null) => Promise<void>,
) {
  const [myReaction, setMyReaction] = useState<ReactionType | undefined>(
    initialReaction,
  );
  const [count, setCount] = useState(initialCount);
  const [showPicker, setShowPicker] = useState(false);
  const haptics = useHaptics();
  const scale = useSharedValue(1);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleQuickReact = useCallback(async () => {
    haptics.medium();
    scale.value = withSpring(1.3, { damping: 10 }, () => {
      scale.value = withSpring(1);
    });

    const newReaction = myReaction === 'like' ? null : ('like' as ReactionType);
    const prevReaction = myReaction;
    const prevCount = count;

    // Optimistic update
    setMyReaction(newReaction ?? undefined);
    setCount(c => (newReaction ? c + 1 : Math.max(0, c - 1)));

    try {
      await onReact(newReaction);
    } catch {
      // Rollback
      setMyReaction(prevReaction);
      setCount(prevCount);
    }
  }, [myReaction, count, onReact, haptics, scale]);

  const handleLongPress = useCallback(() => {
    haptics.heavy();
    setShowPicker(true);
  }, [haptics]);

  const handlePickReaction = useCallback(
    async (reaction: ReactionType) => {
      setShowPicker(false);
      haptics.success();
      const isSame = myReaction === reaction;
      const newReaction = isSame ? null : reaction;
      const prevReaction = myReaction;
      const prevCount = count;

      setMyReaction(newReaction ?? undefined);
      setCount(c => (newReaction ? c + 1 : Math.max(0, c - 1)));

      try {
        await onReact(newReaction);
      } catch {
        setMyReaction(prevReaction);
        setCount(prevCount);
      }
    },
    [myReaction, count, onReact, haptics],
  );

  return {
    myReaction,
    count,
    showPicker,
    scale,
    setShowPicker,
    handleQuickReact,
    handleLongPress,
    handlePickReaction,
  };
}
