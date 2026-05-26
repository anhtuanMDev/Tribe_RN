import { StyleSheet, View } from 'react-native';

export type PostUtilAction = 'media' | 'gps';

interface PostUtilLayerProps {
  visible: boolean;
}

const PostUtilLayer = ({ visible }: PostUtilLayerProps) => {
  if (!visible) return null;
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default PostUtilLayer;
