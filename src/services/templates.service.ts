// frontend/src/app/nextcloud-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/constants';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  constructor(private http: HttpClient) {}

  getUserTemplates(email: string){
    const url = environment.apiUrl + ENDPOINTS.getTemplates;
    return this.http.get(url + `/${email}`);
  }
}
