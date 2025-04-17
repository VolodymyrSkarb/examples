<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mt-3">
    <ul class="pagination">
      <li :class="['page-item', { disabled: currentPage === 1 }]">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
          <svg class="icon">
            <use xlink:href="#chevron-double-left"></use>
          </svg>
        </a>
      </li>
      <li v-for="(pageNumber, index) in paginationRange" :key="index" :class="['page-item', { active: pageNumber === currentPage, disabled: pageNumber === DOTS }]">
        <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li :class="['page-item', { disabled: currentPage === totalPages }]">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
          <svg class="icon">
            <use xlink:href="#chevron-double-right"></use>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const DOTS = '...';
const SHOWING_BUTTONS = 6;
const FIRST_PAGE_INDEX = 1;
const SIBLING_COUNT = 1;
const BUTTONS_WITHOUT_DOTS = 5;

export default defineComponent({
  name: 'PaginationNav',

  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['pageChanged'],

  setup() {
    return {
      DOTS,
      SHOWING_BUTTONS,
      SIBLING_COUNT,
      FIRST_PAGE_INDEX,
      BUTTONS_WITHOUT_DOTS,
    };
  },

  computed: {
    totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    paginationRange(): (number | string)[] {
      if (this.SHOWING_BUTTONS >= this.totalPages) {
        return this.range(1, this.totalPages);
      }

      const leftSiblingIndex = Math.max(this.currentPage - this.SIBLING_COUNT, 1);
      const rightSiblingIndex = Math.min(this.currentPage + this.SIBLING_COUNT, this.totalPages);

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < this.totalPages - 2;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = BUTTONS_WITHOUT_DOTS * this.SIBLING_COUNT;
        const leftRange = this.range(1, leftItemCount);

        return [...leftRange, this.DOTS, this.totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = BUTTONS_WITHOUT_DOTS * this.SIBLING_COUNT;
        const rightRange = this.range(this.totalPages - rightItemCount + 1, this.totalPages);

        return [this.FIRST_PAGE_INDEX, this.DOTS, ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);

        return [this.FIRST_PAGE_INDEX, this.DOTS, ...middleRange, this.DOTS, this.totalPages];
      }

      return [];
    },
  },

  methods: {
    range(start: number, end: number): number[] {
      const length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    },

    changePage(page: number): void {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return;

      const section = document.querySelector('.section_account-listings');
      if (section) {
        const distanceToTop = section.getBoundingClientRect().top + window.scrollY;

        window.scroll({ top: distanceToTop - 100, left: 0, behavior: 'smooth' });
      }

      this.$emit('pageChanged', page);
    },
  },
});
</script>
