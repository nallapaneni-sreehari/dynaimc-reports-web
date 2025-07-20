import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { firstValueFrom } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  userInfo: any | null = {};
  drawerOpen = false;
  fullText = 'ReportsForge - Custom Reports, Zero Coding.';
  displayText = '';
  index = 0;
  constructor(public auth: AuthService, public oAuthService: OAuthService, private router: Router) { }
  private loginService = inject(LoginService);

  ngOnInit() {
    this.oAuthService.events.subscribe(async (e: OAuthEvent) => {
      if (e.type === 'token_received') {
        this.userInfo = await firstValueFrom(this.auth.loadUserInfo());
        console.info(`userInfo ::: token recieve`, this.userInfo);
        this.showSuccess({msg: 'Success', details: `Welcome, ${this.userInfo?.name}`});
        
        this.loginService.login({ name: this.userInfo?.name, email: this.userInfo?.email }).subscribe({
          next: (data: any) => {
            localStorage.setItem('user', JSON.stringify({...this.userInfo, userId: data?.user?.id}));
            console.info(`Login success :: `, data);
          },
          error: (_err)=>{
            localStorage.setItem('user', JSON.stringify(this.userInfo));
          }
        });
        this.router.navigate(['/dashboard']);
      }
    });

    if (this.auth.identityClaims) {
      this.auth.loadUserInfo().subscribe({
        next: (data) => {
          this.userInfo = data;
          console.info(`userInfo ::: `, this.userInfo);
          this.router.navigate(['/dashboard']);
        }
      });
    }
    else {
      this.typeWriter();
    }
  }

  login() {
    this.auth.login();

  }

  typeWriter() {
    if (this.index < this.fullText.length) {
      this.displayText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeWriter(), 60); // adjust speed here
    }
  }

  public toast = inject(ToastService);
  showSuccess({ msg, details }: any) {
    this.toast.success(msg, details);
  }
  showError({ msg, details }: any) {
    this.toast.success(msg, details);
  }

}
