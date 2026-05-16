// src/store/appState.ts

import { computed, observable } from '@legendapp/state';

export type User = {
  id: string;
  email: string;
  username: string;
};

export const appStore = observable({
  hasSeenWalkthrough: false,

  user: null as User | null,

  token: null as string | null,

  refreshToken: null as string | null,

  isLoading: false,
});

export function setAuth(user: User, token: string, refreshToken: string) {
  appStore.user.set(user);
  appStore.token.set(token);
  appStore.refreshToken.set(refreshToken);
}

export function clearAuth() {
  appStore.user.set(null);
  appStore.token.set(null);
  appStore.refreshToken.set(null);
}

export function setLoading(loading: boolean) {
  appStore.isLoading.set(loading);
}

export function updateUser(patch: Partial<User>) {
  const currentUser = appStore.user.get();

  if (!currentUser) return;

  appStore.user.set({
    ...currentUser,
    ...patch,
  });
}

export const isAuthenticated = computed(() => !!appStore.token.get());
