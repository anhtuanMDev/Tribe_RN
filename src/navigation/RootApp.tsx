import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';
import { navigationRef } from './utils';
import { useLogger } from '@react-navigation/devtools';

function RootApp() {
  useLogger(navigationRef);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <NavigationContainer ref={navigationRef}>
          <RootStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default RootApp;
