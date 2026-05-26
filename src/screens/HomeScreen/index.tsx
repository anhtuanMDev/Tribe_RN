import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, toast } from '../../components';
import { pallet } from '../../config/pallet';
import { navigate } from '../../navigation/utils';
import { ROUTES } from '../../navigation/params';

function HomeScreen() {
  const createPost = () => {
    navigate(ROUTES.POST);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Button title="Create Post" level="primary" onPress={createPost} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: pallet.background,
    flex: 1,
  },
});

export default HomeScreen;
