<template>
  <section v-if="vehicle" class="section_vehicle-main">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-12 col-lg-6">
          <div class="vehicle-carousel">
            <div id="imageCarousel" class="carousel slide pointer-event">
              <div class="carousel-content">
                <div class="carousel-inner">
                  <div v-for="(image, index) in vehicle.images" :key="index"
                       :class="['carousel-item', {active: index === 0}]">
                    <a
                      :href="image.originalImage.uri"
                      data-gallery="gallery"
                      class="glightbox"
                    >
                      <img :src="image.croppedImage.uri" class="d-block w-100" alt="...">
                    </a>
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#imageCarousel"
                          data-bs-slide="prev">
                    <svg class="icon">
                      <use xlink:href="#chevron-left"></use>
                    </svg>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#imageCarousel"
                          data-bs-slide="next">
                    <svg class="icon">
                      <use xlink:href="#chevron-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ol class="carousel-indicators mb-4 mb-lg-0">
                <li v-for="(image, index) in vehicle.images" :key="index" data-bs-target="#imageCarousel"
                    :data-bs-slide-to="index" :class="{active: index === 0}">
                  <img :src="image.croppedImage.uri" class="d-block w-100" alt="...">
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-5">
          <div class="vehicle-info">
            <h4 class="vehicle-name" id="list-item-1">{{vehicle.make}} {{vehicle.model}}</h4>
            <p class="title">Year: {{ vehicle.year }}</p>
            <span class="vehicle-price h5">${{formatedPrice(vehicle.monthOrMoreDaysPrice)}}/day</span>
            <div class="vehicle-price-content">
              <div ref="infoContainer" class="vehicle-info-selected-box" @scroll="onScroll">
                <h5 class="anchor h5 mb-3 " id="list-item-2">Select Motorcycle</h5>
                <ul class="mb-4">
                  <li class="mb-3">1 - 3 days: $ {{formatedPrice(vehicle.oneThreeDaysPrice)}} / day</li>
                  <li class="mb-3">4 - 7 days: $ {{formatedPrice(vehicle.fourSevenDaysPrice)}} / day</li>
                  <li class="mb-3">9 - 14 days: $ {{formatedPrice(vehicle.eightFourteenDaysPrice)}} / day</li>
                  <li class="mb-3">15 - 30 days: $ {{formatedPrice(vehicle.fifteenThirtyDaysPrice)}} / day</li>
                  <li class="mb-3">30 days and over: $ {{formatedPrice(vehicle.monthOrMoreDaysPrice)}} / day</li>
                </ul>
                <p class="title mb-4 anchor">Mileage Limits & Renter Restrictions</p>

                <div class="limits-box">
                  <div class="limits-info">
                    <p>Daily Mileage Limit </p>
                    <span><span>mi</span>{{ vehicle.dailyMileageLimit }}</span>
                  </div>
                  <div class="limits-info">
                    <p>Overage Fee ($1 max/mile)</p>
                    <span><span>$</span>{{ vehicle.overageFeePerExtraMile }}</span>
                  </div>
                </div>
                <div class="details-box">
                  <p class="h5 pt-2 anchor">
                    General Details
                  </p>
                  <div class="details-content">
                    <p class="details-col">
                      <svg class="icon">
                        <use xlink:href="#libra"></use>
                      </svg>
                      {{ vehicle.weight }} lbs
                    </p>
                    <p class="details-col">
                      <svg class="icon">
                        <use xlink:href="#seatHeight"></use>
                      </svg>
                      {{ vehicle.seatHeight }}" seat height
                    </p>
                    <p>
                      <svg class="icon">
                        <use xlink:href="#speed"></use>
                      </svg>
                      {{ vehicle.engine }}cc
                    </p>
                    <p>
                      <svg class="icon">
                        <use xlink:href="#barcode"></use>
                      </svg>
                      VIN {{ vehicle.vinNumber }}
                    </p>
                  </div>
                </div>

                <p class="anchor h5 pt-2">
                  Description
                </p>

                <div class="mb-3" id="description-block" v-html="vehicle.description"></div>

                <template v-if="vehicle.socialLink">
                  <p class="title pt-2">
                    Discover more photos and videos
                  </p>
                  <p class="vehicle-social">
                    <svg class="icon">
                      <use xlink:href="#world"></use>
                    </svg>
                    <a :href="vehicle.socialLink" class="link">
                      {{ vehicle.socialLink }}
                    </a>
                  </p>
                </template>

              </div>
              <div class="scroll-indicator">
                <div
                  v-for="(item, index) in steps"
                  :key="index"
                  :class="['dot', { active: activeStep === index }]"
                  @click="scrollToStep(index)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section_vehicle-rent-form">
    <div class="container">
      <div class="card_vehicle-rent-form">
        <div class="row">
          <div class="col-12 col-lg-6 mb-5 mb-lg-3 pe-sm-4">
            <div class="row">
              <div class="col-12">
                <h5 class="h5 mb-3 pb-1">Pick-up</h5>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <CustomDatePicker
                  v-model="model.startDate"
                  :is-invalid="!!modelErrors.startDate"
                  :customClass="['calendar-main']"
                  :startYear="startYear"
                  :endYear="endYear"
                  :disabledDates="disabledDates"
                  :clearable="true"
                  placeholder="mm/dd/yyyy"
                  model-type="MM.dd.yyyy"
                  @update:model-value="handleStartDateChange"
                  @cleared="clearStartDate"
                >
                  <template #action-row="{ selectDate }">
                    <div class="action-row">
                      <button class="btn btn-primary" @click="selectDate">Select</button>
                    </div>
                  </template>
                </CustomDatePicker>
                <div class="form-error invalid-feedback ">{{ modelErrors.startDate }}</div>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <custom-select
                  name="pick-up-time"
                  placeholder="Choose a time"
                  label="Choose a time"
                  :options="defineAvailableHours(model.startDate)"
                  :error="modelErrors.startTime"
                  v-model="model.startTime"
                />
              </div>
              <custom-select
                name="pick-up-time"
                placeholder="Address"
                :options="addressOptions"
                :error="modelErrors.pickUpAddress"
                v-model="model.pickUpAddress"
              />
            </div>
          </div>
          <div class="col-12 col-lg-6 mb-3 ps-sm-4">
            <div class="row">
              <div class="col-12">
                <h5 class="h5 mb-3 pb-1">Drop-off</h5>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <CustomDatePicker
                  v-model="model.endDate"
                  :is-invalid="!!modelErrors.endDate || !!modelErrors.unavailableEndDate"
                  :customClass="['calendar-main']"
                  :startYear="startYear"
                  :endYear="endYear"
                  :disabledDates="disabledDates"
                  :min-date="minDate"
                  :clearable="true"
                  placeholder="mm/dd/yyyy"
                  model-type="MM.dd.yyyy"
                  @update:model-value="handleEndDateChange"
                  @cleared="clearEndDate"
                >
                  <template #action-row="{ selectDate }">
                    <div class="action-row">
                      <button class="btn btn-primary" @click="selectDate">Select</button>
                    </div>
                  </template>
                </CustomDatePicker>
                <div class="form-error invalid-feedback ">{{ modelErrors.endDate }}</div>
              </div>
              <div class="col-12 col-sm-6 mb-3">
                <custom-select
                  name="pick-up-time"
                  placeholder="Choose a time"
                  :options="defineAvailableHours(model.endDate)"
                  :error="modelErrors.endTime"
                  v-model="model.endTime"
                />
              </div>
              <div :class="[{ 'd-block': !!modelErrors.unavailableEndDate }, 'form-error invalid-feedback mb-3']">{{ modelErrors.unavailableEndDate }}</div>
              <custom-select
                name="pick-up-time"
                placeholder="Address"
                :options="addressOptions"
                :error="modelErrors.dropOffAddress"
                v-model="model.dropOffAddress"
              />
            </div>
          </div>
        </div>
        <div class="row mt-3 justify-content-end">
          <div v-if="totalPrice" class="col-12 col-md-6">
            <div class="price-box">
              <p class="h5 pb-3">
                Rent Price
              </p>
              <div class="price-item pe-5">
                ${{formatedPrice(totalPrice.rentPricePerDay)}}x{{totalPrice.totalRentDays}} Days
                <span>
                  ${{ formatedPrice(totalPrice.rentPrice) }}
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 ps-md-4 mt-4 mt-md-0">
            <div class="btn-box">
              <span class="d-inline-block w-100" tabindex="0" v-tooltip data-bs-placement="bottom" :title="isAvailableRentMsg">
                <button
                  class="btn btn-primary w-100 w-md-50 justify-content-center"
                  @click="submit"
                  :disabled="!isLoggedIn || !isDriverLicenseVerified"
                >
                  Submit now
                </button>
              </span>

              <a
                v-if="!isLoggedIn"
                :href="`/login?vehicleId=${vehicleId}`"
                class="btn btn-primary w-100 w-md-50 justify-content-center"
              >
                Sign in
              </a>

              <a
                href="/my-account"
                v-if="isLoggedIn && !isDriverLicenseVerified"
                class="btn btn-primary w-100 w-md-50 justify-content-center"
              >
                Verify diver license
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="similarVehicles?.length" class="section_gallery">
    <div class="container">
      <div class="row row-card">
        <h4>You may also like</h4>
        <vehicle-card
          v-for="vehicle in similarVehicles"
          :key="vehicle.id"
          :vehicle="vehicle"
        />
      </div>
    </div>
  </section>

  <reviews-rent v-if="vehicleId" :id-rent="vehicleId"/>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { isEmpty } from 'lodash';

import CustomSelect from '@/modules/my-account/components/CustomSelect.vue';
import VehicleCard from '@/modules/list-of-vehicles/components/VehicleCard.vue';
import CustomDatePicker from '@/components/CustomDatePicker.vue';
import ReviewsRent from '@/modules/vehicle-rent/components/ReviewsRent.vue';

import { showErrors } from '@/services/api/showApiErrors';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import { IErrorType } from '@/constants/constants';
import { IVehicleType } from '@/modules/list-of-vehicles/constants';
import validateVehicleRentForm from '@/modules/vehicle-rent/VehicleValidation';
import {
  IPriceType,
  IVehicleRentErrorsType,
  IVehicleRentFormDataType,
  IVehicleRentModelType,
} from '@/modules/vehicle-rent/constants';
import { vehicleRentApi } from '@/modules/vehicle-rent/services/VehicleRentApi';
import { IAddressType, IDateRangeIsoType, VerifyCustomerStatuses } from '@/modules/my-account/constants';
import { convertToLocalTime } from '@/modules/my-account/utils';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const defaultErrors = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  pickUpAddress: '',
  dropOffAddress: '',
  unavailableEndDate: '',
};

const DAY = 24 * 60 * 60 * 1000;

export default defineComponent({
  name: 'VehicleRent',
  components: {
    CustomDatePicker,
    VehicleCard,
    CustomSelect,
    ReviewsRent,
  },

  props: {
    id: {
      type: [String, Number],
      required: false,
    },
  },

  data() {
    return {
      model: {
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        pickUpAddress: '',
        dropOffAddress: '',
      } as IVehicleRentModelType,
      isLoggedIn: window.isAuthenticated,
      isDriverLicenseVerified: window.userInfo.customer?.verificationStatus === VerifyCustomerStatuses.VERIFIED,
      modelErrors: { ...defaultErrors },
      rentTimes: [] as { label: string; value: string, disabled?: boolean }[],
      disabledDates: [] as Date[],
      minDate: new Date(),
      unavailableRanges: [] as { startDate: Date, endDate: Date }[],
    };
  },

  setup() {
    const vehicle = ref<IVehicleType | null>(null);
    const totalPrice = ref<IPriceType | null>(null);
    const infoContainer = ref<HTMLDivElement | null>(null);
    const similarVehicles = ref<IVehicleType[] | null>(null);
    const addressOptions = ref<{ value: number; label: string }[]>([]);
    const vehicleId = ref<number | null>(null);
    const steps = ref<HTMLElement[]>([]);
    const activeStep = ref(0);
    const date = ref('');

    return {
      vehicle,
      similarVehicles,
      addressOptions,
      vehicleId,
      infoContainer,
      steps,
      activeStep,
      date,
      totalPrice,
    };
  },

  created() {
    this.vehicleId = +this.$route.params.id;
    if (this.vehicleId) {
      this.fetchVehicleData(this.vehicleId);
    }

    for (let hour = 0; hour < 24; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const label = `${displayHour}:00 ${period}`;
      const value = `${hour}:00`;
      this.rentTimes.push({ label, value });
    }
  },

  mounted() {
    this.initializeSteps();
    this.initLightbox();
  },

  updated() {
    this.initLightbox();
  },

  computed: {
    startYear() {
      return new Date().getFullYear();
    },
    endYear() {
      return new Date().getFullYear() + 1;
    },
    isAvailableRentMsg() {
      return (!this.isLoggedIn || !this.isDriverLicenseVerified) ? 'Submit the Rent is available only for authorized and verified users' : '';
    },
  },

  watch: {
    infoContainer(newVal) {
      if (newVal) {
        this.initializeSteps();
      }
    },
    'model.startTime': 'handleModelChange',
    'model.endTime': 'handleModelChange',

    'vehicle.addresses': {
      handler() {
        this.addGoogleMapPlace();
      },
      immediate: true,
    },
  },

  methods: {
    async addGoogleMapPlace() {
      const address = this.vehicle?.addresses[0];
      if (address) {
        const coordinates = address?.coordinates;

        if (coordinates?.latitude && coordinates?.longitude) {
          const { latitude, longitude } = coordinates;
          const mapElement = document.getElementById('map');
          if (mapElement) {
            mapElement.setAttribute('data-latitude', latitude.toString());
            mapElement.setAttribute('data-longitude', longitude.toString());
          }
        }
      }

      if (window.initMap) {
        window.initMap();
      }
    },

    formatedPrice(price: number): number {
      return price / 100;
    },
    async handleModelChange(value: string, oldValue: string) {
      if (value !== oldValue && this.vehicleId && this.model.startDate && this.model.endDate) {
        const startDate = this.toISOStringWithTimezone(this.model.startDate, this.model.startTime);
        const endDate = this.toISOStringWithTimezone(this.model.endDate, this.model.endTime);
        this.totalPrice = await vehicleRentApi.calculatePrice({ startDate, endDate }, this.vehicleId);
      }
    },
    clearEndDate() {
      this.model.endDate = '';
      this.modelErrors.unavailableEndDate = '';
      this.totalPrice = null;
    },
    clearStartDate() {
      this.model.startDate = '';
      this.modelErrors.startDate = '';
      this.minDate = new Date();
      this.totalPrice = null;
    },
    async handleEndDateChange(value: string, oldValue: string) {
      this.validateDates(this.model.startDate, this.model.endDate);
      await this.handleModelChange(value, oldValue);
    },
    validateDates(start: string, end: string) {
      const userStart = new Date(start);
      const userEnd = new Date(end);
      this.modelErrors.startDate = '';

      for (const range of this.unavailableRanges) {
        const unavailableStart = new Date(range.startDate);
        const unavailableEnd = new Date(range.endDate);

        const isUnavailableRangeLaterThanStart = [unavailableStart, unavailableEnd].every(d => d > userStart);
        const isUnavailableRangeEarlierThanEnd = [unavailableStart, unavailableEnd].every(d => d < userEnd);

        if (isUnavailableRangeLaterThanStart && isUnavailableRangeEarlierThanEnd) {
          this.model.endDate = this.formatDate(new Date(unavailableStart.getTime() - DAY));
          this.modelErrors.unavailableEndDate = `Unfortunately, the date range you have selected includes days that are
          not available for motorcycle rental. Please choose a different date range.`;
          break;
        } else {
          this.modelErrors.unavailableEndDate = '';
        }
      }
    },
    formatDate(date: Date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${month}.${day}.${year}`;
    },
    async handleStartDateChange(value: string, oldValue: string) {
      if (!value) return;

      const selectedDate = new Date(value);
      const selectedEndDate = new Date(this.model.endDate);

      if (selectedEndDate && selectedDate > selectedEndDate) {
        this.model.startDate = this.formatDate(selectedEndDate);
        this.modelErrors.startDate = 'Pick-up cannot be less than Drop-off. Please select a different date.';
        await this.handleModelChange(value, oldValue);

        return;
      }

      this.validateDates(this.model.startDate, this.model.endDate);

      await this.handleModelChange(value, oldValue);

      this.minDate = selectedDate;
    },
    defineAvailableHours(date: string) {
      const selectedDate = new Date(date);
      const now = new Date();
      const selectedDay = selectedDate.setHours(0, 0, 0, 0);
      const currentDay = now.setHours(0, 0, 0, 0);

      if (selectedDay === currentDay) {
        const currentHour = new Date().getHours();
        return this.rentTimes.map((time, index) => ({
          ...time,
          disabled: currentHour >= index,
        }));
      } else {
        return this.rentTimes.map((time) => ({
          ...time,
          disabled: false,
        }));
      }
    },
    scrollToStep(index: number): void {
      if (!this.infoContainer) return;
      const target = this.steps[index];
      this.infoContainer.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    },

    updateActiveStep(): void {
      if (!this.infoContainer) return;
      const scrollTop = this.infoContainer.scrollTop;
      const containerHeight = this.infoContainer.offsetHeight;
      const containerScrollHeight = this.infoContainer.scrollHeight;

      if (scrollTop + containerHeight >= containerScrollHeight) {
        this.activeStep = this.steps.length - 1;
        return;
      }

      this.steps.forEach((step, index) => {
        const stepOffsetTop = step.offsetTop;
        const isVisibleOnTop = stepOffsetTop >= scrollTop && stepOffsetTop <= scrollTop + containerHeight - 200;

        if (isVisibleOnTop) {
          this.activeStep = index;
        }
      });
    },

    onScroll(): void {
      this.updateActiveStep();
    },

    initializeSteps(): void {
      if (!this.infoContainer) return;
      this.steps = Array.from(this.infoContainer.querySelectorAll('.anchor')) as HTMLElement[];
      this.updateActiveStep();
    },

    async fetchVehicleData(id: number): Promise<void> {
      try {
        this.vehicle = await vehiclesApi.getVehicle(id);
        this.similarVehicles = await vehiclesApi.getSimilarVehicles(id);
        const allUnavailableRanges: IDateRangeIsoType[] = await vehiclesApi.getVehicleUnavailableAndRentDates(id);
        this.unavailableRanges = allUnavailableRanges.map((range: IDateRangeIsoType) => {
          const startDate = new Date(range.startDate);
          const endDate = new Date(range.endDate);
          const localStartDate = new Date(
            startDate.getUTCFullYear(),
            startDate.getUTCMonth(),
            startDate.getUTCDate(),
            startDate.getUTCHours(),
          );
          const localEndDate = new Date(
            endDate.getUTCFullYear(),
            endDate.getUTCMonth(),
            endDate.getUTCDate(),
            endDate.getUTCHours(),
          );

          return { startDate: localStartDate, endDate: localEndDate };
        });

        this.unavailableRanges.forEach(range => this.createDisabledDatesList([range.startDate, range.endDate]));

        this.addressOptions = this.vehicle.addresses
          .map((address: IAddressType) => ({
            value: address.id as number,
            label: address.formattedAddress as string,
          }));
      } catch (errors) {
        showErrors(errors as IErrorType);
        throw errors;
      }
    },

    createDisabledDatesList(dateRange: Date[]) {
      let [start, end]: Date[] = dateRange.map(date => new Date(date));
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      const currentDate: Date = new Date(start);

      while (currentDate <= end) {
        this.disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        end = new Date(end);
      }
    },

    toISOStringWithTimezone(dateStr: string, time: string = '00:00'): string {
      const [month, day, year] = dateStr.split('.').map(Number);

      return convertToLocalTime(`${month}/${day}/${year} ${time}`).toISOString();
    },

    fillMissingErrorFields(errors: Partial<IVehicleRentErrorsType>): IVehicleRentErrorsType {
      return { ...this.modelErrors, ...errors };
    },

    validateModelData() {
      const errors = validateVehicleRentForm(this.model);
      this.modelErrors = { ...defaultErrors };

      if (!isEmpty(errors)) {
        this.modelErrors = this.fillMissingErrorFields(errors);

        return false;
      }

      return true;
    },

    async submit() {
      if (!this.validateModelData() || !this.vehicleId) {
        return;
      }

      const pickUpDate = this.toISOStringWithTimezone(this.model.startDate, this.model.startTime);
      const dropOfDate = this.toISOStringWithTimezone(this.model.endDate, this.model.endTime);

      const payload: IVehicleRentFormDataType = {
        pickUpDate,
        dropOfDate,
        vehicleId: this.vehicleId,
        pickUpAddress: this.model.pickUpAddress,
        dropOffAddress: this.model.dropOffAddress,
      };

      try {
        const response = await vehicleRentApi.submitForm(payload);
        setTimeout(() => {
          window.location.href = `/vehicle-rents/rent-information/${response.id}`;
        }, 1000);
      } catch (errors) {
        showErrors(errors as IErrorType);
      }
    },

    initLightbox() {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        zoomable: true,
        draggable: true,
        openEffect: 'zoom',
        closeEffect: 'fade',
      });
    },
  },
});
</script>
