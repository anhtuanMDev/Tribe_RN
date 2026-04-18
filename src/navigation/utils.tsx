import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import type { FlowBottom, FlowCredential, NavigateArgs, PARAMS } from './types';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export const Stack = createNativeStackNavigator<PARAMS>();
export const CredentialStack = createNativeStackNavigator<FlowCredential>();
export const BottomTab = createNativeBottomTabNavigator<FlowBottom>();

export const navigationRef = createNavigationContainerRef<PARAMS>();

export function navigate<T extends keyof PARAMS>(...args: NavigateArgs<T>) {
  if (!navigationRef.isReady()) return;

  const [screen, params] = args;

  navigationRef.navigate<any>(screen, params);
}

export function replace<T extends keyof PARAMS>(...args: NavigateArgs<T>) {
  if (!navigationRef.isReady()) return;

  const [screen, params] = args;

  navigationRef.dispatch(StackActions.replace(screen, params));
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function reset<T extends keyof PARAMS>(route: T, params?: PARAMS[T]) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [{ name: route, params }],
    });
  }
}

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const bottomScreenOption: BottomTabNavigationOptions = {
  headerShown: false,
};
