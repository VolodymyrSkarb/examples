<template>
    <section v-if="reviews.length > 0" class="section_reviews">
      <div class="container">
        <h2 class="reviews-title">What Our Riders Say</h2>
        <Swiper
        :modules="modules"
        :space-between="30"
        :breakpoints="swiperBreakpoints"
        navigation
        @reachEnd="handleReachEnd"
      >
        <SwiperSlide
          v-for="(review, index) in reviews"
          :key="index" class="review-card"
          @click="openModal(getReviewContent(review))"
          >
          <div class="review-header">
            <div class="avatar">
              <img :src="review.author.profileImage?.uri || DEFAULT_PROFILE_IMAGE" alt="Profile Image" class="avatar" />
            </div>
            <div>
              <h3 class="name">{{ review.author.firstName }} {{ review.author.lastName }}</h3>
              <div class="stars" :data-rating="review.rate">{{ '★'.repeat(review.rate) }}</div>
            </div>
          </div>
          <p class="review-text">
            {{ review.comment }}
          </p>
          <div class="published-date">Published - {{ formattedDate(review.createdAt) }}</div>
        </SwiperSlide>
      </Swiper>
    </div>

    <SimpleModal v-if="isOpen" @click="closeModal">
      <template #content>
        <div v-html="modalContent"></div>
      </template>
    </SimpleModal>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import SimpleModal from '@/components/SimpleModal.vue';
import { DEFAULT_PROFILE_IMAGE, SLIDER_REVIEW_BREAKPOINTS } from '@/constants/constants';
import { IReview } from '../constants';

export default defineComponent({
  name: 'ReviewsRent',

  components: {
    Swiper,
    SwiperSlide,
    SimpleModal,
  },

  props: {
    idRent: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  data() {
    return {
      totalCount: 0,
      ratings: [5, 4, 3, 2, 1],
      currentPage: 1,
      reviewsPerPage: 12,
      isLoading: false,
      reviews: [] as IReview[],
      modules: [Navigation],
      isOpen: false,
      modalContent: '',
      DEFAULT_PROFILE_IMAGE,
      swiperBreakpoints: SLIDER_REVIEW_BREAKPOINTS,
    };
  },

  mounted() {
    this.loadReviews();

    const ratingStars = document.querySelectorAll('.stars');
    if (ratingStars.length > 0) {
      ratingStars.forEach(starContainer => {
        const rating = parseInt(starContainer.getAttribute('data-rating') || '0');
        const filledStars = '★'.repeat(rating);
        starContainer.textContent = filledStars;
      });
    }
  },

  methods: {
    formattedDate(reviewDate: string): string {
      const date = new Date(reviewDate);
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
    },

    async loadReviews(ratingType: string = 'vehicle'): Promise<void> {
      if (this.isLoading) return;

      this.isLoading = true;

      try {
        const data = await vehiclesApi.getReviews(this.currentPage, this.reviewsPerPage, ratingType, this.idRent);

        this.totalCount = data.totalCount;
        this.reviews = [...this.reviews, ...data.items];
        this.currentPage++;
        this.isLoading = false;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load reviews:', error);
        this.isLoading = false;
      }
    },

    handleReachEnd() {
      const currentSlideCount = document.querySelectorAll('.swiper-slide').length;
      if (currentSlideCount < this.totalCount) {
        this.loadReviews();
      }
    },

    getReviewContent(review: IReview) {
      return `
        <div class="review-card">
          <div class="review-header">
            <div class="avatar">
              <img src="${review.author.profileImage?.uri || DEFAULT_PROFILE_IMAGE}" alt="Profile Image" class="avatar" />
            </div>
            <div>
              <h3 class="name">${review.author.firstName} ${review.author.lastName}</h3>
              <div class="stars" data-rating="${review.rate}">${'★'.repeat(review.rate)}</div>
            </div>
          </div>
          <p class="review-text">
            ${review.comment}
          </p>
          <div class="published-date">Published - ${this.formattedDate(review.createdAt)}</div>
        </div>
      `;
    },

    openModal(content: string) {
      this.modalContent = content;
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },
  },
});
</script>

<style scoped>
@import '@/styles/components/swiper.styl';

.section_reviews .swiper {
  position: unset!important;
}
</style>
