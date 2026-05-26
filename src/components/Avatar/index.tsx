import { StyleSheet, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { pallet } from '../../config/pallet';

interface AvatarProps {
  uri?: string;
  size?: number;
  isOnline?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

export function Avatar({
  uri,
  size = 40,
  isOnline = false,
  borderColor,
  borderWidth,
}: AvatarProps) {
  return (
    <View style={{ position: 'relative', width: size, height: size }}>
      <FastImage
        source={
          uri ? { uri } : require('../../assets/images/default_avatar.png')
        }
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: borderWidth,
          borderColor: borderColor,
          backgroundColor: pallet.variant.neutral['100'],
        }}
        defaultSource={require('../../assets/images/default_avatar.png')}
      />
      {isOnline && (
        <View
          style={[
            styles.onlineDot,
            {
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: (size * 0.28) / 2,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  onlineDot: {
    position: 'absolute',
    backgroundColor: pallet.variant.tertiary['200'],
    borderWidth: 2,
    borderColor: pallet.variant.neutral['0'],
  },
});
