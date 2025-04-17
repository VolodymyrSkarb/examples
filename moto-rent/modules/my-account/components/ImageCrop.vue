<template>
  <div v-if="isUploadAvatar" :class="['profile-avatar',{ 'empty-avatar': !this.images[0] }]">
    <img :src="imagesUri[0]" alt="Profile Picture">
    <button class="btn btn-link" @click="openFileDialog">
      <svg class="icon">
        <use xlink:href="#camera"></use>
      </svg>
    </button>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileChange"
      accept="image/webp, image/jpeg, image/png"
      style="display: none"
    />
  </div>
  <div v-if="!isUploadAvatar" :class="['upload-picture-box',{ 'is-invalid': error }]">
    <div
      :class="['drop', { 'highlight': isDragging, 'disabled': !isAllowedToUpload }]"
      @dragenter="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="openFileDialog"
    >
      <div class="upload-icon">
        <svg class="icon">
          <use xlink:href="#plus"></use>
        </svg>
      </div>

      <p class="title">Drop your Files Here</p>
      <p class="subtitle"><b>Browse Files</b> from your Computer</p>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept="image/webp, image/jpeg, image/png"
        style="display: none"
      />
      <Loader v-if="isLoading" />
    </div>

    <template v-if="imagesUri">
      <div v-for="(image, index) in imagesUri" :key="image" class="picture">
        <img :src="image" alt="vehicle" />
        <svg class="icon" @click="removeImage(index)">
          <use xlink:href="#close"></use>
        </svg>
      </div>
    </template>
  </div>
  <modal-window
    :isOpen="isModalOpened"
    @modal-close="closeModal"
  >
    <template #content>
      <Cropper
        :src="imageSrc"
        :stencil-component="stencilProps.component"
        :stencil-props="stencilProps"
        @change="onChange"
        @ready="ready"
      />
    </template>
    <template #footer>
      <div>
        <button class="btn btn-primary image-crop-btn" type="button" :disabled="isUploading" @click.stop="okButtonHandler">
          <span v-if="isUploading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span v-else>OK</span>
        </button>
      </div>
    </template>
  </modal-window>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import ModalWindow from '@/components/ModalWindow.vue';
import Loader from '@/components/LoaderComp.vue';
import {
  ICanvasType,
  IResponseUploadImageType,
  ImagesTypes,
  IResponseVehicleImagesType, ImageBagUuidsType,
} from '@/modules/my-account/constants';
import { base64ToBinary, validateAndConvertImage } from '@/modules/my-account/utils';
import { fileApi } from '@/services/api/FileApi';
import { DEFAULT_PROFILE_IMAGE } from '@/constants/constants';

export default defineComponent({
  name: 'ImageCrop',

  props: {
    error: {
      type: String,
      default: '',
    },
    images: {
      type: Array as () => (IResponseUploadImageType[] | IResponseVehicleImagesType[]),
      default: () => [],
    },
    isUploadAvatar: {
      type: Boolean,
      default: false,
    },
    stencilProps: {
      type: Object,
      default: () => ({
        aspectRatio: 16 / 9,
      }),
    },
  },

  components: {
    ModalWindow,
    Cropper,
    Loader,
  },

  emits: ['imagesUuids'],

  setup(props, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null);
    const fileType = ref('');
    const imageSrc = ref('');
    const croppedImageSrc = ref('');
    const originalImageUuid = ref('');
    const imagesUri = ref<string[]>([]);
    const imagesUuids = ref<string[]>([]);
    const vehicleImagesUuids = ref<ImageBagUuidsType[]>([]);
    const isModalOpened = ref(false);
    const isDragging = ref(false);
    const isLoading = ref(false);
    const isUploading = ref(false);

    return {
      fileInput,
      imageSrc,
      croppedImageSrc,
      imagesUri,
      isModalOpened,
      isDragging,
      fileType,
      imagesUuids,
      emit,
      isLoading,
      isUploading,
      originalImageUuid,
      vehicleImagesUuids,
    };
  },

  computed: {
    isAllowedToUpload(): boolean {
      return this.imagesUri.length < 10;
    },
  },

  mounted() {
    if (this.isUploadAvatar) {
      if (!this.images[0]) {
        this.imagesUri = [DEFAULT_PROFILE_IMAGE];
      } else {
        this.imagesUri = (this.images as IResponseUploadImageType[]).map((image: IResponseUploadImageType) => image.uri);
        this.imagesUuids = (this.images as IResponseUploadImageType[]).map((image: IResponseUploadImageType) => image.uuid);
      }
    }
  },

  watch: {
    images: {
      handler(value) {
        if (value?.length !== 0) {
          if (!this.isUploadAvatar) {
            this.imagesUri = value.map((image: IResponseVehicleImagesType) => image.croppedImage.uri);
            this.vehicleImagesUuids = value.map((image: IResponseVehicleImagesType) => ({
              croppedImageUuid: image.croppedImage.uuid,
              originalImageUuid: image.originalImage.uuid,
            }));
          } else {
            this.imagesUri = value.map((image: IResponseUploadImageType) => image.uri);
            this.imagesUuids = value.map((image: IResponseUploadImageType) => image.uuid);
          }
        }

        if (this.isUploadAvatar && !value.length) {
          this.imagesUri = [DEFAULT_PROFILE_IMAGE];
        }
      },
      deep: true,
    },
  },

  methods: {
    closeModal(): void {
      this.isModalOpened = false;
      this.resetFileInput();
      this.imageSrc = '';
    },

    onChange({ canvas }: ICanvasType): void {
      if (canvas) {
        this.croppedImageSrc = canvas.toDataURL();
      }
    },

    async handleFileChange(event: Event): Promise<void> {
      this.isLoading = true;
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        try {
          await this.validateAndShowImage(file);
          this.fileType = file.type;

          if (!this.isUploadAvatar) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', ImagesTypes.VehicleImages);
            const fileResponse = await fileApi.uploadFile(formData);
            this.originalImageUuid = fileResponse.uuid;
          }

          this.resetFileInput();
        } catch (error) {
          this.isLoading = false;
        }
      }
    },

    async okButtonHandler(): Promise<void> {
      if (this.croppedImageSrc) {
        this.isUploading = true;
        const binaryData = base64ToBinary(this.croppedImageSrc);
        const blob = new Blob([binaryData], { type: this.fileType });

        const formData = new FormData();
        formData.append('file', blob);

        if (this.isUploadAvatar) {
          formData.append('type', ImagesTypes.UserProfileImages);
          this.imagesUuids = [];
          this.imagesUri = [];
        } else {
          formData.append('type', ImagesTypes.CroppedVehicleImages);
        }

        try {
          const fileResponse = await fileApi.uploadFile(formData);
          this.imagesUri.push(fileResponse.uri);

          if (this.isUploadAvatar) {
            this.imagesUuids.push(fileResponse.uuid);
            this.emit('imagesUuids', this.imagesUuids);
            this.closeModal();

            return;
          }

          this.vehicleImagesUuids.push({ croppedImageUuid: fileResponse.uuid, originalImageUuid: this.originalImageUuid });
          this.emit('imagesUuids', this.vehicleImagesUuids);
        } finally {
          this.isUploading = false;
        }
      }
      this.closeModal();
    },

    openFileDialog(): void {
      this.fileInput?.click();
    },

    async validateAndShowImage(file: File | undefined): Promise<void> {
      try {
        this.imageSrc = await validateAndConvertImage(file) as string;
      } catch (error) {
        this.isLoading = false;
      }
    },

    ready(): void {
      this.isModalOpened = true;
      this.isLoading = false;
    },

    resetFileInput(): void {
      if (this.fileInput) {
        this.fileInput.value = '';
      }
    },

    handleDragEnter(): void {
      this.isDragging = true;
    },

    handleDragOver(event: DragEvent): void {
      event.preventDefault();
    },

    handleDragLeave(): void {
      this.isDragging = false;
    },

    handleDrop(event: DragEvent): void {
      event.preventDefault();
      this.isDragging = false;
      const file = event.dataTransfer?.files[0];
      this.validateAndShowImage(file);
    },

    removeImage(index: number): void {
      this.imagesUri.splice(index, 1);

      const uuids = this.isUploadAvatar ? this.imagesUuids : this.vehicleImagesUuids;

      uuids.splice(index, 1);
      this.emit('imagesUuids', uuids);
    },
  },
});
</script>

<style lang='styl' scoped>
.upload-picture-box {
  grid-gap: 28px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1199px) {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 30%;
    }
  }

  @media (max-width: 768px) {
    & > div {
      width: calc(50% - 14px);
    }
  }

  @media (max-width: 567px) {
    & > div {
      width: 100%;
    }
  }

  & > div {
    border-radius: 10px;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.04);
    min-height: 200px;
  }

  .picture {
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
      height: 100%;
    }

    .icon {
      position: absolute;
      right: 16px;
      top: 16px;
      --color-icon: var(--color-white);
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }

  .drop {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;

    border-radius: 10px;
    border: 1px dashed var(--color-graphite);
    padding: 24px;

    &.highlight {
      background-color: var(--color-grey-light-blue);
      border-color: var(--color-yellow);
    }

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .upload-icon {
      border: 1px dashed var(--color-graphite);
      border-radius: 50%;
      padding: 10px;
      margin-bottom: 16px;
    }

    .title {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.28px;
    }

    .subtitle {
      color: var(--color-graphite);
      font-size: 12px;
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.1px;
    }
  }
}

.image-crop-btn {
  width: 100px;
  justify-content: center;
}
</style>
