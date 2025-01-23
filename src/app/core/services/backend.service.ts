import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CREATE_UPDATE_BACKEND_ENDPOINT, GET_BACKEND_COMMAND_LIST_ENDPOINT, GET_BACKEND_LIST_BY_STATEID_ENDPOINT } from '@/app/shared/constants/endpoints';
import { createBackend } from '@/app/shared/interfaces/postData';
import { BackendData } from '@/app/shared/interfaces/getData';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpService: HttpService) { }


  async fetchBackendListByStateId(id: number): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_BACKEND_LIST_BY_STATEID_ENDPOINT, {}, id);
    return response;
  }


  async createBackend(data: createBackend): Promise<IResponseInterface> {
    const response = await this.httpService.post<IResponseInterface>(CREATE_UPDATE_BACKEND_ENDPOINT, data);
    return response;
  }

  async updateBackend(data: BackendData): Promise<IResponseInterface> {
    const response = await this.httpService.put<IResponseInterface>(CREATE_UPDATE_BACKEND_ENDPOINT, data?.id, data);
    return response;
  }

  async getBackendCommandList(id: number): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_BACKEND_COMMAND_LIST_ENDPOINT, {}, id);
    return response;
  }
}
