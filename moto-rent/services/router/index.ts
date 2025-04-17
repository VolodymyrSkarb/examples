import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const PAGE_ACCOUNT = 'MyAccount';
export const PAGE_CREATE_VEHICLE = 'CreateVehicle';
export const PAGE_EDIT_VEHICLE = 'EditVehicle';
export const PAGE_CREATE_RENT = 'CreateRent';

export default createRouter({
  history: createWebHistory(),
  routes: [
    /* eslint-disable no-multi-spaces */
    {
      name: PAGE_ACCOUNT,
      path: '/my-account/:tab?',
      component: (): Component => import('@/modules/my-account/MyAccount.vue'),
    },
    {
      name: PAGE_CREATE_VEHICLE,
      path: '/vehicles/create',
      component: (): Component => import('@/modules/my-account/components/CreateVehicle.vue'),
    },
    {
      name: PAGE_EDIT_VEHICLE,
      path: '/vehicles/:id/update',
      component: (): Component => import('@/modules/my-account/components/CreateVehicle.vue'),
    },
    {
      name: PAGE_CREATE_RENT,
      path: '/vehicle-rents/create/:id',
      component: (): Component => import('@/modules/vehicle-rent/VehicleRent.vue'),
      props: true,
    },
    /* eslint-enable no-multi-spaces */
  ] as Array<RouteRecordRaw>,
});
