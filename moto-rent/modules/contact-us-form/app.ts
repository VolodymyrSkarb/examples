import { createApp } from 'vue';
import ContactUsForm from './ContactUsForm.vue';
import { initializeSentry } from '@/services/sentry';

const CONTACT_US_FORM_SELECTOR = '#contact-us-form';

if (document.querySelector(CONTACT_US_FORM_SELECTOR)) {
  const app = createApp(ContactUsForm);

  initializeSentry(app);

  app.mount(CONTACT_US_FORM_SELECTOR);
}
