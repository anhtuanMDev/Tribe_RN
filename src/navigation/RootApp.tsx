import { useLogger } from '@react-navigation/devtools';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastContainer } from '../components';
import RootStack from './RootStack';
import { navigationRef } from './utils';

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
          <ToastContainer />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default RootApp;
