import { useState as useStateNet, useEffect as useEffectNet } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useStateNet<boolean | null>(true);
  const [connectionType, setConnectionType] = useStateNet<string | null>(null);

  useEffectNet(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });
    return unsubscribe;
  }, []);

  return {
    isConnected,
    connectionType,
    isWifi: connectionType === 'wifi',
    isCellular: connectionType === 'cellular',
  };
}
