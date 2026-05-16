import { useEffect, useState, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState() {
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const previousState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      previousState.current = appState;
      setAppState(state);
    });
    return () => sub.remove();
  }, [appState]);

  return {
    appState,
    previousState: previousState.current,
    isActive: appState === 'active',
    isBackground: appState === 'background',
    justCameToForeground:
      previousState.current !== 'active' && appState === 'active',
  };
}
