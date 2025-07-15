import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, MatMenuModule, MatListModule, RouterModule, DrawerModule, Toolbar, AvatarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userImg = 'user.png';

  title = 'ReportsForge';

  btnClass = 'px-4 py-2 bg-white text-black rounded-md text-md hover:scale-95 transition ease-in-out duration-300'

  sideNavWidth: number = 100;
  isExpanded: boolean = true;
  // drawer = { opened: true };

  items: MenuItem[] | undefined;
  userInfo: any = {};

  drawerOpen = false;

  constructor(private oauthService: OAuthService, public auth: AuthService, private router: Router) { }

  toggleDrawer() {
    // Toggle the side nav width and expanded state when the button is clicked
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.sideNavWidth = 250;
      // this.drawer.opened = true;
    } else {
      this.sideNavWidth = 70;
      // this.drawer.opened = false;
    }
  }

  async ngOnInit() {
    this.oauthService.events.subscribe(async (e: OAuthEvent) => {
          if (e.type === 'token_received') {
            this.userInfo = await firstValueFrom(this.auth.loadUserInfo());
          }
        });

    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/canva'
      },
      {
        label: 'Your Reports',
        icon: 'pi pi-star',
        routerLink: '/reports'
      },
      {
        label: 'Template Builder',
        icon: 'pi pi-search',
        routerLink: '/office',
      }
    ]
    this
      .oauthService
      .events
      .subscribe(e => {
        if (e.type == 'token_expires') {
          // this.oauthService.silentRefresh();
          this.auth.logout();
        }
      });
      this.userInfo = await firstValueFrom(this.auth.loadUserInfo());
  }


  logout() {
    this.userInfo = null;
    this.auth.logout();
    this.router.navigate(['/'])
  }
}
