import { IVehicleQueryParamsType, IVehiclesResponseType } from '@/modules/list-of-vehicles/constants';
import { vehiclesApi } from '@/services/api/vehiclesApi/VehiclesApi';
import { defineStore } from 'pinia';
import { showErrors } from '../api/showApiErrors';
import { IErrorType } from '@/constants/constants';

export const useListingsStore = defineStore('vehicles', {
  state: () => ({
    vehiclesMakes: [] as string[],
    vehicleList: {
      currentPageNumber: 0,
      numItemsPerPage: 0,
      items: [],
      totalCount: 0,
    } as IVehiclesResponseType,
  }),
  actions: {
    async getVehicleMakes(): Promise<void> {
      try {
        this.vehiclesMakes = await vehiclesApi.vehicleMakes();
      } catch (error) {
        this.vehiclesMakes = [];
        showErrors(error as IErrorType);

        throw new Error(error);
      }
    },
    async getVehicleList(params: IVehicleQueryParamsType): Promise<void> {
      try {
        this.vehicleList = await vehiclesApi.getMyVehiclesList(params);
      } catch (error) {
        this.vehicleList = {
          currentPageNumber: 0,
          numItemsPerPage: 0,
          items: [],
          totalCount: 0,
        } as IVehiclesResponseType;
        showErrors(error as IErrorType);

        throw new Error(error);
      }
    },
  },
});
