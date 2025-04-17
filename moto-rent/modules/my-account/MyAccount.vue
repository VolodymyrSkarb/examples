<template>
  <section class="section_account">
    <div class="container">
      <h2 class="h2">
        Account
      </h2>
      <div class="profile-info">
        <div v-if="imageUuid" class="profile-info-icon-wrap">
          <span class="remove-photo-icon" @click="removeProfileImage">
            <svg>
              <use xlink:href="#remove-cross"></use>
            </svg>
          </span>
        </div>
        <image-crop
          is-upload-avatar
          :images="profileImage"
          :stencil-props="stencilPropsForAvatar"
          @imagesUuids="updateUserInfo"
          />
        <div class="row">
          <div class="col-12 col-lg-6">
            <div class="verified-info">
              <div class="actions">
                <div class="row">
                  <div class="col">
                    <span class="label">Account verification</span>
                    <div class="actions-container">
                      <div class="verified-status">
                        <p>{{ formatedStatus(verifyConnectedAccountStatus) }}</p>
                      </div>
                      <div v-if="showVerifyConnectedAccountButton" class="action-btn">
                        <button @click="connectedAccountVerification" class="btn btn-outline-secondary">Verify identity</button>
                      </div>
                      <div v-if="!showVerifyConnectedAccountButton" class="action-btn">
                        <button @click="getConnectedAccountLoginLink" class="btn btn-outline-secondary">My Stripe Account</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <span class="label">Driver license verification</span>
                    <div class="actions-container">
                      <div class="verified-status">
                        <p>{{ formatedStatus(verifyDriverLicenseStatus) }}</p>
                      </div>
                      <div v-if="showVerifyDriverLicenseButton" class="action-btn">
                        <button @click="driverLicenseVerification" class="btn btn-outline-secondary">Verify driver license</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="content">
              <div class="row">
                <div class="col">
                  <div class="user_name">
                    <span class="label">First name:</span>
                    <p>
                      <span v-if="!isEditFirstName" class="info">{{ firstName }}</span>
                      <input
                        v-show="isEditFirstName"
                        :class="['form-control user-info',{ 'is-invalid': modelErrors.firstName }]"
                        type="text"
                        ref="firstName"
                        autofocus
                        v-on:keyup.enter="updateUserInfo"
                        @blur="updateUserInfo"
                        v-model="firstName"
                      >
                      <button v-if="!isEditFirstName && !isErrors" class="btn btn-link" @click="editFirstName">
                        <svg class="icon">
                          <use xlink:href="#edit"></use>
                        </svg>
                      </button>
                    </p>
                    <div :class="['form-error invalid-feedback first-name',{ 'is-invalid': modelErrors.firstName }]">{{ modelErrors.firstName }}</div>
                  </div>
                </div>
              </div>
              <div class="row contact-info flex-nowrap">
                <div class="col">
                  <div class="user_name">
                    <span class="label">Last name:</span>
                    <p>
                      <span  v-if="!isEditLastName" class="info">{{ lastName }}</span>
                      <input
                        v-if="isEditLastName"
                        :class="['form-control user-info',{ 'is-invalid': modelErrors.lastName }]"
                        type="text"
                        ref="lastName"
                        v-on:keyup.enter="updateUserInfo"
                        @blur="updateUserInfo"
                        v-model="lastName"
                      >
                      <button v-if="!isEditLastName && !isErrors" class="btn btn-link" @click="editLastName">
                        <svg class="icon">
                          <use xlink:href="#edit"></use>
                        </svg>
                      </button>
                    </p>
                    <div :class="['form-error invalid-feedback',{ 'is-invalid': modelErrors.lastName }]">{{ modelErrors.lastName }}</div>
                  </div>
                </div>
                <div class="col">
                  <div>
                    <span class="label">Email:</span>
                    <p>
                      <span class="info">{{ email }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section_account-listings">
    <div class="container">
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          :class="['nav-link', { active: activeTab === MyAccountTabs.MY_RENTS }]"
          :id="MyAccountTabs.MY_RENTS +'tab'"
          data-bs-toggle="tab"
          :data-bs-target="'#' + MyAccountTabs.MY_RENTS"
          type="button"
          role="tab"
          :aria-controls="MyAccountTabs.MY_RENTS"
          aria-selected="false"
          @click="handleTabChange(MyAccountTabs.MY_RENTS)"
        >My Rents</button>
        <button
          :class="['nav-link', { active: activeTab === MyAccountTabs.CLIENTS_RENTS }]"
          :id="MyAccountTabs.CLIENTS_RENTS +'tab'"
          data-bs-toggle="tab"
          :data-bs-target="'#' + MyAccountTabs.CLIENTS_RENTS"
          type="button"
          role="tab"
          :aria-controls="MyAccountTabs.CLIENTS_RENTS"
          aria-selected="false"
          @click="handleTabChange(MyAccountTabs.CLIENTS_RENTS)"
        >Client's Rents</button>
        <button
          :class="['nav-link', { active: activeTab === MyAccountTabs.VEHICLES }]"
          :id="MyAccountTabs.VEHICLES +'tab'"
          data-bs-toggle="tab"
          :data-bs-target="'#' + MyAccountTabs.VEHICLES"
          type="button"
          role="tab"
          :aria-controls="MyAccountTabs.VEHICLES"
          aria-selected="true"
          @click="handleTabChange(MyAccountTabs.VEHICLES)"
        >My Listings</button>
      </div>
      <div class="tab-content mt-3" id="nav-tabContent">
        <div class="top-bar justify-content-between d-flex mb-4">
          <div class="btn-box">
            <template v-if="filters">
              <list-of-filters
                :filters="filters"
                :multiple="false"
                @filtering="vehiclesFiltering"
              />
            </template>
          </div>
          <span
            tabindex="0"
            v-tooltip
            data-bs-placement="bottom"
            :title="tooltipText"
          >
            <a
              v-if="activeTab === MyAccountTabs.VEHICLES"
              :class="['btn btn-primary', { 'disabled': !isShowAddListingButton }]"
              @click="addListing()">Add Listing
            </a>
          </span>
        </div>

        <div
          :class="['tab-pane fade', { 'show active': activeTab === MyAccountTabs.MY_RENTS }]"
          :id="MyAccountTabs.MY_RENTS"
          role="tabpanel"
          :aria-labelledby="MyAccountTabs.MY_RENTS +'tab'"
        >
          <card-placeholder v-if="isLoading" :per-page="perPage"/>

          <div v-if="!isLoading && !myRents.length">
            <h5 class="h5 mb-0">No Active Rents</h5>
          </div>

          <div v-if="!isLoading && myRents.length" class="list-card">
            <div class="list-item" v-for="(rent, index) in myRents" :key="index">

              <div class="content">
                <span class="name-moto">Vehicle</span>
                <span class="name">{{ rent.vehicle.make }} {{ rent.vehicle.model }} {{ rent.vehicle.year }}</span>
                <div class="mt-2 price">
                  <span class="days">{{ rent.totalRentDays }} day(s)</span>
                  <span>{{ formatedPrice(rent.totalRentPrice) }}</span>
                </div>
              </div>

              <div class="actions">
                <span class="date">{{ formatDateRange(rent.pickUpDate, rent.dropOfDate) }}</span>
                <span :class="['status', rent.paymentStatus]">{{ rent.paymentStatus }}</span>
                <button
                  v-if="rent.paymentStatus === PaymentStatuses.PAID && !rent.refund && !checkAvailableDates(rent.dropOfDate)"
                  @click="cancelRent(rent.id)"
                  class="btn btn-outline-secondary"
                >Cancel Rent</button>
                <a
                  v-if="rent.paymentStatus === PaymentStatuses.NEW && !rent.refund"
                  :href="`/vehicle-rents/rent-information/${rent.id}`"
                  class="btn btn-outline-secondary"
                >Continue</a>

                <button
                  v-if="rent.paymentStatus === PaymentStatuses.PAID && rent.makeReviewBlocker === null"
                  class="btn btn-outline-secondary"
                  @click="toggleModal(rent.id)"
                >
                  Leave a review
                </button>
              </div>

            </div>
          </div>
        </div>

        <review-modal
          :isModalOpened="isReviewModalOpened"
          @modal-close="toggleModal(currentRentId!)"
          @submit-review="currentRent && handleReviewSubmit(currentRent, $event)"
        />

        <div
          :class="['tab-pane fade', { 'show active': activeTab === MyAccountTabs.CLIENTS_RENTS }]"
          :id="MyAccountTabs.CLIENTS_RENTS"
          role="tabpanel"
          :aria-labelledby="MyAccountTabs.CLIENTS_RENTS +'tab'"
        >
          <card-placeholder v-if="isLoading" :per-page="perPage"/>
          <div v-if="!isLoading && !rentsFromCustomers.length">
            <h5 class="h5 mb-0">No Active Rents</h5>
          </div>
          <div v-if="!isLoading && rentsFromCustomers.length" class="list-card">
            <div class="list-item user-info" v-for="(rent, index) in rentsFromCustomers" :key="index">
              <div class="content">
                <span class="name-moto">{{ rent.vehicle.make }}</span>
                <span class="name">{{ rent.vehicle.model }} {{ rent.vehicle.year }}</span>
                <div class="mt-2 price">
                  <span class="days">{{ rent.totalRentDays }} day(s)</span>
                  <span>{{ formatedPrice(rent.totalRentPrice) }}</span>
                </div>
              </div>
              <div class="content">
                <span class="name-moto">Client</span>
                <span class="name">{{ rent.user.firstName }} {{ rent.user.lastName }}</span>
                <span class="mt-2 email">{{ rent.user.email }}</span>
              </div>
              <div class="actions">
                <span class="date">{{ formatDateRange(rent.pickUpDate, rent.dropOfDate) }}</span>
                <span :class="['status', rent.paymentStatus]">{{ rent.paymentStatus }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          :class="['tab-pane fade', { 'show active': activeTab === MyAccountTabs.VEHICLES }]"
          :id="MyAccountTabs.VEHICLES"
          role="tabpanel"
          :aria-labelledby="MyAccountTabs.VEHICLES +'tab'"
        >
          <card-placeholder v-if="isLoading" :per-page="perPage"/>
          <div v-if="!isLoading && !listings.length">
            <h5 class="h5 mb-0">No Active Listings</h5>
          </div>

          <div v-if="!isLoading && listings.length" class="list-card">
            <div class="list-item" v-for="(listing, index) in listings" :key="index">
              <div class="content">
                <span class="name-moto">{{ listing.make }}</span>
                <span class="name">{{ listing.model }}</span>
              </div>
              <div class="actions">
                <span class="date">{{ listing.year }}</span>
                <span :class="['status', listing.status]">{{ listing.status }}</span>
                <button class="btn btn-outline-secondary" @click="editVehicle(listing.id)">Edit</button>
              </div>
            </div>
          </div>
        </div>

        <pagination-nav
          v-if="totalItems"
          :totalItems="totalItems"
          :itemsPerPage="perPage"
          :currentPage="currentPage"
          @page-changed="handlePageChange"
        />

      </div>
    </div>
  </section>
</template>

<script lang='ts'>
import { defineComponent, nextTick } from 'vue';
import { mapState, mapActions } from 'pinia';
import { CircleStencil } from 'vue-advanced-cropper';
import router, { PAGE_CREATE_VEHICLE, PAGE_EDIT_VEHICLE } from '@/services/router/index';

import ListOfFilters from '@/modules/list-of-vehicles/components/ListOfFilters.vue';
import PaginationNav from '@/components/PaginationNav.vue';
import CardPlaceholder from '@/modules/my-account/components/CardPlaceholder.vue';
import ImageCrop from '@/modules/my-account/components/ImageCrop.vue';
import ReviewModal from '@/modules/my-account/components/ReviewModal.vue';

import { useListingsStore } from '@/services/store';
import {
  ApiCallType,
  IMyVehiclesRentsQueryParamsType,
  IUserUpdateType,
  IVerificationResponseType,
  MyAccountTabs,
  PaymentStatuses,
  UserUpdateFields,
  VerifyCustomerStatuses,
  VerifyOwnerStatuses,
} from '@/modules/my-account/constants';
import { showErrors } from '@/services/api/showApiErrors';
import { IErrorType } from '@/constants/constants';
import { userApi } from '@/services/api/UserApi';
import { capitalize, isEmpty } from 'lodash';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import { IProfileImage, IVehicleRentType } from '@/modules/vehicle-rent/constants';
import { IVehicleQueryParamsType, StatusQueryParams } from '@/modules/list-of-vehicles/constants';
import validateUpdateUser from '@/modules/my-account/constants/validationSchema';
import { showSuccessToast } from '@/components/Notifications';

const PAYMENT_STATUSES = ['pending', 'paid', 'new', 'failed'];
const VEHICLE_STATUSES = ['draft', 'published'];
const PER_PAGE = 15;
const defaultErrors = {
  firstName: '',
  lastName: '',
};

export default defineComponent({
  name: 'MyAccount',
  components: {
    ImageCrop,
    CardPlaceholder,
    PaginationNav,
    ListOfFilters,
    ReviewModal,
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      imageUuid: '',
      verifyConnectedAccountStatus: window.userInfo.vehicleOwner?.verificationStatus || VerifyOwnerStatuses.UNVERIFIED,
      verifyDriverLicenseStatus: window.userInfo.customer?.verificationStatus || VerifyCustomerStatuses.NOT_VERIFIED,
      rentsFromCustomers: [] as IVehicleRentType[],
      myRents: [] as IVehicleRentType[],
      paymentStatuses: [...PAYMENT_STATUSES],
      vehicleStatuses: [...VEHICLE_STATUSES],
      perPage: PER_PAGE,
      currentPage: 1,
      totalItems: 0,
      activeTab: MyAccountTabs.MY_RENTS,
      filters: [] as string[],
      selectedFilters: [] as string[],
      isLoading: false,
      isEditFirstName: false,
      isEditLastName: false,
      modelErrors: { ...defaultErrors },
      profileImage: [window.userInfo.user.profileImage] as IProfileImage[],
      openModalId: null as number | null,
      isReviewModalOpened: false,
      currentRentId: null as number | null,
      currentRent: null as IVehicleRentType | null,
    };
  },

  computed: {
    PaymentStatuses() {
      return PaymentStatuses;
    },
    MyAccountTabs() {
      return MyAccountTabs;
    },
    VerifyCustomerStatuses() {
      return VerifyCustomerStatuses;
    },
    VerifyOwnerStatuses() {
      return VerifyOwnerStatuses;
    },
    ...mapState(useListingsStore, ['vehicleList']),

    listings() {
      return this.vehicleList.items;
    },

    showVerifyConnectedAccountButton() {
      return this.verifyConnectedAccountStatus !== VerifyOwnerStatuses.VERIFIED;
    },

    showVerifyDriverLicenseButton() {
      return this.verifyDriverLicenseStatus !== VerifyCustomerStatuses.VERIFIED;
    },

    isErrors(): boolean {
      return !isEmpty(this.modelErrors.firstName) || !isEmpty(this.modelErrors.lastName);
    },

    isShowAddListingButton(): boolean {
      return this.activeTab === MyAccountTabs.VEHICLES && this.verifyConnectedAccountStatus === VerifyOwnerStatuses.VERIFIED;
    },

    tooltipText(): string {
      if (this.verifyConnectedAccountStatus === VerifyOwnerStatuses.VERIFIED) {
        return '';
      }

      return 'To activate this button, please verify your identity using Stripe.';
    },

    stencilPropsForAvatar(): Record<string, unknown> {
      return {
        component: CircleStencil,
        props: {
          aspectRatio: 1,
          movable: true,
          resizable: true,
        },
      };
    },
  },

  watch: {
    vehicleList: {
      handler() {
        this.totalItems = this.vehicleList.totalCount;

        if (!this.selectedFilters.length && !this.totalItems) {
          this.filters = [];
        } else {
          this.filters = this.vehicleStatuses;
        }

        this.isLoading = false;
      },
      deep: true,
    },
  },

  mounted() {
    this.isLoading = true;

    const { user } = window.userInfo;

    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.imageUuid = user.profileImage?.uuid;
    }

    if (this.$route.params.tab) {
      const tab = this.$route.params.tab as MyAccountTabs;
      this.handleTabChange(tab);

      const newParams = { ...this.$route.params };
      delete newParams.tab;
      this.$router.push({ name: this.$route.name as string, params: newParams });

      return;
    }

    this.handleTabChange(this.activeTab);

    this.checkForReviewModal();
  },

  methods: {
    ...mapActions(useListingsStore, ['getVehicleList']),

    toggleEdit(field: UserUpdateFields) {
      this.isEditFirstName = field === UserUpdateFields.FIRST_NAME;
      this.isEditLastName = field === UserUpdateFields.LAST_NAME;

      nextTick(() => {
        const refName = `${field}` as keyof IUserUpdateType;
        const ref = this.$refs[refName] as HTMLInputElement;
        if (ref && ref instanceof HTMLInputElement) {
          ref.focus();
        }
      });
    },

    editFirstName() {
      this.toggleEdit(UserUpdateFields.FIRST_NAME);
    },

    editLastName() {
      this.toggleEdit(UserUpdateFields.LAST_NAME);
    },

    async updateUserInfo(imagesUuids: string[] = []) {
      if (!this.validateData()) {
        return;
      }

      this.isEditLastName = false;
      this.isEditFirstName = false;

      if (imagesUuids.length) {
        this.imageUuid = imagesUuids[0];
      }

      try {
        const user = await userApi.userUpdate({
          firstName: this.firstName,
          lastName: this.lastName,
          imageUuid: this.imageUuid,
        });

        this.profileImage = [user.profileImage];
      } catch (errors) {
        // eslint-disable-next-line no-console
        console.error(errors);
        showErrors(errors as IErrorType);
      }
    },

    validateData(): boolean {
      const errors = validateUpdateUser({
        firstName: this.firstName,
        lastName: this.lastName,
      });
      this.modelErrors = { ...defaultErrors };

      if (!isEmpty(errors)) {
        this.modelErrors = { ...this.modelErrors, ...errors };

        return false;
      }

      return true;
    },

    handleTabChange(tabId: MyAccountTabs) {
      this.activeTab = tabId;
      this.currentPage = 1;
      this.filters = [];
      this.selectedFilters.length = 0;
      this.totalItems = 0;
      this.isLoading = true;

      this.loadTabData(tabId);
    },

    loadTabData(tabId: string) {
      if (tabId === MyAccountTabs.CLIENTS_RENTS) {
        this.getRentsOfMyVehicles();
      } else if (tabId === MyAccountTabs.VEHICLES && this.verifyConnectedAccountStatus === VerifyOwnerStatuses.VERIFIED) {
        this.getMyVehicleList();
      } else if (tabId === MyAccountTabs.MY_RENTS) {
        this.getMyVehiclesRents();
      } else {
        this.isLoading = false;
      }
    },

    handlePageChange(page: number): void {
      this.isLoading = true;
      this.currentPage = page;
      this.loadTabData(this.activeTab);
    },

    getMonthName(date: Date) {
      return date.toLocaleString('en-US', { month: 'short' });
    },

    formatDateRange(startDay: string, endDay: string) {
      const pickUpDate = new Date(startDay);
      const dropOffDate = new Date(endDay);
      const pickUpMonth = this.getMonthName(pickUpDate);
      const dropOffMonth = this.getMonthName(dropOffDate);
      const pickUpDay = pickUpDate.getDate();
      const dropOffDay = dropOffDate.getDate();
      const year = pickUpDate.getFullYear();

      if (pickUpMonth === dropOffMonth) {
        return `${pickUpMonth} ${pickUpDay}-${dropOffDay}, ${year}`;
      } else {
        return `${pickUpMonth} ${pickUpDay}-${dropOffMonth} ${dropOffDay}, ${year}`;
      }
    },

    async getMyVehiclesRents() {
      const params: IMyVehiclesRentsQueryParamsType = {
        page: this.currentPage,
        perPage: this.perPage,
        paymentStatus: this.selectedFilters[0] as PaymentStatuses,
      };

      try {
        const res = await vehiclesApi.getMyVehiclesRents(params);
        if (!this.selectedFilters.length && !res.items.length) {
          this.filters = [];
        } else {
          this.filters = this.paymentStatuses;
        }

        this.myRents = res.items;
        this.totalItems = res.totalCount;
        this.isLoading = false;
      } catch (error) {
        showErrors(error as IErrorType);
        throw new Error(error);
      }
    },

    async getRentsOfMyVehicles() {
      const params: IMyVehiclesRentsQueryParamsType = {
        page: this.currentPage,
        perPage: this.perPage,
      };

      try {
        this.filters = [];
        const res = await vehiclesApi.getRentsOfMyVehicles(params);
        this.rentsFromCustomers = res.items;
        this.totalItems = res.totalCount;
        this.isLoading = false;
      } catch (error) {
        showErrors(error as IErrorType);
        throw new Error(error);
      }
    },

    async getMyVehicleList(): Promise<void> {
      const params: IVehicleQueryParamsType = {
        page: this.currentPage,
        perPage: this.perPage,
        status: this.selectedFilters[0] as StatusQueryParams,
      };

      try {
        this.filters = this.vehicleStatuses;
        await this.getVehicleList(params);
        this.totalItems = this.vehicleList.totalCount;
        this.isLoading = false;
      } catch (error) {
        showErrors(error as IErrorType);
        throw new Error(error);
      }
    },

    vehiclesFiltering(filter: string[]): void {
      this.currentPage = 1;
      this.selectedFilters = filter;
      this.isLoading = true;
      this.loadTabData(this.activeTab);
    },

    editVehicle(id: number):void {
      router.push({ name: PAGE_EDIT_VEHICLE, params: { id } });
    },

    addListing():void {
      router.push({ name: PAGE_CREATE_VEHICLE });
    },

    formatedStatus(string: string):string {
      return capitalize(string);
    },

    async handleVerification(apiCall: ApiCallType<IVerificationResponseType>): Promise<void> {
      try {
        const response = await apiCall();
        window.location.href = response.url;
      } catch (errors) {
        showErrors(errors as IErrorType);
        throw errors;
      }
    },

    async connectedAccountVerification(): Promise<void> {
      await this.handleVerification(() => userApi.connectedAccountVerification());
    },

    async driverLicenseVerification(): Promise<void> {
      await this.handleVerification(() => userApi.driverLicenseVerification());
    },

    async getConnectedAccountLoginLink(): Promise<void> {
      await this.handleVerification(() => userApi.getConnectedAccountLoginLink());
    },

    formatedPrice(price: number): string {
      return `$${price / 100}`;
    },

    async cancelRent(id: number): Promise<void> {
      vehiclesApi.refundRent(id)
        .then((res: IVehicleRentType) => {
          const rentIndex = this.myRents.findIndex((rent: IVehicleRentType) => rent.id === id);

          if (rentIndex !== -1) {
            this.myRents.splice(rentIndex, 1, res);
          }
        })
        .catch(error => {
          showErrors(error as IErrorType);
        });
    },

    async removeProfileImage() {
      const isConfirmRemovePhoto = confirm('Are you sure you want to delete your profile photo?');

      if (isConfirmRemovePhoto) {
        this.imageUuid = '';
        this.profileImage.length = 0;
        try {
          await userApi.userUpdate({
            firstName: this.firstName,
            lastName: this.lastName,
            imageUuid: null,
          });
        } catch (errors) {
          // eslint-disable-next-line no-console
          console.error(errors);
          showErrors(errors as IErrorType);
        }
      }
    },

    checkAvailableDates(dropOfDate: string): boolean {
      const currentDate = new Date();
      const dropOf = new Date(dropOfDate);

      return dropOf < currentDate;
    },

    toggleModal(rentId: number) {
      this.isReviewModalOpened = !this.isReviewModalOpened;
      this.currentRentId = rentId;
      this.currentRent = this.myRents.find(rent => rent.id === rentId) || null;

      if (this.openModalId !== null) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },

    isModalOpen(rentId: number) {
      return this.openModalId === rentId;
    },

    async handleReviewSubmit(rent: IVehicleRentType, data: { rate: number; comment: string }) {
      try {
        await vehiclesApi.submitReview({
          rating: rent.vehicle.rating.id,
          rate: data.rate,
          comment: data.comment,
          subReferenceId: rent.id,
        });

        showSuccessToast('Thanks for the feedback! It will be published soon');
      } catch (error) {
        showErrors(error as IErrorType);
        throw new Error(error);
      }
    },

    async checkForReviewModal() {
      const vehicleRent = this.$route.query.vehicleRent;
      const createReview = this.$route.query.createReview;

      if (vehicleRent && createReview === '1') {
        try {
          const rent = await vehiclesApi.getRentById(Number(vehicleRent));
          this.currentRentId = rent.id;
          this.currentRent = rent;
          this.isReviewModalOpened = true;
        } catch (error) {
          showErrors(error as IErrorType);
        }
      }
    },
  },
});
</script>
