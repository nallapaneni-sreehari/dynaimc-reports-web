// frontend/src/app/nextcloud-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/constants';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) { }

  downloadTemplate(params: any, options: any) {
    const url = environment.apiUrl + ENDPOINTS.downloadTemplate;
    return this.http.post(url, params, options);
  }

  generateAndDownload(params: any, options: any) {
    const url = environment.apiUrl + ENDPOINTS.generateAndDownload;
    return this.http.post(url, params, options);
  }
}
