import React from 'react';
import { pallet } from '../../../config/pallet';
import HomeScreen from '../../../screens/HomeScreen';
import NotificationScreen from '../../../screens/NotificationScreen';
import { convertAlpha } from '../../../utils/assets';
import { ROUTES } from '../../params';
import { BottomTab } from '../../utils';

function BottomTabFlow() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: convertAlpha(95, pallet.background),
        },
        tabBarActiveTintColor: pallet.primary,
        tabBarInactiveTintColor: pallet.variant.neutral['400'],
      }}
    >
      <BottomTab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: () => ({
            type: 'image',
            source: require('../../../assets/images/bottomtab/leaf.png'),
          }),
        }}
      />
      <BottomTab.Screen
        name={ROUTES.NOTIFICATION}
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Noti',
          tabBarIcon: () => ({
            type: 'image',
            source: require('../../../assets/images/bottomtab/leaf.png'),
          }),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabFlow;
