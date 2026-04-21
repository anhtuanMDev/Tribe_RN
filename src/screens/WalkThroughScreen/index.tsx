import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PineTreeSVG } from '../../assets/svg';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import { fonts } from '../../config/constants';
import { pallet } from '../../config/pallet';
import { ROUTES } from '../../navigation/params';
import { replace } from '../../navigation/utils';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    image: require('../../assets/images/wt/step1.webp'),
    title: 'Explore the Great Outdoors',
    subtitle: 'Discover hidden trails, scenic parks, and new adventures tailored to your pace.',
  },
  {
    id: '2',
    image: require('../../assets/images/wt/step1.webp'),
    title: 'Grow Together',
    subtitle: 'Build meaningful relationships that push you forward every day.',
  },
  {
    id: '3',
    image: require('../../assets/images/wt/step1.webp'),
    title: 'Stay Rooted',
    subtitle: 'A community that keeps you grounded, no matter where life takes you.',
  },
];

function WalkThroughScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0); // drives text only
  const flatListRef = useRef<FlatList>(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const dotWidths = useRef(SLIDES.map((_, i) => new Animated.Value(i === 0 ? 24 : 8))).current;
  const isTappingButton = useRef(false);

  const animateTextTransition = (dir: 'next' | 'prev', nextIndex: number) => {
    const outY = dir === 'next' ? -20 : 20;
    const inY = dir === 'next' ? 20 : -20;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, { toValue: outY, duration: 150, useNativeDriver: true }),
        Animated.timing(textOpacity, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(translateY, { toValue: inY, duration: 0, useNativeDriver: true }),
        Animated.timing(textOpacity, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    ]).start(() => {
      setDisplayIndex(nextIndex); // swap text only when invisible
      Animated.parallel([
        Animated.timing(translateY, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(textOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();
    });
  };

  const animateDots = (nextIndex: number) => {
    SLIDES.forEach((_, i) => {
      Animated.timing(dotWidths[i], {
        toValue: i === nextIndex ? 24 : 8,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isTappingButton.current) {
      isTappingButton.current = false;
      return;
    }
    const nextIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (nextIndex === currentIndex) return;

    const dir = nextIndex > currentIndex ? 'next' : 'prev';
    animateDots(nextIndex);
    animateTextTransition(dir, nextIndex);
    setCurrentIndex(nextIndex);
  };

  const scrollTo = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      isTappingButton.current = true;
      animateDots(next);
      animateTextTransition('next', next);
      setCurrentIndex(next);
      scrollTo(next);
    } else {
      replace(ROUTES.FLOW_BOTTOM, { screen: ROUTES.HOME });
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      isTappingButton.current = true;
      animateDots(prev);
      animateTextTransition('prev', prev);
      setCurrentIndex(prev);
      scrollTo(prev);
    }
  };

  const skip = () => replace(ROUTES.FLOW_BOTTOM, { screen: ROUTES.HOME });

  const isLast = currentIndex === SLIDES.length - 1;
  const slide = SLIDES[displayIndex]; // only change here

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.nameWrapper}>
          <PineTreeSVG />
          <Typography style={styles.name} level="headlineSmall">
            Tribe
          </Typography>
        </View>
        <Button
          title="Skip"
          onPress={skip}
          level="ghost"
          textStyle={styles.headerButton}
        />
      </View>

      {/* Swipeable images */}
      <View style={{ height: height * 0.45 }}>
        <Animated.FlatList
          ref={flatListRef}
          data={SLIDES}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={onMomentumScrollEnd}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          style={{ flexShrink: 1 }}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
            </View>
          )}
        />
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {SLIDES.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: dotWidths[i],
                backgroundColor:
                  i === currentIndex ? pallet.primary : pallet.variant.neutral['300'],
              },
            ]}
          />
        ))}
      </View>

      {/* Animated text */}
      <Animated.View
        style={[styles.textBlock, { transform: [{ translateY }], opacity: textOpacity }]}
      >
        <Typography level="headlineMedium" style={styles.title}>
          {slide.title}
        </Typography>
        <Typography level="bodyMedium" style={styles.subtitle}>
          {slide.subtitle}
        </Typography>
      </Animated.View>

      {/* Controls */}
      <View style={styles.controls}>
        <Button
          disabled={currentIndex === 0}
          title="Back"
          onPress={goPrev}
          level="outline"
          textStyle={{ color: pallet.primary, fontWeight: '800', backgroundColor: pallet.background }}
        />
        <Button
          fullWidth
          title={isLast ? 'Get Started' : 'Next'}
          onPress={goNext}
          level="primary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: pallet.background,
  },
  contentContainer: {
    height: height * 0.45,
    backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  name: {
    fontWeight: '900',
    color: pallet.primary,
  },
  imageWrapper: {
    width,
    height: height * 0.45,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
    marginTop: 28,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  textBlock: {
    paddingHorizontal: 32,
    marginTop: 32,
    gap: 12,
  },
  title: {
    fontWeight: '800',
    color: pallet.variant.neutral[900],
    textAlign: 'center',
  },
  subtitle: {
    color: pallet.variant.neutral['900'],
    fontFamily: fonts.literata.regular,
    textAlign: 'center',
    lineHeight: 24,
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 40,
    marginTop: 'auto',
    paddingBottom: 16,
    gap: 16,
    marginBottom: 24,
  },
  headerButton: { color: pallet.variant.neutral['400'], fontFamily: fonts.literata.semiBold },
});

export default WalkThroughScreen;