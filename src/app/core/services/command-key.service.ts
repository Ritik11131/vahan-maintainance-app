import { IResponseInterface } from '@/app/shared/interfaces/auth';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { createBackend, createCommandKey } from '@/app/shared/interfaces/postData';
import { CommandKeyData } from '@/app/shared/interfaces/getData';
import { GET_COMMAND_KEY_LIST_ENDPOINT } from '@/app/shared/constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CommandKeyService {

  constructor(private httpService: HttpService) { }

  async fetchCommandKeyList(): Promise<IResponseInterface> {
        const response = await this.httpService.get<IResponseInterface>(GET_COMMAND_KEY_LIST_ENDPOINT, {});
        return response;
      }
  
      async createCommandKey(data: createCommandKey): Promise<IResponseInterface> {
        const response = await this.httpService.post<IResponseInterface>(GET_COMMAND_KEY_LIST_ENDPOINT, data);
        return response;
      }
  
      async updateCommandKey(data: CommandKeyData): Promise<IResponseInterface> {
        const response = await this.httpService.put<IResponseInterface>(GET_COMMAND_KEY_LIST_ENDPOINT, data?.id, data);
        return response;
      }
}
