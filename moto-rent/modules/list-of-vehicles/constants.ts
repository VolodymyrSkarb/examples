import {
  IAddressType,
  ImageBagUuidsType,
  IResponseVehicleImagesType,
} from '@/modules/my-account/constants';

export interface IPrice {
  daysRange: string;
  price: number;
}

export interface IUnavailableDatesType {
  startDate: Date;
  endDate: Date;
}

interface IRatingVehicle {
  id: number,
  approvedReviewsCount: number,
  averageRating: number,
  referenceType: string
}

export interface ICommonVehicleType {
  year: number;
  make: string;
  model: string;
  seatHeight: number;
  weight: number;
  engine: number;
  vinNumber: string;
  description: string;
  oneThreeDaysPrice: number;
  fourSevenDaysPrice: number;
  eightFourteenDaysPrice: number;
  fifteenThirtyDaysPrice: number;
  monthOrMoreDaysPrice: number;
  socialLink: string | null;
  addresses: IAddressType[];
  unavailableDates: IUnavailableDatesType[];
  dailyMileageLimit: number;
  overageFeePerExtraMile: number;
}

export interface IVehicleType extends ICommonVehicleType {
  id: number;
  images: IResponseVehicleImagesType[];
  status: string;
  rating: IRatingVehicle;
}

export type ModelKey = 'seatHeight' | 'weight' | 'engine' | 'oneThreeDaysPrice' | 'monthOrMoreDaysPrice' | 'fifteenThirtyDaysPrice' | 'eightFourteenDaysPrice' | 'fourSevenDaysPrice';

export interface IVehiclesResponseType {
  items: IVehicleType[];
  currentPageNumber: number;
  numItemsPerPage: number;
  totalCount: number;
}

export interface IVehiclePropType {
  vehicle: IVehicleType;
}

export interface IFilterPropType {
  filter: string;
  isSelected: boolean;
}

export interface IFiltersPropType {
  filters: string[];
  multiple: boolean;
}

export interface IVehicleRequestType extends ICommonVehicleType {
  imageBagUuids: ImageBagUuidsType[];
}

interface Motorcycle {
  make: string;
  model: string;
  year: number;
}

export interface IVehicleModels {
  currentPageNumber: number;
  numItemsPerPage: number;
  items: Motorcycle[];
  totalCount: number;
}

export enum StatusQueryParams {
  Draft = 'draft',
  Published = 'published',
}

export interface IVehicleQueryParamsType {
  userId?: number;
  status?: StatusQueryParams;
  page?: number;
  perPage?: number;
  makes?: string[];
}
