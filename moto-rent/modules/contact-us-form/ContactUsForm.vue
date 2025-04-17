<template>
  <div class="container">
    <div class="row justify-content-between align-items-center">
      <div class="col-12 col-lg-5 mb-4">
        <div class="contact-info">
          <h2 class="h2">Contact Us</h2>
          <p class="desc">You can reach us through the contact form below, or connect with us via email or phone.</p>
          <div class="d-flex align-items-center mb-3">
            <svg class="icon">
              <use xlink:href="#call"></use>
            </svg>
            <p class="ms-3 mb-0">Phone: +111111111</p>
          </div>
          <div class="d-flex align-items-center mb-3">
            <svg class="icon">
              <use xlink:href="#sms"></use>
            </svg>
            <p class="ms-3 mb-0">Email: example@gmail.com</p>
          </div>
          <div class="d-flex align-items-center mb-3">
            <svg class="icon">
              <use xlink:href="#location"></use>
            </svg>
            <p class="ms-3 mb-0">Address: Los Angeles</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-5 col-xl-4">
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="submitForm" ref="contactForm">
            <input type="email" class="form-control mb-3" v-model="email" placeholder="Your E-mail" required>
            <input type="text" class="form-control mb-3" v-model="fullName" placeholder="Your Full Name" minlength="2"
                   maxlength="255" required @input="textValidation">
            <textarea v-model="comment" class="form-control mb-3" placeholder="Your comments" maxlength="1000" rows="1"
                      required @input="textValidation"></textarea>
            <button class="btn btn-outline-secondary w-100 justify-content-center mt-3" type="submit">Submit now</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { IFormDataType } from '@/modules/contact-us-form/constants';
import { showSuccessToast } from '@/components/Notifications';
import { formApi } from '@/modules/contact-us-form/services/FormApi';
import { showErrors } from '@/services/api/showApiErrors';
import { IErrorType } from '@/constants/constants';

const email = ref<string>('');
const fullName = ref<string>('');
const comment = ref<string>('');
const contactForm = ref<HTMLFormElement | null>(null);

const submitForm = async (): Promise<void> => {
  if (contactForm.value?.checkValidity()) {
    const formData: IFormDataType = {
      email: email.value,
      fullName: fullName.value,
      comment: comment.value,
    };

    await formApi.submitForm(formData).then(() => {
      showSuccessToast('Form submitted successfully');
      email.value = '';
      fullName.value = '';
      comment.value = '';
    })
      .catch((errors: IErrorType) => {
        showErrors(errors);
      });
  }
};

const textValidation = (event: Event):void => {
  const target = event.currentTarget as HTMLInputElement;

  if (target.value.trim().length === 0) {
    target.setCustomValidity('Please enter valid information');
  } else {
    target.setCustomValidity('');
  }
};

</script>

<style lang="styl" scoped>

</style>
