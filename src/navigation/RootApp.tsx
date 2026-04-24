import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';
import { navigationRef } from './utils';
import { useLogger } from '@react-navigation/devtools';
import { StatusBar } from 'react-native';
import { pallet } from '../config/pallet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function RootApp() {
  useLogger(navigationRef);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <StatusBar
            translucent={true}
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />
          <NavigationContainer ref={navigationRef}>
            <RootStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default RootApp;
