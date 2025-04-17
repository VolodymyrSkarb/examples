import { ApiService } from '@/services/api/ApiService';
import {
  IVehicleModels,
  IVehicleRequestType,
  IVehicleQueryParamsType,
  IVehicleType,
  IVehiclesResponseType,
} from '@/modules/list-of-vehicles/constants';
import {
  IDateRangeIsoType,
  IMyVehiclesRentsQueryParamsType,
  IMyVehiclesRentsResponseType,
} from '@/modules/my-account/constants';
import { IReviewsResponse, IVehicleRentType } from '@/modules/vehicle-rent/constants';

class VehiclesApi extends ApiService {
  public getVehiclesList(params: IVehicleQueryParamsType): Promise<IVehiclesResponseType> {
    const queryString = this.buildQueryString(params);

    return this.get<IVehiclesResponseType>(`api/vehicles?${queryString}`);
  }

  public getMyVehiclesList(params: IVehicleQueryParamsType): Promise<IVehiclesResponseType> {
    const queryString = this.buildQueryString(params);

    return this.get<IVehiclesResponseType>(`api/vehicles/my-vehicles?${queryString}`);
  }

  public getVehicle(id: number): Promise<IVehicleType> {
    return this.get<IVehicleType>(`api/vehicles/${id}`);
  }

  public getSimilarVehicles(id: number): Promise<IVehicleType[]> {
    return this.get<IVehicleType[]>(`api/vehicles/similar/${id}`);
  }

  public getVehicleUnavailableAndRentDates(id: number): Promise<IDateRangeIsoType[]> {
    return this.get<IDateRangeIsoType[]>(`api/vehicles/${id}/unavailable-and-rent-dates`);
  }

  public vehicleMakes(): Promise<string[]> {
    return this.get<string[]>('api/vehicle-makes/');
  }

  public vehiclePublishedMakes(): Promise<string[]> {
    return this.get<string[]>('api/vehicle-makes/available');
  }

  public vehicleModels(make: string): Promise<IVehicleModels> {
    return this.get<IVehicleModels>(`api/vehicle-makes/${make}`);
  }

  public vehicleUpdateDraft(vehicle: IVehicleRequestType, id: number): Promise<IVehicleType> {
    const body = JSON.stringify(vehicle);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.put<IVehicleType>(`api/vehicles/update-draft/${id}`, body, headers);
  }

  public vehicleCreateDraft(vehicle: IVehicleRequestType): Promise<IVehicleType> {
    const body = JSON.stringify(vehicle);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.post<IVehicleType>('api/vehicles/create-draft', body, headers);
  }

  public vehicleUpdatePublished(vehicle: IVehicleRequestType, id: number): Promise<IVehicleType> {
    const body = JSON.stringify(vehicle);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.put<IVehicleType>(`api/vehicles/update-published/${id}`, body, headers);
  }

  public vehicleCreatePublish(vehicle: IVehicleRequestType): Promise<IVehicleType> {
    const body = JSON.stringify(vehicle);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.post<IVehicleType>('api/vehicles/create-published', body, headers);
  }

  public getMyVehiclesRents(params: IMyVehiclesRentsQueryParamsType): Promise<IMyVehiclesRentsResponseType> {
    const queryString = this.buildQueryString(params);

    return this.get<IMyVehiclesRentsResponseType>(`api/vehicle-rents/my-vehicle-rents?${queryString}`);
  }

  public getRentsOfMyVehicles(params: IMyVehiclesRentsQueryParamsType): Promise<IMyVehiclesRentsResponseType> {
    const queryString = this.buildQueryString(params);
    return this.get<IMyVehiclesRentsResponseType>(`api/vehicle-rents/rents-of-my-vehicles?${queryString}`);
  }

  public refundRent(id: number): Promise<IVehicleRentType> {
    return this.post<IVehicleRentType>(`api/vehicle-rents/${id}/refund`, null, { 'Content-Type': 'application/json' });
  }

  public submitReview(reviewData: { rating: number; rate: number; comment: string; subReferenceId: number }): Promise<void> {
    const body = JSON.stringify(reviewData);
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.post<void>('api/ratings-reviews', body, headers);
  }

  public getReviews(page: number, perPage: number, ratingType: string = 'vehicle', rating?: number): Promise<IReviewsResponse> {
    let url = `api/ratings-reviews?ratingType=${ratingType}&page=${page}&per_page=${perPage}`;
    if (rating !== undefined) {
      url += `&rating=${rating}`;
    }

    return this.get<IReviewsResponse>(url);
  }

  public getRentById(id: number): Promise<IVehicleRentType> {
    return this.get<IVehicleRentType>(`api/vehicle-rents/${id}`);
  }
}

export const vehiclesApi = new VehiclesApi();
