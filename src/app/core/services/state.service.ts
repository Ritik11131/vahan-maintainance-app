import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { GET_STATES_LIST_ENDPOINT } from '@/app/shared/constants/endpoints';
import { createState } from '@/app/shared/interfaces/postData';
import { StateData } from '@/app/shared/interfaces/getData';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private httpService: HttpService) { }


   async fetchStatesList(): Promise<IResponseInterface> {
      const response = await this.httpService.get<IResponseInterface>(GET_STATES_LIST_ENDPOINT, {});
      return response;
    }

    async createState(data: createState): Promise<IResponseInterface> {
      const response = await this.httpService.post<IResponseInterface>(GET_STATES_LIST_ENDPOINT, data);
      return response;
    }

    async updateState(data: StateData): Promise<IResponseInterface> {
      const response = await this.httpService.put<IResponseInterface>(GET_STATES_LIST_ENDPOINT, data?.id, data);
      return response;
    }
}
