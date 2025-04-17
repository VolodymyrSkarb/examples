<template>
  <div>
    <div :class="['form-group', { 'is-invalid': error }]">
      <input
        type="text"
        :id="name"
        :class="['form-control', { 'is-invalid': error }]"
        v-model="inputValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        :placeholder="placeholder"
      />
      <div v-if="showDropdown" class="dropdown-menu show">
        <button
          v-for="option in filteredOptions"
          :key="option.value"
          @mousedown="selectOption(option)"
          class="dropdown-item"
        >
          {{ option.label }}
        </button>
      </div>
      <div class="form-error invalid-feedback">{{ error }}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch, computed } from 'vue';

interface Option {
  value: string | number;
  label: string | number;
}

export default defineComponent({
  name: 'AutocompleteInput',

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
    const inputValue = ref('');
    const showDropdown = ref(false);

    watch(() => props.modelValue, newVal => {
      if (newVal !== inputValue.value) {
        const selectedOption = props.options.find(option => option.value === newVal);
        inputValue.value = selectedOption?.label.toString() || newVal.toString();
      }
    });

    const filteredOptions = computed(() => {
      const searchTerm = inputValue.value.toLowerCase();
      return props.options.filter(option =>
        option.label.toString().toLowerCase().includes(searchTerm),
      );
    });

    const changeShowDropdown = (): void => {
      if (!filteredOptions.value.length) {
        showDropdown.value = false;

        return;
      }

      showDropdown.value = true;
    };

    const onInput = (): void => {
      changeShowDropdown();
    };

    const onFocus = (): void => {
      changeShowDropdown();
    };

    const selectOption = (option: Option): void => {
      inputValue.value = option.label.toString();
      emit('update:modelValue', option.value);
      showDropdown.value = false;
    };

    const onBlur = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      inputValue.value = target.value;
      emit('update:modelValue', target.value);
      showDropdown.value = false;
    };

    return { inputValue, filteredOptions, showDropdown, onInput, selectOption, onBlur, onFocus };
  },
});
</script>

<style>
.form-group {
  position: relative;
  width: 100%;
}
.dropdown-menu {
  display: block;
  position: absolute;
  z-index: 99;
  width: inherit;
  max-height: 250px;
  overflow-y: auto;
}
</style>
