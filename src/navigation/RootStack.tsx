import React from 'react';
import { screenOptions, Stack } from './utils';
import { ROUTES } from './params';
import CredentialFlow from './flows/flowCredential';
import BottomTabFlow from './flows/flowBottomTab';
import WalkThroughScreen from '../screens/WalkThroughScreen';
import { appStore } from '../store';
import PostScreen from '../screens/FlowPost/PostScreen';

function RootStack() {
  const hasSeenWalkthrough = appStore.hasSeenWalkthrough.get();
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={
        hasSeenWalkthrough ? ROUTES.FLOW_BOTTOM : ROUTES.WALK_THROUGH
      }
    >
      <Stack.Screen name={ROUTES.WALK_THROUGH} component={WalkThroughScreen} />
      <Stack.Screen name={ROUTES.FLOW_CREDENTAIL} component={CredentialFlow} />
      <Stack.Screen name={ROUTES.FLOW_BOTTOM} component={BottomTabFlow} />
      <Stack.Screen name={ROUTES.POST} component={PostScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
