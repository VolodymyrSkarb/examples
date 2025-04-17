<template>
  <div :class="['modal fade ', { 'show': isOpen }]">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content" ref="target">
        <div :class="['modal-header', headerClass]">
          <slot name="header"/>
          <button class="btn btn-link" @click.stop="emit('modal-close')">
            <svg class="icon">
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <slot name="content"/>
        </div>
        <div class="modal-footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineEmits,
  ref,
  useSlots,
  onMounted,
} from 'vue';

defineProps({ isOpen: Boolean });
const emit = defineEmits(['modal-close', 'submit']);

const target = ref(null);
const slots = useSlots();
const headerClass = ref('');

onMounted(() => {
  headerClass.value = slots.header ? 'justify-content-between' : 'justify-content-end';
});
</script>

<style lang='styl' scoped>
.modal {
  display: block;
  visibility: hidden;
  &.fade {
    background-color: rgba(0,0,0,0.4);
  }
  &.show {
    visibility: visible;
  }

  .modal-header {
    justify-content: flex-end;
  }
}

</style>
