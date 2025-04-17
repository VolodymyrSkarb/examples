import { createApp } from 'vue';
import App from '@/modules/vehicle-rent/app.vue';
import { createPinia } from 'pinia';
import router from '@/services/router';
import { tooltip } from '@/components/Tooltip';
import { initializeSentry } from '@/services/sentry';

const VEHICLE_RENT_SELECTOR = '#vehicleRent';

if (document.querySelector(VEHICLE_RENT_SELECTOR)) {
  const app = createApp(App)
    .directive('tooltip', tooltip)
    .use(createPinia())
    .use(router);

  initializeSentry(app, router);

  app.mount(VEHICLE_RENT_SELECTOR);
}
