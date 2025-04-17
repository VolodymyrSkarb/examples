<template>
  <input
    type="text"
    ref="autocompleteField"
    id="autocomplete"
    :class="['form-control', { 'is-invalid': locationError }]"
    v-model="selectedLocation"
    @input="onInput"
    placeholder="Enter a US address"
  />
  <div v-if="locationError" class="form-error invalid-feedback">{{ locationError }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AddressComponents, FormattedPlace } from '@/modules/my-account/constants';

const ADDRESS_COMPONENTS: AddressComponents = {
  subpremise: 'short_name',
  street_number: 'short_name',
  route: 'short_name',
  locality: 'long_name',
  sublocality: 'long_name',
  administrative_area_level_1: 'short_name',
  administrative_area_level_2: 'short_name',
  country: 'short_name',
  postal_code: 'short_name',
};

export default defineComponent({
  name: 'GoogleMapsAutocomplete',

  props: {
    error: {
      type: String,
      default: '',
    },
    modelValue: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      selectedLocation: '',
      locationError: '',
    };
  },

  mounted() {
    this.initAutocomplete();
  },

  watch: {
    modelValue: {
      handler(newVal) {
        this.selectedLocation = newVal[0]?.formattedAddress || '';
      },
      immediate: true,
    },

    error: {
      handler(value) {
        this.locationError = value;
      },
      immediate: true,
    },
  },

  setup() {
    const autocompleteField = ref<HTMLInputElement | null>(null);

    return {
      autocompleteField,
    };
  },

  methods: {
    onInput(event: InputEvent) {
      const target = event.target as HTMLInputElement;
      this.selectedLocation = target.value;
      this.clearErrorMsg();

      if (!this.selectedLocation.length) {
        this.$emit('clearLocation');
      }
    },

    initAutocomplete() {
      const options = {
        types: ['address'],
        componentRestrictions: { country: 'us' },
      };

      if (!this.autocompleteField) return;

      const autocomplete = new google.maps.places.Autocomplete(this.autocompleteField, options);

      autocomplete.addListener('place_changed', () => {
        const place = this.formatResult(autocomplete.getPlace());

        if (!place) return;

        if (this.isCompleteAddress(place)) {
          this.selectedLocation = place.formattedAddress || '';
          this.$emit('placeSelected', place);
          this.clearErrorMsg();
        } else {
          this.setErrorMsg('Please enter a complete address.');
        }
      });
    },

    setErrorMsg(message: string) {
      this.locationError = message;
    },

    clearErrorMsg() {
      this.locationError = '';
    },

    formatResult(place: google.maps.places.PlaceResult) {
      if (!place.address_components) return;

      const returnData: FormattedPlace = {};
      returnData.formattedAddress = place.formatted_address;

      for (const component of place.address_components) {
        for (const addressType of component.types) {
          if (ADDRESS_COMPONENTS[addressType]) {
            const key = ADDRESS_COMPONENTS[addressType];
            let value = component[key as keyof google.maps.GeocoderAddressComponent];

            if (Array.isArray(value)) {
              value = value.join(', ');
            }

            returnData[addressType] = value;
          }
        }
      }

      if (place.geometry?.location) {
        returnData.latitude = place.geometry.location.lat();
        returnData.longitude = place.geometry.location.lng();
      }

      return returnData;
    },

    isCompleteAddress(place: FormattedPlace) {
      return (
        place.street_number &&
        place.route &&
        place.locality &&
        place.administrative_area_level_1 &&
        place.postal_code
      );
    },
  },
});
</script>

<style scoped>
.form-control {
  font-family: "Plus Jakarta Sans", sans-serif;
}
</style>
