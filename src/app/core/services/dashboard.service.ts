import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { GET_VEHICLE_LIST_ENDPOINT } from '@/app/shared/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpService) { }

  async fetchVehicleList() : Promise<IResponseInterface> {
      const response = await this.httpService.get<IResponseInterface>(GET_VEHICLE_LIST_ENDPOINT,{});
      return response;
  }

}
