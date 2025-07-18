import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from "ngx-spinner";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ReportService } from '../services/reports.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, MatMenuModule, MatListModule, RouterModule, DrawerModule, Toolbar, AvatarModule, ButtonModule, ToastModule, NgxSpinnerModule, OverlayPanelModule, MenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  mobileMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Template Builder',
      icon: 'pi pi-folder-open',
      routerLink: '/templates'
    },
    {
      label: 'Your Reports',
      icon: 'pi pi-file-pdf',
      routerLink: '/reports'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      routerLink: '/settings'
    }
  ];


  userImg = 'user.png';

  title = 'ReportsForge';

  btnClass = 'px-4 py-2 bg-white text-black rounded-md text-md hover:scale-95 transition ease-in-out duration-300'

  sideNavWidth: number = 100;
  isExpanded: boolean = true;
  // drawer = { opened: true };

  items: MenuItem[] | undefined;
  userInfo: any = {};

  drawerOpen = false;

  constructor(private oauthService: OAuthService, public auth: AuthService, private router: Router, private rs: ReportService) { }

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
    // Dark theme disable by default
    this.toggleLightByDefault();

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

  isDark = false;
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark', !this.isDark); // HTML element
    document.documentElement.classList.toggle('app-dark', !this.isDark); // App element
    this.isDark = !this.isDark;

    // Call themeChange event so that ag grid color also will change to dark theme
    this.rs?.themeChange?.next(this.isDark ? 'dark' : 'light');
  }

  toggleLightByDefault() {
    document.documentElement.classList.toggle('dark', false); // HTML element
    document.documentElement.classList.toggle('app-dark', false); // App element
  }

  notifications = [
    {
      icon: 'pi pi-chart-line text-blue-400',
      title: 'New Report',
      time: '5 mins ago',
      message: 'Your monthly sales report is ready.'
    },
    {
      icon: 'pi pi-exclamation-triangle text-yellow-400',
      title: 'System Alert',
      time: '2 hours ago',
      message: 'Disk usage is reaching 90%.'
    },
    {
      icon: 'pi pi-bolt text-purple-400',
      title: 'Promo Alert',
      time: 'Yesterday',
      message: 'Get 30% off on your next upgrade.'
    }
  ];

  clearNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  clearAll() {
    this.notifications = [];
  }
}
