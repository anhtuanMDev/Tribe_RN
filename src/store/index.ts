// src/store/index.ts
import { observable } from '@legendapp/state';
import { syncObservable } from '@legendapp/state/sync';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';

export const appStore = observable({
  hasSeenWalkthrough: false,
  token: null as string | null,
  refreshToken: null as string | null,
  user: null as { id: string; email: string; username: string } | null,
});

syncObservable(appStore, {
  persist: {
    name: 'appStore',
    plugin: ObservablePersistMMKV,
  },
});
