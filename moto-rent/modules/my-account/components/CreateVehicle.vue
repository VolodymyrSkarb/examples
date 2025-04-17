<template>
  <div class="my-account-page-content">
    <section class="section_listing-details">
      <div class="container">
        <h2 class="h2 mb-4">Listing</h2>
        <h6 class="h6 mb-3">General Details</h6>
        <p class="mb-4">Select the year, make and model of your motorcycle</p>
        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3 mb-2">
            <autocomplete-input
              name="year"
              label="Year"
              placeholder="Year"
              :options="yearOptions"
              :error="modelErrors.year"
              v-model="model.year"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3 mb-2">
            <autocomplete-input
              name="make"
              label="Make"
              placeholder="Make"
              :options="makeOptions"
              :error="modelErrors.make"
              v-model="model.make"
            />
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <autocomplete-input
              name="model"
              label="Model"
              placeholder="Model"
              :options="modelOptions"
              :error="modelErrors.model"
              v-model="model.model"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="form-group">
              <label class="form-label" for="seatHeight">Seat Height:</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.seatHeight }]"
                  type="number"
                  id="seatHeight"
                  v-model="model.seatHeight"
                  @input="formatNumber(model.seatHeight, 'seatHeight')"
                >
                <span class="input-group-text">inches</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.seatHeight }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="form-group">
              <label class="form-label" for="weight">Weight:</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.weight }]"
                  type="number"
                  id="weight"
                  v-model="model.weight"
                  @input="formatNumber(model.weight, 'weight')"
                >
                <span class="input-group-text">Ibs</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.weight }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label" for="engine">Engine:</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.engine }]"
                  type="number"
                  id="engine"
                  v-model="model.engine"
                  @input="formatNumber(model.engine, 'engine')"
                >
                <span class="input-group-text">CC</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.engine }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label" for="vin">Vehicle ID (VIN):</label>
              <input
                :class="['form-control',{ 'is-invalid': modelErrors.vinNumber }]"
                type="text"
                id="vin"
                v-model="model.vinNumber">
              <div class="form-error invalid-feedback ">{{ modelErrors.vinNumber }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section_listing-desc mb-5">
      <div class="container">
        <h6 class="h6 mb-3">Description</h6>
        <p class="mb-2">Provide a detailed description of your motorcycle and add any aftermarket parts or custom
          features below.</p>
        <p class="mb-1">Motorcycle Description</p>
        <TextEditor :error="modelErrors.description" v-model="model.description"/>
      </div>
    </section>

    <section class="section_listing-photos mb-5">
      <div class="container">
        <h6 class="h6 mb-3">Photos</h6>
        <p class="mb-4">Upload photos and a YouTube video of your motorcycle to impress potential renters. Be sure to star your
          favorite photo to be used as the cover image in search results.</p>

        <image-crop :error="modelErrors.imageBagUuids" @imagesUuids="updateImagesUuids" :images="images"/>

        <div class="form-error invalid-feedback ">{{ modelErrors.imageBagUuids }}</div>

        <p class="mt-4">Share Your Photos and Videos Effectively Across Social Networks</p>
        <div class="row">
          <div class="col-12 col-md-4">
            <input
              :class="['form-control',{ 'is-invalid': modelErrors.socialLink }]"
              type="text"
              placeholder="Link"
              v-model="model.socialLink">
            <div class="form-error invalid-feedback ">{{ modelErrors.socialLink }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section_listing-price mb-5">
      <div class="container">
        <h6 class="h6 mb-3">Price</h6>
        <p>
          The rental price you set is inclusive of a 30% service fee
        </p>

        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="form-group">
              <label class="form-label" for="1-3-days">1-3 days</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.oneThreeDaysPrice }]"
                  type="number"
                  id="1-3-days"
                  v-model.number="oneThreeDaysPrice"
                  @input="formatNumber(oneThreeDaysPrice, 'oneThreeDaysPrice', 2, 100)"
                >
                  <span class="input-group-text">day</span>
                  <div class="form-error invalid-feedback ">{{ modelErrors.oneThreeDaysPrice }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label" for="4-7-days">4-7 days</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.fourSevenDaysPrice }]"
                  type="number"
                  id="4-7-days"
                  v-model.number="fourSevenDaysPrice"
                  @input="formatNumber(this.fourSevenDaysPrice, 'fourSevenDaysPrice', 2, 100)"
                >
                  <span class="input-group-text">day</span>
                  <div class="form-error invalid-feedback ">{{ modelErrors.fourSevenDaysPrice }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3 mb-3">
            <div class="form-group">
              <label class="form-label" for="8-14-days">8-14 days</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.eightFourteenDaysPrice }]"
                  type="number"
                  id="8-14-days"
                  v-model.number="eightFourteenDaysPrice"
                  @input="formatNumber(this.eightFourteenDaysPrice, 'eightFourteenDaysPrice', 2, 100)"
                >
                <span class="input-group-text">day</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.eightFourteenDaysPrice }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label" for="15-30-days">15-30 days</label>
              <div class="input-group">
                <input
                :class="['form-control',{ 'is-invalid': modelErrors.fifteenThirtyDaysPrice }]"
                type="number"
                id="15-30-days"
                v-model.number="fifteenThirtyDaysPrice"
                @input="formatNumber(this.fifteenThirtyDaysPrice, 'fifteenThirtyDaysPrice', 2, 100)"
              >
                <span class="input-group-text">day</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.fifteenThirtyDaysPrice }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label" for="1-month">1 month +</label>
              <div class="input-group">
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.monthOrMoreDaysPrice }]"
                  type="number"
                  id="1-month"
                  v-model.number="monthOrMoreDaysPrice"
                  @input="formatNumber(this.monthOrMoreDaysPrice, 'monthOrMoreDaysPrice', 2, 100)"
                >
                <span class="input-group-text">day</span>
                <div class="form-error invalid-feedback ">{{ modelErrors.monthOrMoreDaysPrice }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section_listing-location mb-5">
      <div class="container">
        <h6 class="h6 mb-3">Pick up location</h6>
        <p>
          Enter a US address where your bike can be picked up & dropped off. For your security, this location is slightly randomized for public display.
        </p>
        <div class="row">
          <div class="col-12 col-md-6">
            <GoogleMapsAutocomplete
              v-model="addresses"
              :error="modelErrors.addresses"
              @placeSelected="onPlaceSelected"
              />
          </div>
        </div>
      </div>
    </section>

    <section class="section_listing-schedule mb-5">
      <div class="container">
        <h6 class="h6 mb-3">Schedule & Availability</h6>
        <p>
          Going for a ride? Block off any unavailble dates below.
        </p>
        <p>
          If dates are disabled in your calendar, it means that they have already been reserved for a rental. To make these dates available, please contact the person who reserved them and ask them to cancel their reservation.
        </p>
        <div class="form-group">
          <div v-if="unavailableRanges">
            <div v-for="(dateRange, index) in unavailableRanges" :key="dateRange.startDate" class="schedule-box">
              <p>{{ formatDate(dateRange.startDate) }} - {{ formatDate(dateRange.endDate) }}</p>
              <svg v-if="checkIsDeleteRange(dateRange)" class="icon" @click="removeDateRange(index)">
                <use xlink:href="#close"></use>
              </svg>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-9">
              <CustomDatePicker
                v-model="date"
                class="dp-custom-menu"
                inline
                range
                menu-class-name="dp-custom-menu"
                calendar-class-name="dp-custom-calendar"
                no-disabled-range
                :startYear="startYear"
                :endYear="endYear"
                :disabledDates="disabledDates"
                ref="datepicker"
                @update:model-value="handleDate"
                @range-end="onRangeEnd"
                @range-start="onRangeStart"
              >
                <template #action-row="{ selectDate }">
                  <div class="action-row">
                    <button class="btn btn-primary" :disabled="isDisabled" @click="selectDate">Add Range</button>
                  </div>
                </template>
              </CustomDatePicker>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section_listing-limits mb-4">
      <div class="container">
        <h6 class="h6 mb-3">Mileage Limits & Renter Restrictions</h6>
        <p>
          We recommend at least 250 miles/day. This will default to unlimited miles if left empty.
        </p>
        <div class="row mb-3">
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label">Daily Mileage Limit</label>
              <div class="input-group">
                <span class="input-group-text">mi</span>
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.dailyMileageLimit }]"
                  type="number"
                  placeholder="Daily Mileage Limit"
                  v-model="model.dailyMileageLimit">
                <div class="form-error invalid-feedback ">{{ modelErrors.dailyMileageLimit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="form-group">
              <label class="form-label">Overage Fee ($1 max/mile)</label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.overageFeePerExtraMile }]"
                  type="number"
                  placeholder="Coverage Fee ($/mile)"
                  v-model="model.overageFeePerExtraMile">
                <div class="form-error invalid-feedback ">{{ modelErrors.overageFeePerExtraMile }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-listing-btn">
      <div class="container">
        <div class="d-flex justify-content-end flex-column flex-md-row align-items-center">
          <button class="btn btn-outline-secondary mx-md-3 mb-3 mb-md-0" @click="saveOrUpdateDraft">Save as draft</button>
          <button v-if="verifyIdStatus === VerifyStatuses.VERIFIED" class="btn btn-primary" @click="saveOrUpdatePublish">Save and publish</button>
          <button
            v-if="verifyIdStatus !== VerifyStatuses.VERIFIED"
            class="btn btn-primary"
            @click="switchModalState"
            v-tooltip data-bs-placement="bottom"
            title="Publish a Vehicle is available only for  verified users"
          >
            Verify profile
          </button>
        </div>
      </div>
    </section>
    <modal-window
      :isOpen="isModalOpened"
      @modal-close="switchModalState"
    >
      <template #content>
        <div>
          <h5 style="text-align: center">Maybe you want to save your motorcycle in the draft?</h5>
        </div>
      </template>
      <template #footer>
        <div>
          <button class="btn btn-primary" @click.stop="saveAsDraftAndVerify">Save and verify</button>
        </div>
        <div>
          <button class="btn btn-primary" @click.stop="cancelSave">Cancel</button>
        </div>
      </template>
    </modal-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapActions, mapState } from 'pinia';
import { isEmpty } from 'lodash';
import { useListingsStore } from '@/services/store';
import AutocompleteInput from '@/modules/my-account/components/AutocompleteInput.vue';
import TextEditor from '@/modules/my-account/components/TextEditor.vue';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import router, { PAGE_ACCOUNT } from '@/services/router';
import { IUnavailableDatesType, IVehicleModels, IVehicleType, ModelKey } from '@/modules/list-of-vehicles/constants';
import { showErrors } from '@/services/api/showApiErrors';
import { IErrorType } from '@/constants/constants';
import ImageCrop from '@/modules/my-account/components/ImageCrop.vue';
import {
  FormattedPlace, IAddressType,
  IDateRangeIsoType,
  IDateRangeType,
  ImageBagUuidsType,
  IResponseVehicleImagesType,
  IValidationVehicleErrors,
  VerifyCustomerStatuses,
} from '../constants';
import validateVehicleForm from '../VehicleValidation';
import { showErrorToast, showSuccessToast } from '@/components/Notifications';
import { DatePickerInstance } from '@vuepic/vue-datepicker';
import CustomDatePicker from '@/components/CustomDatePicker.vue';
import { convertToLocalTime } from '@/modules/my-account/utils';
import { TYPE_BAD_REQUEST, TYPE_REASONS_ERROR } from '@/constants/http';
import GoogleMapsAutocomplete from '@/modules/my-account/components/GoogleMapsAutocomplete.vue';
import ModalWindow from '@/components/ModalWindow.vue';
import { userApi } from '@/services/api/UserApi';

const defaultErrors: IValidationVehicleErrors = {
  year: '',
  make: '',
  model: '',
  seatHeight: '',
  weight: '',
  engine: '',
  vinNumber: '',
  description: '',
  oneThreeDaysPrice: '',
  fourSevenDaysPrice: '',
  eightFourteenDaysPrice: '',
  fifteenThirtyDaysPrice: '',
  monthOrMoreDaysPrice: '',
  socialLink: '',
  addresses: '',
  unavailableDates: '',
  dailyMileageLimit: '',
  overageFeePerExtraMile: '',
  imageBagUuids: '',
};

export default defineComponent({
  name: 'ListingPage',

  components: {
    ModalWindow,
    GoogleMapsAutocomplete,
    CustomDatePicker,
    AutocompleteInput,
    TextEditor,
    ImageCrop,
  },

  data() {
    return {
      model: {
        year: 0,
        make: '',
        model: '',
        seatHeight: 0,
        weight: 0,
        engine: 0,
        vinNumber: '',
        description: '',
        oneThreeDaysPrice: 0,
        fourSevenDaysPrice: 0,
        eightFourteenDaysPrice: 0,
        fifteenThirtyDaysPrice: 0,
        monthOrMoreDaysPrice: 0,
        socialLink: null as string | null,
        addresses: [] as IAddressType[],
        unavailableDates: [] as IUnavailableDatesType[],
        dailyMileageLimit: 0,
        overageFeePerExtraMile: 0,
        imageBagUuids: [] as ImageBagUuidsType[],
      },
      modelOptions: [] as { value: string; label: string }[],
      modelErrors: { ...defaultErrors },
      images: [] as IResponseVehicleImagesType[],
      vehicleId: null as number | null,
      date: null as Date[] | null,
      disabledDates: [] as Date[],
      unavailableAndRentRanges: [] as IDateRangeType[],
      unavailableRanges: [] as IDateRangeType[],
      isDisabled: true,
      addresses: [] as IAddressType[],
      verifyIdStatus: window.userInfo.vehicleOwner.verificationStatus || VerifyCustomerStatuses.NOT_VERIFIED,
      isModalOpened: false,
      vehicle: null as IVehicleType | null,
    };
  },

  setup() {
    const datepicker = ref<DatePickerInstance>(null);

    return {
      datepicker,
    };
  },

  computed: {
    VerifyStatuses() {
      return VerifyCustomerStatuses;
    },
    ...mapState(useListingsStore, ['vehiclesMakes']),

    yearOptions() {
      const yearList = [];
      const currentYear = new Date().getFullYear();

      for (let year = 2000; year <= currentYear; year++) {
        yearList.push(year);
      }

      return yearList.map(year => ({ value: year, label: year }));
    },

    makeOptions() {
      return (this.vehiclesMakes).map(model => ({ value: model, label: model }));
    },

    monthOrMoreDaysPrice: {
      get(): number {
        return this.model.monthOrMoreDaysPrice / 100;
      },
      set(value: number) {
        this.model.monthOrMoreDaysPrice = value * 100;
      },
    },

    fifteenThirtyDaysPrice: {
      get(): number {
        return this.model.fifteenThirtyDaysPrice / 100;
      },
      set(value: number) {
        this.model.fifteenThirtyDaysPrice = value * 100;
      },
    },

    eightFourteenDaysPrice: {
      get(): number {
        return this.model.eightFourteenDaysPrice / 100;
      },
      set(value: number) {
        this.model.eightFourteenDaysPrice = value * 100;
      },
    },

    fourSevenDaysPrice: {
      get(): number {
        return this.model.fourSevenDaysPrice / 100;
      },
      set(value: number) {
        this.model.fourSevenDaysPrice = value * 100;
      },
    },

    oneThreeDaysPrice: {
      get(): number {
        return this.model.oneThreeDaysPrice / 100;
      },
      set(value: number) {
        this.model.oneThreeDaysPrice = value * 100;
      },
    },

    startYear() {
      return new Date().getFullYear();
    },

    endYear() {
      return new Date().getFullYear() + 1;
    },
  },

  watch: {
    'model.make': {
      handler(value, oldvalue) {
        if (value !== oldvalue) {
          this.fetchModelOptions(value);
          if (oldvalue) {
            this.model.model = '';
          }
        }
      },
    },

    'model.socialLink': {
      handler(value) {
        if (value?.length === 0) {
          this.model.socialLink = null;
        }
      },
    },
  },

  created() {
    this.vehicleId = +this.$route.params.id;
    if (this.vehicleId) {
      this.fetchVehicleData(this.vehicleId);
    }
  },

  mounted() {
    if (this.vehiclesMakes.length === 0) {
      this.getVehicleMakes();
    }
  },

  methods: {
    ...mapActions(useListingsStore, ['getVehicleMakes']),

    onPlaceSelected(place: FormattedPlace) {
      if (!place) return;

      const address: IAddressType = {
        state: (place.administrative_area_level_1 || ''),
        city: place.locality || place.sublocality,
        streetName: place.route,
        streetNumber: place.street_number,
        country: place.country,
        zipCode: place.postal_code,
        coordinates: {
          latitude: place.latitude,
          longitude: place.longitude,
        },
        formattedAddress: place.formattedAddress,
      };

      this.model.addresses = [address];
    },

    async getVehicleModels(make: string): Promise<IVehicleModels> {
      try {
        const modelsOptions = await vehiclesApi.vehicleModels(make);

        return modelsOptions;
      } catch (errors) {
        showErrors(errors as IErrorType);
        throw errors;
      }
    },

    async fetchVehicleData(id: number) {
      try {
        const response = await vehiclesApi.getVehicle(id);

        this.model = {
          ...response,
          imageBagUuids: response.images.map((image: IResponseVehicleImagesType) => ({
            originalImageUuid: image.originalImage.uuid,
            croppedImageUuid: image.croppedImage.uuid,
          })),
        };

        this.addresses = response.addresses;

        const allUnavailableRanges: IDateRangeIsoType[] = await vehiclesApi.getVehicleUnavailableAndRentDates(id);
        this.unavailableAndRentRanges = allUnavailableRanges.map((range: IDateRangeIsoType) => ({
          startDate: new Date(range.startDate),
          endDate: new Date(range.endDate),
        }));
        this.unavailableAndRentRanges.forEach(range => this.createDisabledDatesList([range.startDate, range.endDate]));

        this.unavailableRanges = response.unavailableDates.map((date: IUnavailableDatesType) => ({
          startDate: convertToLocalTime(date.startDate),
          endDate: convertToLocalTime(date.endDate),
        }));
        this.images = response.images.map((image: IResponseVehicleImagesType) => image);
      } catch (errors) {
        showErrors(errors as IErrorType);
        throw errors;
      }
    },

    validateModelData() {
      if (this.model.year && isNaN(this.model.year)) {
        this.modelErrors.year = 'Year should be a number';
        return;
      } else {
        this.model.year = +this.model.year;
      }

      const formatText = this.model.description.replace(/<\/?[^>]+(>|$)/g, '');
      const newModel = { ...this.model, description: formatText };

      const errors = validateVehicleForm(newModel);
      this.modelErrors = { ...defaultErrors };

      if (!isEmpty(errors)) {
        const filledErrors = this.fillMissingErrorFields(errors);
        this.modelErrors = filledErrors;

        return false;
      }

      return true;
    },

    fillMissingErrorFields(errors: Partial<IValidationVehicleErrors>): IValidationVehicleErrors {
      return { ...this.modelErrors, ...errors };
    },

    async fetchModelOptions(make: string) {
      if (!this.model.make) {
        this.modelOptions = [];

        return;
      }
      try {
        const vehicleModels = await this.getVehicleModels(make);

        if (vehicleModels && vehicleModels.items.length) {
          this.modelOptions = vehicleModels.items.map(model => ({
            value: model.model,
            label: model.model,
          }));
        } else {
          this.modelOptions = [];
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch model options:', error);
        this.modelOptions = [];
      }
    },

    async saveOrUpdateDraft() {
      const id = this.$route.params.id;

      if (id) {
        await this.updateDraft();
      } else {
        await this.saveAsDraft();
      }
    },

    saveOrUpdatePublish() {
      const id = this.$route.params.id;
      if (id) {
        this.updatePublished();
      } else {
        this.saveAndPublish();
      }
    },

    async saveAsDraft() {
      if (!this.validateModelData()) {
        return;
      }

      this.model.unavailableDates = [...this.unavailableRanges];
      const payload = { ...this.model };

      try {
        this.vehicle = await vehiclesApi.vehicleCreateDraft(payload);
        showSuccessToast('You have successfully save your listing as draft');

        if (this.verifyIdStatus === VerifyCustomerStatuses.VERIFIED) {
          setTimeout(() => {
            router.push({ name: PAGE_ACCOUNT });
          }, 1000);
        } else {
          this.switchModalState();
        }
      } catch (errors) {
        this.checkIsUniqueVinErrors(errors as IErrorType);
        showErrors(errors as IErrorType);
      }
    },

    async saveAndPublish() {
      if (!this.validateModelData()) {
        return;
      }

      this.model.unavailableDates = [...this.unavailableRanges];
      const payload = { ...this.model };

      try {
        await vehiclesApi.vehicleCreatePublish(payload);
        showSuccessToast('You have successfully created your listing');
        setTimeout(() => {
          router.push({ name: PAGE_ACCOUNT });
        }, 1000);
      } catch (errors) {
        this.checkIsUniqueVinErrors(errors as IErrorType);
        showErrors(errors as IErrorType);
      }
    },

    async updateDraft() {
      if (!this.validateModelData() || !this.vehicleId) {
        return;
      }

      this.model.unavailableDates = [...this.unavailableRanges];
      const payload = { ...this.model };

      try {
        this.vehicle = await vehiclesApi.vehicleUpdateDraft(payload, this.vehicleId);
        showSuccessToast('You have successfully updated your draft');

        if (this.verifyIdStatus === VerifyCustomerStatuses.VERIFIED) {
          setTimeout(() => {
            router.push({ name: PAGE_ACCOUNT });
          }, 1000);
        } else {
          this.switchModalState();
        }
      } catch (errors) {
        this.checkIsUniqueVinErrors(errors as IErrorType);
        showErrors(errors as IErrorType);
      }
    },

    async updatePublished() {
      if (!this.validateModelData() || !this.vehicleId) {
        return;
      }

      this.model.unavailableDates = [...this.unavailableRanges];
      const payload = { ...this.model };

      try {
        await vehiclesApi.vehicleUpdatePublished(payload, this.vehicleId);
        showSuccessToast('You have successfully updated your listing');
        setTimeout(() => {
          router.push({ name: PAGE_ACCOUNT });
        }, 1000);
      } catch (errors) {
        this.checkIsUniqueVinErrors(errors as IErrorType);
        showErrors(errors as IErrorType);
      }
    },

    updateImagesUuids(uuids: ImageBagUuidsType[]) {
      this.model.imageBagUuids = uuids;
    },

    formatDate(date: Date): string {
      const currentDate = new Date(date);
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const year = currentDate.getFullYear();
      return `${month}.${day}.${year}`;
    },

    handleDate(dateRange: Date[]) {
      if (!this.datepicker || !dateRange) return;
      this.createDisabledDatesList(dateRange);

      this.unavailableAndRentRanges.push({ startDate: dateRange[0], endDate: dateRange[1] });
      this.unavailableRanges.push({ startDate: dateRange[0], endDate: dateRange[1] });
      this.date = null;
      const datepickerInstance = this.datepicker.$refs.datepicker as DatePickerInstance;

      if (datepickerInstance) {
        datepickerInstance.clearValue();
      }
    },

    createDisabledDatesList(dateRange: Date[]) {
      let [start, end]: Date[] = dateRange.map(item => {
        return convertToLocalTime(item);
      });

      const currentDate: Date = new Date(start);

      while (currentDate <= end) {
        this.disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        end = new Date(end);
      }
    },

    removeDateRange(index: number) {
      const rangeToRemove = this.unavailableRanges[index];
      this.unavailableRanges.splice(index, 1);
      this.disabledDates = this.disabledDates.filter(date => {
        return date < rangeToRemove.startDate || date > rangeToRemove.endDate;
      });
    },

    checkIsDeleteRange(range: IDateRangeType) {
      return this.unavailableRanges.some(unavailableRange => {
        return unavailableRange.startDate.getTime() === new Date(range.startDate).getTime() &&
          unavailableRange.endDate.getTime() === new Date(range.endDate).getTime();
      });
    },
    onRangeEnd() {
      this.isDisabled = false;
    },
    onRangeStart() {
      this.isDisabled = true;
    },
    checkIsUniqueVinErrors(errors: IErrorType) {
      if (errors.type === TYPE_BAD_REQUEST && errors.details.reason === TYPE_REASONS_ERROR.ALREADY_EXISTS_VIN) {
        this.modelErrors.vinNumber = 'This VIN number is already in use';
      }
    },
    switchModalState(): void {
      this.isModalOpened = !this.isModalOpened;
    },
    async cancelSave(): Promise<void> {
      this.switchModalState();
      const response = await userApi.connectedAccountVerification();
      window.open(response.url, '_blank');
      await router.push({ name: PAGE_ACCOUNT });
    },
    async saveAsDraftAndVerify(): Promise<void> {
      try {
        if (!this.validateModelData()) {
          this.switchModalState();
          showErrorToast('Check all fields of the form');
        }

        await this.saveOrUpdateDraft();

        if (this.vehicle) {
          const response = await userApi.connectedAccountVerification();
          window.open(response.url, '_blank');
          await router.push({ name: PAGE_ACCOUNT });
        }
      } catch (errors) {
        showErrors(errors as IErrorType);
      }
    },

    formatNumber(value: number, fieldKey: ModelKey, afterDot: number = 5, correctNum: number = 1): void {
      const stringValue = String(value);
      const regex = new RegExp(`^\\d*\\.?\\d{0,${afterDot}}`);
      const formattedValue = stringValue.match(regex)?.[0] || '';

      this.model[fieldKey] = parseFloat(formattedValue) * correctNum;
    },
  },
});
</script>
