<template>
  <section class="section_authorization">
    <div class="container-fluid">
      <div class="row justify-content-end">
        <div class="col-12 col-lg-6 justify-content-center d-flex">
          <div class="content">
            <form @submit.prevent="handleSubmit">
              <h2 class="h2 text-center">Sign Up</h2>
              <div class="mb-4">
                <label class="form-label" for="email" >First Name:</label>
                <input
                  :class="['form-control', { 'is-invalid': modelErrors.firstName }]"
                  type="text"
                  v-model="firstName"
                  required>
                <div class="form-error invalid-feedback ">{{ modelErrors.firstName }}</div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="email" >Last Name:</label>
                <input
                  :class="['form-control', { 'is-invalid': modelErrors.lastName }]"
                  type="text"
                  v-model="lastName"
                  required>
                <div class="form-error invalid-feedback ">{{ modelErrors.lastName }}</div>
              </div>
              <div class="mb-4">
                <label class="form-label" for="email" >Email:</label>
                <input
                  :class="['form-control', { 'is-invalid': modelErrors.email }]"
                  type="text"
                  v-model="email"
                  required>
                <div class="form-error invalid-feedback ">{{ modelErrors.email }}</div>
              </div>
              <div class="form-pass">
                <label class="form-label" for="password">Password:</label>
                <input
                  :class="['form-control',{ 'is-invalid': modelErrors.password }]"
                  :type="passwordFieldType"
                  v-model="password"
                  minlength='8'
                  required>
                <div class="form-error invalid-feedback ">{{ modelErrors.password }}</div>
                <span :class="['show-pass', { 'is-invalid': modelErrors.password }]" @click="togglePasswordVisibility">
                  <svg class="icon">
                    <use :xlink:href="`#${iconName}`"></use>
                  </svg>
                </span>
              </div>
              <div class="mb-4 mt-4 d-flex flex-column align-items-center">
                <span>Already have an account?</span>
                <a class="link" href="/login">Sign in</a>
              </div>

              <div class="row justify-content-center">
                <div class="col-12 col-lg-10">
                  <button class="btn btn-primary w-100 justify-content-center" type="submit">Sign up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <modal-window
      :isOpen="isModalOpened"
      @modal-close="redirectToHomePage"
    >
      <template #header>
        <div>
          <h5>Registration Successful!</h5>
        </div>
      </template>
      <template #content>
        <div class="text-center">
          <h5 class="mb-3">Thank you for registering.</h5>
          <h6>To complete your registration, please check your email and confirm your email address by clicking the verification link we sent you.</h6>
        </div>
      </template>
      <template #footer>
        <div>
          <button class="btn btn-primary" @click.stop="redirectToHomePage">OK</button>
        </div>
      </template>
    </modal-window>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { showErrors } from '@/services/api/showApiErrors';
import { IErrorType } from '@/constants/constants';
import validateSignUpForm from '@/modules/sign-up-form/constants/formValidationSchema';
import { isEmpty } from 'lodash';
import ModalWindow from '@/components/ModalWindow.vue';
import { userApi } from '@/services/api/UserApi';
import { showSuccessToast } from '@/components/Notifications';
import { ISignUpType } from '@/modules/sign-up-form/constants/constants';

const defaultErrors: ISignUpType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const ICON_PASS_SHOWN = 'eye-close';
const ICON_PASS_HIDDEN = 'eye';
const FIELD_TYPE_PASS = 'password';
const FIELD_TYPE_TEXT = 'text';

export default defineComponent({
  name: 'SignUpForm',
  components: {
    ModalWindow,
  },

  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordFieldType = ref('password');
    const iconName = ref('eye');
    const modelErrors = ref<ISignUpType>({ ...defaultErrors });
    const isModalOpened = ref(false);

    const togglePasswordVisibility = (): void => {
      if (passwordFieldType.value === FIELD_TYPE_PASS) {
        passwordFieldType.value = FIELD_TYPE_TEXT;
        iconName.value = ICON_PASS_SHOWN;
      } else {
        passwordFieldType.value = FIELD_TYPE_PASS;
        iconName.value = ICON_PASS_HIDDEN;
      }
    };

    const validateModelData = (): boolean => {
      const errors = validateSignUpForm({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      });
      modelErrors.value = { ...defaultErrors };

      if (!isEmpty(errors)) {
        modelErrors.value = { ...modelErrors.value, ...errors };

        return false;
      }

      return true;
    };

    const handleSubmit = async (): Promise<void> => {
      if (!validateModelData()) {
        return;
      }

      try {
        await userApi.signUp({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        });
        showSuccessToast('Login successful');
        isModalOpened.value = true;
      } catch (errors) {
        // eslint-disable-next-line no-console
        console.error(errors);
        showErrors(errors as IErrorType);
      }
    };

    const redirectToHomePage = (): void => {
      window.location.href = '/';
    };

    return {
      firstName,
      lastName,
      email,
      password,
      passwordFieldType,
      iconName,
      modelErrors,
      isModalOpened,
      togglePasswordVisibility,
      handleSubmit,
      redirectToHomePage,
    };
  },
});
</script>
