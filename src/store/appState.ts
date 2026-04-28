import { observable } from '@legendapp/state';

export const appStore = observable({
  hasSeenWalkthrough: false,
  token: null as string | null,
  refreshToken: null as string | null,
  user: null as { id: string; email: string; username: string } | null,
});

