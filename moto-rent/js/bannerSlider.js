import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line no-new
  new Swiper('.swiper-banner', {
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
  });
});
