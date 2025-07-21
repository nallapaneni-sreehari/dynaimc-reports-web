// frontend/src/app/nextcloud-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from '../constants/constants';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'fabric';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private http: HttpClient) { }

  public themeChange: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public showFilePreviewBS: BehaviorSubject<any> = new BehaviorSubject<any>({});
  
  downloadTemplate(params: any, options: any) {
    const url = environment.apiUrl + ENDPOINTS.downloadTemplate;
    return this.http.post(url, params, options);
  }

  generateAndDownload(params: any, options: any) {
    const url = environment.apiUrl + ENDPOINTS.generateAndDownload;
    return this.http.post(url, params, options);
  }

  getReports(params: any) {
    const url = environment.apiUrl + ENDPOINTS.getReports + `/${params?.email}`;
    return this.http.get(url, params);
  }

  downloadFile(params: { bucket: string, key: string, env: string }) {
    const url = `${environment.apiUrl}${ENDPOINTS.downloadReport}?bucket=${params.bucket}&key=${params.key}&env=${params.env}`;
    return this.http.get(url, { responseType: 'arraybuffer' });
  }


}
