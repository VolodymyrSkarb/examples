<template>
  <modal-window :isOpen="isModalOpened" class="review-modal" @modal-close="switchModalState">
    <template #content>
      <div class="modal-content">
        <h2 class="modal-title">Leave a Review</h2>

        <div class="reviews-rating-block">
          <h3>Your Rating</h3>
          <div class="rating">
            <span
              v-for="star in 5"
              :key="star"
              :class="['star', { 'star-filled': star <= rate }]"
              @click="setRating(star)"
            >
              &#9733;
            </span>
          </div>
          <div class="form-error" v-if="modelErrors.rate">{{ modelErrors.rate }}</div>
        </div>

        <div class="reviews-comment-block">
          <h3>Your Review</h3>
          <textarea
            class="review-input"
            v-model="comment"
            placeholder="Share your experience..."
          ></textarea>
          <div class="form-error" v-if="modelErrors.comment">{{ modelErrors.comment }}</div>
        </div>

      </div>
    </template>
    <template #footer>
      <button class="submit-button" @click="submitReview">Submit Review</button>
    </template>
  </modal-window>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalWindow from '@/components/ModalWindow.vue';
import validateReviewForm from '@/modules/my-account/constants/reviewValidationSchema';

export default defineComponent({
  name: 'ReviewModal',

  components: {
    ModalWindow,
  },

  props: {
    isModalOpened: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['modal-close', 'submit-review'],

  setup(_, { emit }) {
    const rate = ref(0);
    const comment = ref('');
    const modelErrors = ref({ rate: '', comment: '' });

    const setRating = (value: number):void => {
      rate.value = value;
    };

    const submitReview = ():void => {
      const errors = validateReviewForm({ rate: rate.value, comment: comment.value });
      modelErrors.value = { ...errors };

      if (Object.values(errors).some(Boolean)) {
        return;
      }

      if (comment.value.trim() && rate.value) {
        emit('submit-review', { rate: rate.value, comment: comment.value });
        resetForm();
        emit('modal-close');
      } else {
        alert('Please provide a rating and a review.');
      }
    };

    const resetForm = ():void => {
      rate.value = 0;
      comment.value = '';
      modelErrors.value = { rate: '', comment: '' };
    };

    const switchModalState = ():void => {
      emit('modal-close');
    };

    return { rate, comment, modelErrors, setRating, submitReview, switchModalState };
  },
});
</script>
