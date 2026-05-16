import { useCallback as useCallbackIS } from 'react';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.9,
}: UseInfiniteScrollOptions) {
  const onScroll = useCallbackIS(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!hasNextPage || isFetchingNextPage) return;
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
      const paddingToBottom = contentSize.height * (1 - threshold);
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
      if (isCloseToBottom) fetchNextPage();
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage, threshold],
  );

  return { onScroll };
}
