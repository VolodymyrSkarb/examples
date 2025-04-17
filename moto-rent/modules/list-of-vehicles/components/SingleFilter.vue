<template>
  <div class="filter-badge" :class="{ active: isSelected }">
    <span>{{ formatedFilter(filter) }}</span>
    <span @click.prevent="removeFilter(filter)">
      <svg class="icon">
        <use xlink:href="#close-circle"></use>
      </svg>
    </span>
    <span class="checked" @click.prevent="addFilter(filter)"></span>
  </div>
</template>

<script lang="ts" setup>
import { IFilterPropType } from '@/modules/list-of-vehicles/constants';
import { capitalize } from 'lodash';

const { filter, isSelected } = defineProps<IFilterPropType>();
const emit = defineEmits(['addFilter', 'removeFilter']);

const addFilter = (filter: string): void => {
  emit('addFilter', filter);
};

const removeFilter = (filter: string): void => {
  emit('removeFilter', filter);
};

const formatedFilter = (string: string):string => {
  return capitalize(string);
};
</script>
