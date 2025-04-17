<template>
  <textarea
    class="is-invalid"
    :id="TINYMCE_ID"
    v-model="content"
  />
  <div class="form-error invalid-feedback ">{{ error }}</div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref, onUnmounted } from 'vue';
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/paste';

const TINYMCE_ID = 'tinyMCE';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const content = ref(props.modelValue);

watch(() => props.modelValue, newVal => {
  content.value = newVal;
  tinymce.activeEditor.setContent(newVal);
});

onMounted(() => {
  prepareTinymce();
});

onUnmounted(() => {
  if (tinymce.get(TINYMCE_ID)) {
    tinymce.get(TINYMCE_ID).remove();
  }
});

const prepareTinymce = (): void => {
  tinymce.init({
    base_url: '/assets/tinymce/',
    selector: '#tinyMCE',
    plugins: 'lists paste',
    menubar: false,
    toolbar: 'bold italic underline bullist numlist capitalize',
    paste_enable_default_filters: false,
    valid_elements: 'div,p,ul,ol,li,strong,em,b,i',
    extended_valid_elements: '',
    paste_webkit_styles: 'none',
    paste_retain_style_properties: '',
    content_style: 'body { font-family: "Plus Jakarta Sans"; }',
    setup: (editor) => {
      editor.ui.registry.addIcon('cap-ic', '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.5 9.99992H5.83333M5.83333 9.99992H9.16667M5.83333 9.99992V16.6666M7.5 3.33325H12.5M12.5 3.33325H17.5M12.5 3.33325V16.6666" stroke="#222f3e" stroke-width="2" stroke-linecap="round"/></svg>');

      editor.ui.registry.addButton('capitalize', {
        icon: 'cap-ic',
        tooltip: 'Capitalize Text',
        onAction: function () {
          const selectedText = editor.selection.getContent({ format: 'text' });
          editor.selection.setContent(selectedText.toUpperCase());
        },
      });
      editor.on('init', () => {
        editor.setContent(props.modelValue);
      });
      editor.on('change', () => {
        emit('update:modelValue', editor.getContent());
      });
    },
  });
};
</script>
