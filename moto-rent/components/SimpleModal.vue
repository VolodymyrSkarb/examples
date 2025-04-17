<template>
  <div v-if="isOpen" class="modal fade show" @click="toggleModal">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-simple">
      <div class="modal-content" ref="target">
        <div class="modal-body">
          <slot name="content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

const isOpen = ref(false);

const toggleModal = ():void => {
  isOpen.value = !isOpen.value;
};

const handleBodyClick = ():void => {
  toggleModal();
};

watchEffect(() => {
  if (isOpen.value) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});

onMounted(() => {
  document.body.addEventListener('click', handleBodyClick);
});

onUnmounted(() => {
  document.body.removeEventListener('click', handleBodyClick);
});
</script>

<style scoped>
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin: 1.75rem auto;
}
</style>
