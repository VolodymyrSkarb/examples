/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { userApi } from '../services/api/UserApi';
import { DEFAULT_PROFILE_IMAGE, SLIDER_REVIEW_BREAKPOINTS } from '../constants/constants';
import './sentry';

let currentPage = 1;
const reviewsPerPage = 12;
let isLoading = false;
let totalCount = 0;

const formattedDate = (reviewDate) => {
  const date = new Date(reviewDate);

  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
};

const createReviewSlide = (review) => {
  const reviewSlide = document.createElement('div');
  reviewSlide.className = 'swiper-slide review-card';
  reviewSlide.innerHTML = `
    <div class="review-header">
      <div class="avatar">
        <img src="${review.author.profileImage?.uri || DEFAULT_PROFILE_IMAGE}" alt="Profile Image" class="avatar" />
      </div>
      <div>
        <h3 class="name">${review.author.firstName} ${review.author.lastName}</h3>
        <div class="stars" data-rating="${review.rate}"></div>
      </div>
    </div>
    <p class="review-text">
      ${review.comment}
    </p>
    <div class="published-date">Published - ${formattedDate(review.createdAt)}</div>
    `;

  return reviewSlide;
};

document.addEventListener('DOMContentLoaded', () => {
  const reviewList = document.getElementById('review-list');

  if (!reviewList) {
    return;
  }

  const loadStars = () => {
    const ratingStars = document.querySelectorAll('.stars');

    if (ratingStars.length > 0) {
      ratingStars.forEach(starContainer => {
        const rating = parseInt(starContainer.getAttribute('data-rating'));
        const filledStars = '★'.repeat(rating);

        starContainer.textContent = filledStars;
      });
    }
  };

  const loadReviews = async () => {
    if (isLoading) return;
    isLoading = true;

    try {
      const response = await userApi.fetchReviews(currentPage, reviewsPerPage);
      totalCount = response.totalCount;
      const items = response.items;

      items.forEach(review => {
        const reviewSlide = createReviewSlide(review);
        reviewList.appendChild(reviewSlide);

        reviewSlide.addEventListener('click', () => {
          openModal(reviewSlide.innerHTML);
        });
      });

      currentPage++;
      isLoading = false;
      swiper.update();
    } catch (error) {
      isLoading = false;
      throw new Error('Failed to load reviews:', error);
    }

    loadStars();
  };

  const swiper = new Swiper('.swiper-container', {
    modules: [Navigation],
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: SLIDER_REVIEW_BREAKPOINTS,
    on: {
      reachEnd: () => {
        const currentSlideCount = document.querySelectorAll('.swiper-slide').length;
        if (currentSlideCount < totalCount) {
          loadReviews();
        }
      },
    },
  });

  loadReviews();

  const openModal = (content) => {
    const modalContent = document.getElementById('reviewModalContent');
    modalContent.innerHTML = content;
    // eslint-disable-next-line no-undef
    const reviewModal = new bootstrap.Modal(document.getElementById('homepageReviewModal'));
    reviewModal.show();

    document.getElementById('reviewModalContent').removeAttribute('inert');
  };
});
