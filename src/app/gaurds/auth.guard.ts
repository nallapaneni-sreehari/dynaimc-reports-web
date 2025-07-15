import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isLoggedIn = this.auth.isLoggedIn;
    if (isLoggedIn) {
      return true;
    } else {
      // Optional: Redirect to login or home
      return this.router.createUrlTree(['/']);
    }
  }
}