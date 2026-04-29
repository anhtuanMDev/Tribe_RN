import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, toast } from '../../components';
import { pallet } from '../../config/pallet';
import { navigate } from '../../navigation/utils';
import { ROUTES } from '../../navigation/params';

function HomeScreen() {
  const signin = () => {
    // toast.warning({ title: 'Bottom toast', position: 'bottom' });
    navigate(ROUTES.FLOW_CREDENTAIL, {
      screen: ROUTES.SIGN_IN
    })
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
