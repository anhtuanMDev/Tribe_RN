import React from 'react';
import RootApp from './src/navigation/RootApp';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://2c6baece783967774dae9655fdd5926d@o4508951693950976.ingest.de.sentry.io/4511268670013520',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function App() {
  return <RootApp />;
}

export default Sentry.wrap(App);
