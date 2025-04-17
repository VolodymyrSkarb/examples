import * as Sentry from '@sentry/browser';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(() => {
  const sentryConfig = window.sentryConfig;

  Sentry.init({
    dsn: sentryConfig.sentryFrontendDsn,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error'] }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    release: sentryConfig.releaseVersion,
    environment: sentryConfig.sentryEnvironment,
  });
})();
