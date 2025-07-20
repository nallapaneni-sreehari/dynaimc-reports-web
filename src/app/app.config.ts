import { ApplicationConfig, importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    provideOAuthClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
      }
    }),
    importProvidersFrom(ToastModule),
    MessageService,
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
