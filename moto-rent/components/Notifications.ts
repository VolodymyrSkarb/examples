import { toast } from 'vue3-toastify';

export const showSuccessToast = (message: string): void => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const showErrorToast = (message: string): void => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const showInfoToast = (message: string): void => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};
