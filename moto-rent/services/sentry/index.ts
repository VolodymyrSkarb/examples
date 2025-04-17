import * as Sentry from '@sentry/vue';
import { App } from 'vue';
import { Router } from 'vue-router';

declare global {
  interface Window {
    sentryConfig: {
      sentryFrontendDsn: string;
      defaultUri: string;
      releaseVersion: string;
      sentryEnvironment: string;
    };
  }
}

export function initializeSentry(app: App, router?: Router): void {
  const sentryConfig = window.sentryConfig;

  Sentry.init({
    app,
    dsn: sentryConfig.sentryFrontendDsn,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
      Sentry.captureConsoleIntegration({ levels: ['error'] }),
    ],
    tracePropagationTargets: [sentryConfig.defaultUri],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    release: sentryConfig.releaseVersion,
    environment: sentryConfig.sentryEnvironment,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.config.errorHandler = (err: unknown, instance: any, info: string):void => {
    Sentry.captureException(err, {
      extra: {
        component: instance?.$options?.name || 'Anonymous Component',
        info,
      },
    });
    // eslint-disable-next-line no-console
    console.error(`[Vue Error] ${info}:`, err);
  };
}
