// frontend/src/app/nextcloud-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/constants';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(params: any) {
    const url = environment.apiUrl + ENDPOINTS.login;
    return this.http.post(url, params, {});
  }
}
