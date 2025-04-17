'use strict';

setTimeout(() => {
  const alertList = document.querySelectorAll('.alert');
  alertList.forEach(alertNode => {
    window.bootstrap.Alert.getOrCreateInstance(alertNode).close();
  });
}, 3000);
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.scroll-to-element');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      if (window.location.pathname === '/') {
        const targetId = link.getAttribute('data-target');
        if (targetId) {
          scrollToElement(targetId);
        }
      } else {
        window.location.href = '/';
        localStorage.setItem('scrollToTarget', link.getAttribute('data-target'));
      }
    });
  });

  const target = localStorage.getItem('scrollToTarget');
  if (target && window.location.pathname === '/') {
    localStorage.removeItem('scrollToTarget');
    scrollToElement(target);
  }
});

const scrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    const offsetDesktop = 120;
    const offsetMobile = 20;
    const offset = window.innerWidth >= 992 ? offsetDesktop : offsetMobile;

    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};
