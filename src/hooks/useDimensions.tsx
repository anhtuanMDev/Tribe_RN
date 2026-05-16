// src/hooks/useDimensions.ts
import { useState, useEffect, useCallback } from 'react';
import { Dimensions, ScaledSize, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const BASE_WIDTH = 390; // iPhone 14 Pro base

export function useDimensions() {
  const [dims, setDims] = useState({
    width: SCREEN_W,
    height: SCREEN_H,
    isLandscape: SCREEN_W > SCREEN_H,
    isTablet: SCREEN_W >= 768,
    pixelRatio: PixelRatio.get(),
    fontScale: PixelRatio.getFontScale(),
  });

  useEffect(() => {
    const sub = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        setDims({
          width: window.width,
          height: window.height,
          isLandscape: window.width > window.height,
          isTablet: window.width >= 768,
          pixelRatio: PixelRatio.get(),
          fontScale: PixelRatio.getFontScale(),
        });
      },
    );
    return () => sub.remove();
  }, []);

  // Responsive scaling based on screen width
  const scale = useCallback(
    (size: number) => (dims.width / BASE_WIDTH) * size,
    [dims.width],
  );

  // Scale but cap the growth on tablets
  const moderateScale = useCallback(
    (size: number, factor = 0.5) => size + (scale(size) - size) * factor,
    [scale],
  );

  // Vertical scale
  const verticalScale = useCallback(
    (size: number) => (dims.height / 844) * size, // iPhone 14 Pro height base
    [dims.height],
  );

  // % of screen width
  const wp = useCallback(
    (percent: number) => (dims.width * percent) / 100,
    [dims.width],
  );
  const hp = useCallback(
    (percent: number) => (dims.height * percent) / 100,
    [dims.height],
  );

  // Pixel-perfect size
  const pixelPerfect = useCallback(
    (size: number) => PixelRatio.roundToNearestPixel(size),
    [],
  );

  return {
    ...dims,
    scale,
    moderateScale,
    verticalScale,
    wp,
    hp,
    pixelPerfect,
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
  };
}
