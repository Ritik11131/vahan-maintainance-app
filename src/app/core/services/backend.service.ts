import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { GET_BACKEND_LIST_BY_STATEID_ENDPOINT } from '@/app/shared/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpService: HttpService) { }


  async fetchBackendListByStateId(id: number): Promise<IResponseInterface> {
    const response = await this.httpService.get<IResponseInterface>(GET_BACKEND_LIST_BY_STATEID_ENDPOINT, {}, id);
    return response;
  }
}
