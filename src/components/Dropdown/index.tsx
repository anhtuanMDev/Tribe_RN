import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { pallet } from '../../config/pallet';
import { SelectItemType } from '../../config/type';
import Typography from '../Typography';
import { convertAlpha } from '../../utils/assets';
import { fonts } from '../../config/constants';
import { DropdownProps } from './type';
import { ANIM_DURATION, ITEM_HEIGHT } from './mock';

const RePress = Animated.createAnimatedComponent(Pressable);

function Dropdown({
  mode = 'dock',
  disabled,
  defaultValue,
  values,
  onChange,
  maxHeight = 150,
}: DropdownProps) {
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState<SelectItemType | undefined>(defaultValue);

  const listHeight = useSharedValue(0);

  const animatedListStyle = useAnimatedStyle(() => ({
    height: listHeight.value,
    overflow: 'hidden',
  }));

  const clearValue = () => {
    if (disabled || !value) return;
    setValue(undefined);
    onChange?.(undefined as unknown as SelectItemType);
    !expand && setExpand(true);
    const targetHeight = Math.min(values.length * ITEM_HEIGHT, maxHeight);
    listHeight.set(withTiming(targetHeight, {
      duration: ANIM_DURATION,
      easing: Easing.out(Easing.quad),
    }));
  };

  const toggle = () => {
    if (disabled) return;

    const next = !expand;
    setExpand(next);

    const targetHeight = next
      ? Math.min(values.length * ITEM_HEIGHT, maxHeight)
      : 0;

    listHeight.value = withTiming(targetHeight, {
      duration: ANIM_DURATION,
      easing: Easing.out(Easing.quad),
    });
  };

  const handleSelect = (item: SelectItemType) => {
    setValue(item);
    onChange?.(item);

    // Collapse after selection
    setExpand(false);
    listHeight.value = withTiming(0, {
      duration: ANIM_DURATION,
      easing: Easing.in(Easing.quad),
    });
  };

  const renderItem = ({ item }: { item: SelectItemType }) => {
    const isSelected = item.value === value?.value;

    return (
      <Pressable
        onPress={() => handleSelect(item)}
        style={({ pressed }) => [
          styles.item,
          isSelected && styles.itemSelected,
          pressed && styles.itemPressed,
        ]}
      >
        <Typography
          level="bodyMedium"
          style={[styles.itemLabel, isSelected && styles.itemLabelSelected]}
        >
          {item.label}
        </Typography>
      </Pressable>
    );
  };

  return (
    <RePress
      onPress={toggle}
      layout={LinearTransition}
      style={[styles.container, disabled && styles.containerDisabled]}
    >
      <View style={styles.wrapper}>
        <Typography
          style={[styles.input, !value?.label && styles.placeholder]}
          level="labelLarge"
        >
          {value?.label ?? 'Select...'}
        </Typography>

        <Pressable
          onPress={clearValue}
          style={[styles.clearButton, !value?.label && styles.hide]}
          hitSlop={8}
        >
          <View style={styles.iconWrapper}>
            <View style={styles.iconLeftStrike} />
            <View style={styles.iconRightStrike} />
          </View>
        </Pressable>
      </View>

      {mode === 'dock' && (
        <Animated.View style={animatedListStyle}>
          <FlatList
            data={values}
            keyExtractor={item => String(item.value)}
            renderItem={renderItem}
            scrollEnabled
            style={{ maxHeight }}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          />
        </Animated.View>
      )}
    </RePress>
  );
}

const styles = StyleSheet.create({
  hide: {
    opacity: 0,
  },

  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: pallet.primary,
    overflow: 'hidden',
  },

  containerDisabled: {
    opacity: 0.4,
  },

  wrapper: {
    flexDirection: 'row',
    columnGap: 12,
    alignItems: 'center',
    flexShrink: 1,
  },

  input: {
    paddingVertical: 13,
    flex: 1,
    paddingHorizontal: 12,
    fontStyle: 'normal',
    fontWeight: '700',
  },

  placeholder: {
    opacity: 0.8,
  },

  clearButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    backgroundColor: pallet.primary,
    marginHorizontal: 12,
    marginTop: 8,
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  itemSelected: {
    backgroundColor: convertAlpha(10, pallet.primary),
  },

  itemPressed: {
    backgroundColor: convertAlpha(10, pallet.primary),
  },

  itemLabel: {
    fontFamily: fonts.literata.semiBoldItalic,
  },

  itemLabelSelected: {
    color: pallet.primary,
  },

  iconWrapper: {
    width: 16,
    height: 16,
    backgroundColor: pallet.variant.neutral['500'],
    borderRadius: 12,
    position: 'relative',
  },

  iconLeftStrike: {
    width: 2,
    height: 12,
    backgroundColor: pallet.variant.neutral['0'],
    position: 'absolute',
    top: 2,
    left: 7,
    transform: [{ rotate: '-45deg' }],
    borderRadius: 8,
  },

  iconRightStrike: {
    width: 2,
    height: 12,
    backgroundColor: pallet.variant.neutral['0'],
    position: 'absolute',
    top: 2,
    right: 7,
    transform: [{ rotate: '45deg' }],
    borderRadius: 8,
  },

  contentContainer: { paddingTop: 12 },
});

export default Dropdown;
