import React from 'react';
import HomeScreen from '../../../screens/HomeScreen';
import { ROUTES } from '../../params';
import { BottomTab } from '../../utils';

function BottomTabFlow() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name={ROUTES.HOME} component={HomeScreen} />
    </BottomTab.Navigator>
  );
}

export default BottomTabFlow;
