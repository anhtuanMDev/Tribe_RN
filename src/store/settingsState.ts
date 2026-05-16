import { observable } from '@legendapp/state';

export const settingsState = observable({
  theme: 'system' as 'system' | 'light' | 'dark',

  language: 'en',

  notifications: true,

  soundEnabled: true,

  autoPlayVideo: true,

  dataSaver: false,

  fontSize: 'medium' as 'small' | 'medium' | 'large',
});

export function setTheme(theme: 'system' | 'light' | 'dark') {
  settingsState.theme.set(theme);
}

export function toggleNotifications() {
  settingsState.notifications.set(v => !v);
}

export function toggleSound() {
  settingsState.soundEnabled.set(v => !v);
}

export function toggleAutoPlayVideo() {
  settingsState.autoPlayVideo.set(v => !v);
}

export function toggleDataSaver() {
  settingsState.dataSaver.set(v => !v);
}

export function setFontSize(size: 'small' | 'medium' | 'large') {
  settingsState.fontSize.set(size);
}
