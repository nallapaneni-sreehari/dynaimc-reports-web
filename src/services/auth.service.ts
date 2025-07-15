import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { authConfig } from '../app/auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private oauthService: OAuthService, private http: HttpClient) {
        this.configure();
    }

    private configure() {
        this.oauthService.configure(authConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }

    login() {
        this.oauthService.initLoginFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    get accessToken() {
        return this.oauthService.getAccessToken();
    }

    get isLoggedIn(): boolean {
        return this.oauthService.hasValidAccessToken();
    }

    get identityClaims(): any {
        return this.oauthService.getIdentityClaims();
    }

    public getUserInfo() {
        // Option 1: Get claims from ID token
        const claims: any = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return {
            name: claims.name,
            email: claims.email,
            picture: claims.picture,
        };
    }

    // Call this after login success
    public loadUserInfo() {
        const url = 'https://www.googleapis.com/oauth2/v2/userinfo';
        return this.http.get(url, {
            headers: { Authorization: 'Bearer ' + this.accessToken }
        });
    }
}
