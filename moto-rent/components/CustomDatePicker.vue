<template>
  <VueDatePicker
    v-bind="$attrs"
    :class="[{ 'is-invalid': isInvalid }, ...customClass]"
    :enable-time-picker="false"
    :action-row="[{ showPreview: false },{showSelect: false}]"
    auto-apply
    :clearable="false"
    :year-range="[startYear, endYear]"
    :disabled-dates="disabledDates"
    :min-date="minDate"
    :max-date="maxDate"
    input-class-name="border-red"
    ref="datepicker"
  >
    <template #action-row="{ selectDate }">
      <slot name="action-row" :selectDate="selectDate"></slot>
    </template>
  </VueDatePicker>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueDatePicker, { DatePickerInstance } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
  name: 'CustomDatePicker',
  components: {
    VueDatePicker,
  },
  props: {
    isInvalid: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: Array,
      default: () => [],
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    disabledDates: {
      type: Array,
      default: () => [],
    },
    maxDate: {
      type: Date,
      default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    },
    minDate: {
      type: Date,
      default: () => new Date(),
    },
    actionRow: {
      type: Object,
      default: () => ({ showPreview: false }),
    },
  },
  setup() {
    const datepicker = ref<DatePickerInstance>(null);

    return {
      datepicker,
    };
  },
});
</script>
