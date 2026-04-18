import React from 'react';
import { screenOptions, Stack } from './utils';
import { ROUTES } from './params';
import CredentialFlow from './flows/flowCredential';
import BottomTabFlow from './flows/flowBottomTab';

function RootStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={ROUTES.FLOW_CREDENTAIL} component={CredentialFlow} />
      <Stack.Screen name={ROUTES.FLOW_BOTTOM} component={BottomTabFlow} />
    </Stack.Navigator>
  );
}

export default RootStack;
