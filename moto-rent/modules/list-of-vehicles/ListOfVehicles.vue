<template>
  <div class="container">
    <div class="info-wrap">
      <div class="content">
        <div class="info-card _rent">
          <button @click="scrollToElement('#rent-list')" class="btn btn-outline-secondary border-0">
            Rent
            <svg class="icon">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </button>
        </div>
        <div class="info-card _tours">
          <a href="https://www.instagram.com" class="btn btn-outline-secondary border-0">
            Tours
            <svg class="icon">
              <use xlink:href="#arrow-right"></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div id="rent-list">
      <template v-if="makes">
        <list-of-filters
          :filters="makes"
          :multiple="true"
          @filtering="vehiclesFiltering"
        />
      </template>
    </div>

    <template v-if="isLoading">
      <placeholder-vehicles-cards :perPage="perPage" :makesLength="makes?.length"/>
    </template>
    <div :class="['row row-card', {'hide': isLoading}]">
      <vehicle-card
        v-for="vehicle in showingVehiclesList"
        :key="vehicle.id"
        :vehicle="vehicle"
        :isLoading="isLoading"
        @is-loading="loadedImage"
      />
      <template v-if="showingVehiclesList && showingVehiclesList.length < perPage">
        <temp-vehicle-card
          v-for="n in perPage - showingVehiclesList.length"
          :key="`tempVehicle${n}`"
        />
      </template>
    </div>

    <pagination-nav
      v-if="totalVehicles && totalVehicles > perPage"
      :totalItems="totalVehicles"
      :itemsPerPage="perPage"
      :currentPage="currentPage"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { IVehicleQueryParamsType, IVehicleType, StatusQueryParams } from '@/modules/list-of-vehicles/constants';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import VehicleCard from '@/modules/list-of-vehicles/components/VehicleCard.vue';
import { IErrorType } from '@/constants/constants';
import { showErrors } from '@/services/api/showApiErrors';
import ListOfFilters from '@/modules/list-of-vehicles/components/ListOfFilters.vue';
import PaginationNav from '@/components/PaginationNav.vue';
import PlaceholderVehiclesCards from '@/modules/list-of-vehicles/components/PlaceholderVehiclesCards.vue';
import TempVehicleCard from '@/modules/list-of-vehicles/components/TempVehicleCard.vue';

const showingVehiclesList = ref<IVehicleType[] | null>(null);
const isLoading = ref(false);
const makes = ref<string[] | null>(null);
const selectedMakes = ref<string[] | null>(null);
const currentPage = ref(1);
const totalVehicles = ref(0);
const perPage = 6;

const params = computed(() => {
  return {
    perPage,
    page: currentPage.value,
    status: StatusQueryParams.Published,
    makes: selectedMakes.value,
  };
});

onMounted(() => {
  loadVehiclesList(params.value);
  loadPublishedMakesList();
});

const loadVehiclesList = async (params: IVehicleQueryParamsType): Promise<void> => {
  isLoading.value = true;
  try {
    if (showingVehiclesList.value) {
      showingVehiclesList.value = null;
    }

    const res = await vehiclesApi.getVehiclesList(params);
    totalVehicles.value = res.totalCount;
    showingVehiclesList.value = res.items;
  } catch (errors) {
    isLoading.value = false;
    showErrors(errors as IErrorType);
  }
};

const loadPublishedMakesList = async (): Promise<void> => {
  isLoading.value = true;
  try {
    makes.value = await vehiclesApi.vehiclePublishedMakes();
  } catch (errors) {
    isLoading.value = false;
    showErrors(errors as IErrorType);
  }
};

const vehiclesFiltering = (makes: string[]): void => {
  currentPage.value = 1;
  selectedMakes.value = makes;
  loadVehiclesList(params.value);
};

const handlePageChange = (page: number): void => {
  currentPage.value = page;
  loadVehiclesList(params.value);
};

const loadedImage = (): void => {
  if (!isLoading.value) return;
  isLoading.value = false;
};
const scrollToElement = (selector: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    const offsetDesktop = 120;
    const offsetMobile = 20;
    const offset = window.innerWidth >= 992 ? offsetDesktop : offsetMobile;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};
</script>

<!-- need to include ListOfVehicles.css to twig template if we use style -->
<!-- <style lang="styl" scoped></style> -->
