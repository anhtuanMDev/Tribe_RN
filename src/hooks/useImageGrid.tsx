// src/hooks/useImageGrid.ts
import { useMemo } from 'react';
import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GAP = 2;

export interface ImageGridLayout {
  items: Array<{
    index: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  totalHeight: number;
  containerWidth: number;
}

export function useImageGrid(
  count: number,
  containerWidth = SCREEN_WIDTH,
): ImageGridLayout {
  return useMemo(() => {
    const w = containerWidth;

    if (count === 1) {
      return {
        containerWidth: w,
        totalHeight: (w * 9) / 16,
        items: [{ index: 0, x: 0, y: 0, width: w, height: (w * 9) / 16 }],
      };
    }

    if (count === 2) {
      const itemW = (w - GAP) / 2;
      const itemH = (w * 3) / 4 / 2;
      return {
        containerWidth: w,
        totalHeight: itemH,
        items: [
          { index: 0, x: 0, y: 0, width: itemW, height: itemH },
          { index: 1, x: itemW + GAP, y: 0, width: itemW, height: itemH },
        ],
      };
    }

    if (count === 3) {
      const leftW = (w - GAP) / 2;
      const rightW = (w - GAP) / 2;
      const leftH = (leftW * 4) / 3;
      const rightItemH = (leftH - GAP) / 2;
      return {
        containerWidth: w,
        totalHeight: leftH,
        items: [
          { index: 0, x: 0, y: 0, width: leftW, height: leftH },
          { index: 1, x: leftW + GAP, y: 0, width: rightW, height: rightItemH },
          {
            index: 2,
            x: leftW + GAP,
            y: rightItemH + GAP,
            width: rightW,
            height: rightItemH,
          },
        ],
      };
    }

    if (count === 4) {
      const itemW = (w - GAP) / 2;
      const itemH = itemW;
      return {
        containerWidth: w,
        totalHeight: itemH * 2 + GAP,
        items: [
          { index: 0, x: 0, y: 0, width: itemW, height: itemH },
          { index: 1, x: itemW + GAP, y: 0, width: itemW, height: itemH },
          { index: 2, x: 0, y: itemH + GAP, width: itemW, height: itemH },
          {
            index: 3,
            x: itemW + GAP,
            y: itemH + GAP,
            width: itemW,
            height: itemH,
          },
        ],
      };
    }

    // 5+ images — show first 4 with "+N more" overlay on last
    const itemW = (w - GAP) / 2;
    const itemH = itemW;
    return {
      containerWidth: w,
      totalHeight: itemH * 2 + GAP,
      items: [
        { index: 0, x: 0, y: 0, width: itemW, height: itemH },
        { index: 1, x: itemW + GAP, y: 0, width: itemW, height: itemH },
        { index: 2, x: 0, y: itemH + GAP, width: itemW, height: itemH },
        {
          index: 3,
          x: itemW + GAP,
          y: itemH + GAP,
          width: itemW,
          height: itemH,
        }, // overlay goes here
      ],
    };
  }, [count, containerWidth]);
}

// Calculate optimal thumbnail dimensions from original w/h
export function useScaledDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight?: number,
): { width: number; height: number } {
  return useMemo(() => {
    if (!originalWidth || !originalHeight)
      return { width: maxWidth, height: maxWidth };
    const ratio = originalWidth / originalHeight;
    let width = Math.min(originalWidth, maxWidth);
    let height = width / ratio;
    if (maxHeight && height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }
    return { width, height };
  }, [originalWidth, originalHeight, maxWidth, maxHeight]);
}
