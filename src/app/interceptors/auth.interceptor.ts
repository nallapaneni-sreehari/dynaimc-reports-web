import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('id_token');
  
  // URLs to exclude
  const excludedUrls = [environment.host];

  const includeApis = excludedUrls.some(url => req.url.includes(url));

  if (token && includeApis) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
