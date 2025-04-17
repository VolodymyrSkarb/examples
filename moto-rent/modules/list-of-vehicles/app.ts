import { createApp } from 'vue';
import ListOfVehicles from './ListOfVehicles.vue';
import { initializeSentry } from '@/services/sentry';

const LIST_OF_VEHICLES_SELECTOR = '#list-of-vehicles';

if (document.querySelector(LIST_OF_VEHICLES_SELECTOR)) {
  const app = createApp(ListOfVehicles);

  initializeSentry(app);

  app.mount(LIST_OF_VEHICLES_SELECTOR);
}
