import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { syncObservable } from '@legendapp/state/sync';
import { appStore } from './appState';

syncObservable(appStore, {
  persist: {
    name: 'appStore',
    plugin: ObservablePersistMMKV,
  },
});

export * from './appState';
export * from './toastState';