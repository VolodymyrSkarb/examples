import { createApp } from 'vue';
import SignUp from './SignUp.vue';
import { initializeSentry } from '@/services/sentry';

const SIGN_UP_SELECTOR = '#signUpApp';

if (document.querySelector(SIGN_UP_SELECTOR)) {
  const app = createApp(SignUp);

  initializeSentry(app);

  app.mount(SIGN_UP_SELECTOR);
}
