<template>
  <div>
    <select
      :class="['form-select',{ 'is-invalid': error }] "
      :id="name"
      v-model="selectedValue"
      @change="onChange"
    >
      <option v-if="!selectedValue" :value="modelValue" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" :selected="option.value === selectedValue" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>
    <div class="form-error invalid-feedback ">{{ error }}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';

interface Option {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}

export default defineComponent({
  name: 'CustomSelect',

  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array as () => Option[],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    error: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue);

    watch(() => props.modelValue, newVal => {
      selectedValue.value = newVal;
    });

    watch(selectedValue, (newValue) => {
      emit('update:modelValue', newValue);
    });

    const onChange = ():void => {
      emit('input', selectedValue.value);
    };

    return { selectedValue, onChange };
  },
});
</script>
