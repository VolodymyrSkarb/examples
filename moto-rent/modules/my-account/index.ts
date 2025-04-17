import { createApp } from 'vue';
import router from '@/services/router/index';
import App from './app.vue';
import { createPinia } from 'pinia';
import { tooltip } from '@/components/Tooltip';
import { initializeSentry } from '@/services/sentry';

const MY_ACCOUNT_SELECTOR = '#myAccountApp';

if (document.querySelector(MY_ACCOUNT_SELECTOR)) {
  const app = createApp(App)
    .directive('tooltip', tooltip)
    .use(createPinia())
    .use(router);

  initializeSentry(app);

  app.mount(MY_ACCOUNT_SELECTOR);
}
