import heic2any from 'heic2any';
import { showErrorToast } from '@/components/Notifications';

const MINUTE = 60000;

const isHeicTypeFormat = (file: File): boolean => {
  const extFromName = file.name ? file.name.split('.').pop()?.toLowerCase() : '';

  return file.type === 'image/heic' || file.type === 'image/heif' || (file.type === '' && (extFromName === 'heic' || extFromName === 'heif'));
};

const getBlobFromHeic = async (file: File): Promise<Blob> => {
  const blobs = await heic2any({ blob: file, toType: 'image/jpeg' });
  return Array.isArray(blobs) ? blobs[0] : blobs;
};

const optimizeImage = (dataUrl: string, fileType: string, fileName: string): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = dataUrl;

    img.onload = ():void => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context is not supported');
      }

      const scaleFactor = 0.7;
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const optimizedFile = new File([blob], `${fileName}.jpg`, { type: fileType });
            resolve(optimizedFile);
          } else {
            throw new Error('Blob creation failed');
          }
        },
        fileType,
        0.7,
      );
    };

    img.onerror = ():void => {
      throw new Error('Failed to load the image');
    };
  });
};

export const convertBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = async (): Promise<void> => {
      if (isHeicTypeFormat(file)) {
        try {
          const convertedBlob = await getBlobFromHeic(file);
          const convertedReader = new FileReader();
          convertedReader.onloadend = (): void => {
            resolve(convertedReader.result as string);
          };
          convertedReader.readAsDataURL(convertedBlob as Blob);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(reader.result as string);
      }
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

export const convertAndOptimizeBase64 = async (file: File): Promise<string> => {
  try {
    const base64 = await convertBase64(file);

    if (file.type.startsWith('image/')) {
      const optimizedFile = await optimizeImage(base64, file.type, file.name);
      return convertBase64(optimizedFile);
    }

    return base64;
  } catch (error) {
    throw new Error(`Failed to convert and optimize file: ${error}`);
  }
};

export const validateAndConvertImage = async (file: File | undefined): Promise<string | ArrayBuffer | null> => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!await isValidImage(file)) {
    throw new Error('Invalid image file');
  }

  return await convertAndOptimizeBase64(file);
};

const checkImageWidth = async (file: File): Promise<boolean> => {
  const imageElement = new Image();

  if (isHeicTypeFormat(file)) {
    const blobs = await getBlobFromHeic(file);
    const blob = Array.isArray(blobs) ? blobs[0] : blobs;
    imageElement.src = URL.createObjectURL(blob);
  } else {
    imageElement.src = URL.createObjectURL(file);
  }

  await imageElement.decode();

  if (imageElement.width >= 768) {
    return true;
  } else {
    showErrorToast('Image width must be at least 768px.');
    return false;
  }
};

const checkImageSize = (file: File): boolean => {
  if (file.size > 10 * 1024 * 1024) {
    showErrorToast('Please select a valid image file under 10MB.');
    return false;
  }
  return true;
};

const checkImageType = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
  let isHeicFileType = false;
  if (!file.type) {
    isHeicFileType = isHeicTypeFormat(file);
  }

  if (!validTypes.includes(file.type) && !isHeicFileType) {
    showErrorToast('Please select a valid image file (webp, jpeg, png, heic, heif).');
    return false;
  }

  return true;
};

export const isValidImage = async (file: File): Promise<boolean> => {
  return !(!checkImageSize(file) || !checkImageType(file) || !await checkImageWidth(file));
};

export const base64ToBinary = (base64: string): Uint8Array => {
  const binaryString = atob(base64.split(',')[1]);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};

export const convertToLocalTime = (dateIso: Date | string): Date => {
  const date = new Date(dateIso);
  const userTimezoneOffset = date.getTimezoneOffset() * MINUTE;
  return new Date(date.getTime() - userTimezoneOffset);
};
