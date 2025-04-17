<template>
  <div class="col-12 col-md-6 col-xl-4">
    <div class="card card-vehicle">
      <div class="img-wrap">
        <img @load="emit('isLoading')" :src="vehicle.images[0].croppedImage.uri" class="card-img-top" :alt="vehicle.model">
      </div>
      <div class="card-body">
        <div class="content">
          <h5 class="card-title">{{ vehicle.make }}</h5>
          <p class="card-text">{{ vehicle.model }}</p>
        </div>
      </div>
      <div class="card-footer">
        <div class="content">
          <a :href="`/vehicle-rents/create/${vehicle.id}`" class="btn btn-outline-secondary">Check Availability</a>
          <div class="price-box">
            <span class="price-old">${{ maxPrice }}</span>
            <span class="price">${{ minPrice }}/ Day</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IVehiclePropType } from '@/modules/list-of-vehicles/constants';

const emit = defineEmits(['isLoading']);

const { vehicle } = defineProps<IVehiclePropType>();

const allVehiclePrices = [
  vehicle.oneThreeDaysPrice,
  vehicle.fourSevenDaysPrice,
  vehicle.eightFourteenDaysPrice,
  vehicle.fifteenThirtyDaysPrice,
  vehicle.monthOrMoreDaysPrice,
];

const maxPrice = computed(() => (Math.max(...allVehiclePrices) / 100));
const minPrice = computed(() => Math.min(...allVehiclePrices) / 100);
</script>
