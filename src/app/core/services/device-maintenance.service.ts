import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { GET_DEVICES_LIST_ENDPOINT } from '@/app/shared/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class DeviceMaintenanceService {

  constructor(private httpService: HttpService) { }


  async fetchDevicesList(): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_DEVICES_LIST_ENDPOINT, {});
    return response;
  }

}
