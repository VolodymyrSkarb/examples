import { IVehicleType } from '@/modules/list-of-vehicles/constants';
import { IAddressType, PaymentStatuses } from '@/modules/my-account/constants';

export interface IVehicleRentFormDataType {
  vehicleId: number;
  pickUpDate: string;
  dropOfDate: string;
  pickUpAddress: string;
  dropOffAddress: string;
}

export interface IVehicleRentModelType {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pickUpAddress: string;
  dropOffAddress: string;
}

export interface IVehicleRentErrorsType {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  pickUpAddress: string;
  dropOffAddress: string;
  unavailableEndDate: string;
}

export interface IUserType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IRefundType {
  amount: number;
  stripeStatus: string | null;
  stripeFailureReason: string | null;
}

export interface IVehicleRentType {
  id: number;
  user: IUserType;
  vehicle: IVehicleType;
  pickUpDate: string,
  dropOfDate: string
  pickUpAddress: IAddressType;
  dropOffAddress: IAddressType;
  paymentStatus: PaymentStatuses;
  makeReviewBlocker: string | null;
  totalRentDays: number;
  totalRentPrice: number;
  refund: IRefundType | null;
}

export interface IPriceType {
  totalRentDays: number,
  rentPrice: number,
  rentPricePerDay: number,
}

export interface IProfileImage {
  createdAt: string;
  uuid: string;
  mimeType: string;
  type: string;
  ownerId: number;
  extension: string;
  uri: string;
}

export interface Author {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: IProfileImage;
}

export interface IReview {
  id: number;
  author: Author;
  rate: number;
  comment: string;
  createdAt: string;
}

export interface IReviewsResponse {
  items: IReview[];
  currentPageNumber: number;
  numItemsPerPage: number;
  totalCount: number;
}
