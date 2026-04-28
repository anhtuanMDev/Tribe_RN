import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, toast } from '../../components';
import { pallet } from '../../config/pallet';

function HomeScreen() {
  const signin = () => {
    toast.warning({ title: 'Bottom toast', position: 'bottom' });
  }
  return (
    <SafeAreaView style={[styles.container]}>
      <Button title="Sign In" level="primary" onPress={signin} />
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
