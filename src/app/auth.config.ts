import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: environment.redirectUri,
  clientId: '123119326863-v7h8d46l1ktq0pb95ca5ghql8bec8jpd.apps.googleusercontent.com',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile email',
};
