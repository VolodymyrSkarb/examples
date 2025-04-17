import { IVehicleRentType } from '@/modules/vehicle-rent/constants';

export interface ICanvasType {
 canvas: HTMLCanvasElement;
}

export enum ImagesTypes {
  VehicleImages = 'vehicle_images',
  UserProfileImages = 'user_profile_images',
  CroppedVehicleImages = 'cropped_vehicle_images',
}

export interface IUploadImageType {
  file: string;
  type: ImagesTypes;
}

export interface IResponseUploadImageType {
  uuid: string;
  mimeType: string;
  type: ImagesTypes;
  ownerId: number;
  extension: string;
  uri: string;
}

export interface IResponseVehicleImagesType {
  originalImage: IResponseUploadImageType;
  croppedImage: IResponseUploadImageType;
}

export interface IValidationVehicleErrors {
  year: string,
  make: string,
  model: string,
  seatHeight: string,
  weight: string,
  engine: string,
  vinNumber: string,
  description: string,
  oneThreeDaysPrice: string,
  fourSevenDaysPrice: string,
  eightFourteenDaysPrice: string,
  fifteenThirtyDaysPrice: string,
  monthOrMoreDaysPrice: string,
  socialLink: string | null,
  addresses: string;
  unavailableDates: string,
  dailyMileageLimit: string,
  overageFeePerExtraMile: string,
  imageBagUuids: string;
}

export interface ImageBagUuidsType {
  originalImageUuid: string;
  croppedImageUuid: string;
}

export interface IDateRangeType {
  startDate: Date,
  endDate: Date,
}

export interface IDateRangeIsoType {
  startDate: string,
  endDate: string,
}

export interface FormattedPlace {
  subpremise?: string;
  street_number?: string;
  route?: string;
  locality?: string;
  sublocality?: string;
  administrative_area_level_1?: string;
  administrative_area_level_2?: string;
  country?: string;
  postal_code?: string;
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
  [key: string]: string | number | undefined;
}

export interface AddressComponents {
  [key: string]: 'short_name' | 'long_name';
}

export interface ICoordinatesType {
  latitude?: number;
  longitude?: number;
}

export interface IAddressType {
  id?: number;
  state?: string;
  city?: string;
  streetName?: string;
  streetNumber?: string;
  country?: string;
  zipCode?: string;
  formattedAddress?: string;
  coordinates?: ICoordinatesType;
}

export enum VerifyCustomerStatuses {
  NEW = 'new',
  PROCESSING = 'processing',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  VERIFIED = 'verified',
  NOT_VERIFIED = 'not verified',
}

export enum VerifyOwnerStatuses {
  VERIFIED = 'verified',
  UNVERIFIED = 'unverified',
}

export interface IVerificationResponseType {
  url: string;
}

export enum PaymentStatuses {
  NEW = 'new',
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUND = 'refund',
}

export interface IMyVehiclesRentsQueryParamsType {
  paymentStatus?: PaymentStatuses;
  page?: number;
  perPage?: number;
}

export interface IMyVehiclesRentsResponseType {
  items: IVehicleRentType[];
  currentPageNumber: number;
  numItemsPerPage: number;
  totalCount: number;
}

export enum MyAccountTabs {
  VEHICLES = 'vehicles',
  MY_RENTS = 'my-rents',
  CLIENTS_RENTS = 'clientsRents',
  FAVORITES = 'favorites',
}

export interface IUserUpdateType {
  firstName: string;
  lastName: string;
}

export enum UserUpdateFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
}
export type ApiCallType<T> = () => Promise<T>
