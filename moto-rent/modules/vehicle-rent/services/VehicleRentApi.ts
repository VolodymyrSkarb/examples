import { ApiService } from '@/services/api/ApiService';
import { IPriceType, IVehicleRentFormDataType, IVehicleRentType } from '@/modules/vehicle-rent/constants';
import { IDateRangeIsoType } from '@/modules/my-account/constants';

class VehicleRentApi extends ApiService {
  public submitForm(formData: IVehicleRentFormDataType): Promise<IVehicleRentType> {
    const json: string = JSON.stringify(formData);

    return this.post<IVehicleRentType>('api/vehicle-rents/create', json, { 'Content-Type': 'application/json' });
  }

  public calculatePrice(dateRange: IDateRangeIsoType, id: number): Promise<IPriceType> {
    const json: string = JSON.stringify(dateRange);

    return this.post<IPriceType>(`api/vehicles/${id}/calculate-price`, json, { 'Content-Type': 'application/json' });
  }
}

export const vehicleRentApi = new VehicleRentApi();
