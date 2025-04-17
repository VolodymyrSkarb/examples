import { IResponseUploadImageType } from '@/modules/my-account/constants';

export {}
declare global {
  interface Window {
    isAuthenticated: boolean;
    userInfo: {
      vehicleOwner: {
        verificationStatus: string;
      },
      customer: {
        verificationStatus: string;
      },
      user: {
        firstName: string;
        lastName: string;
        email: string;
        profileImage: IResponseUploadImageType;
      }
    },
    googleMapsApiKey: string;
  }
}
