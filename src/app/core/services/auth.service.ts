import { Injectable } from '@angular/core';
import { HttpService } from './http.service'; // Adjust the path as necessary
import { environment } from '@/environments/environment';
import { LOGIN_ENDPOINT } from '@/app/shared/constants/endpoints';
import { IResponseInterface } from '@/app/shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor(private httpService: HttpService) {}

  /**
   * Log in the user and store the token.
   * @param loginId The id of the user.
   * @param password The password of the user.
   * @returns A promise that resolves to the authentication response.
   */
  async login(loginId: string, password: string): Promise<IResponseInterface> {
    const data = { loginDevice:'web',loginId:'appdemo', password:'12345678' };
    // const response = await this.httpService.post<IResponseInterface>(LOGIN_ENDPOINT, data);
    const response = {
      time: '', // ISO 8601 date string
      success: true,
      message: '',
      requestId: '',
      data: 'Token aagya',
      errors: [] // Assuming errors can be of any type, you can define a more specific type if needed
    }
    this.setTokens(response.data); // Assuming the response contains a token
    return response;
  }

  /**
   * Log out the user and clear the token.
   */
  logout(): void {
    this.token = null;
    localStorage.removeItem('access_token'); // Clear token from local storage
  }

  /**
   * Check if the user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Set the token in local storage.
   * @param token The token to set.
   */
  private setTokens(access_token: string): void {
    this.token = access_token;
    localStorage.setItem('access_token', access_token);
  }

  /**
   * Get the token from local storage.
   * @returns The token if it exists, null otherwise.
   */
  public getToken(): string | null {
    return this.token || localStorage.getItem('access_token');
  }
}