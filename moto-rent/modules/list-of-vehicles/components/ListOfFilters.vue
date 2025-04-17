<template>
  <div class="filter-wrap">
    <single-filter
      v-for="filter in filters"
      :filter="filter"
      :is-selected="isSelected(filter)"
      :key="filter"
      @add-filter="addSelectedFilter($event)"
      @remove-filter="removeSelectedFilter($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IFiltersPropType } from '@/modules/list-of-vehicles/constants';
import SingleFilter from '@/modules/list-of-vehicles/components/SingleFilter.vue';

const selectedFiltersArray = ref<string[]>([]);

const { multiple, filters } = defineProps<IFiltersPropType>();
const emit = defineEmits(['filtering']);

const addSelectedFilter = (filter: string): void => {
  if (!multiple && selectedFiltersArray.value.length) {
    selectedFiltersArray.value.splice(0, selectedFiltersArray.value.length);
  }

  selectedFiltersArray.value.push(filter);
  emit('filtering', selectedFiltersArray.value);
};

const removeSelectedFilter = (filter: string): void => {
  selectedFiltersArray.value = selectedFiltersArray.value.filter((selectedFilter) => selectedFilter !== filter);
  emit('filtering', selectedFiltersArray.value);
};

const isSelected = (filter: string): boolean => {
  return selectedFiltersArray.value.includes(filter);
};
</script>
