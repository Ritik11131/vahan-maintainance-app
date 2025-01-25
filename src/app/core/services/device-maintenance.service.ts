import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { GET_CREATE_DEVICE_ENDPOINT, GET_DEVICES_LIST_ENDPOINT, GET_FILTERED_DEVICES_LIST_ENDPOINT, GET_PING_BY_ID_ENDPOINT } from '@/app/shared/constants/endpoints';
import { createDevice } from '@/app/shared/interfaces/postData';

@Injectable({
  providedIn: 'root'
})
export class DeviceMaintenanceService {

  constructor(private httpService: HttpService) { }


  async fetchDevicesList(): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_DEVICES_LIST_ENDPOINT, {});
    return response;
  }

  async createDevice(data: createDevice): Promise<IResponseInterface> {
    const response = await this.httpService.post<IResponseInterface>(GET_CREATE_DEVICE_ENDPOINT, data);
    return response;
  }


  async fetchFilteredDevicesList(filter: any): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_FILTERED_DEVICES_LIST_ENDPOINT, {}, filter);
    return response;
  }

  async getPingById(id: number): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_PING_BY_ID_ENDPOINT, {}, id);
    return response;
  }

}
