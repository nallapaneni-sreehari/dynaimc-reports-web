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
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from "ngx-spinner";
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { ReportService } from '../services/reports.service';
import { formatDistanceToNow } from 'date-fns';
import { LoginService } from '../services/login.service';
import { environment } from '../environments/environment';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, FormsModule, ReactiveFormsModule, CommonModule, MatMenuModule, MatListModule, RouterModule, DrawerModule, Toolbar, AvatarModule, ButtonModule, ToastModule, NgxSpinnerModule, OverlayPanelModule, MenuModule, InputTextModule, InputGroupAddonModule, InputGroupModule, CardModule, SidebarModule, AccordionModule],
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


  openHelp = false;
  userImg = 'user.png';

  title = 'ReportsForge';

  btnClass = 'px-4 py-2 bg-white text-black rounded-md text-md hover:scale-95 transition ease-in-out duration-300'

  sideNavWidth: number = 100;
  isExpanded: boolean = true;
  // drawer = { opened: true };

  items: MenuItem[] | undefined;
  userInfo: any = {};

  drawerOpen = false;

  constructor(private oauthService: OAuthService, public auth: AuthService, private router: Router, private rs: ReportService, private ls: LoginService) { }

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

    this.getNotifications();
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

  notifications: any = [];
  getNotifications() {
    const user: any = localStorage.getItem('user');
    const userId = JSON.parse(user)?.userId;
    this.ls.getNotifications({ userId }).subscribe({
      next: (data: any) => {
        this.notifications = data;
      }
    })
  }


  clearNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  clearAll() {
    this.notifications = [];
  }

  getRelativeTime(dateString: string): string {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }
  getIconClass(title: string): string {
    if (/report/i.test(title)) {
      return 'pi pi-chart-line text-blue-400';
    } else if (/alert|system/i.test(title)) {
      return 'pi pi-exclamation-triangle text-yellow-400';
    } else if (/promo|offer|discount/i.test(title)) {
      return 'pi pi-bolt text-purple-400';
    }
    return 'pi pi-info-circle text-gray-400';
  }

  searchQuery: string = '';
  articles = [
    {
      title: 'How to Design Your Own Report Template',
      readTime: 4,
      content: 'Learn how to use the drag-and-drop builder to create reusable templates with dynamic fields, layouts, and custom styling.',
      link: 'https://docs.reportsforge.iamsreehari.in/templates',
      views: 1543,
      likes: 312
    },
    {
      title: 'Creating a New Report from Template',
      readTime: 3,
      content: 'Generate a report using your saved template. Choose a data source, fill in required parameters, and preview before exporting.',
      link: 'https://docs.reportsforge.iamsreehari.in/create-report',
      views: 1280,
      likes: 287
    },
    {
      title: 'Downloading and Exporting Reports',
      readTime: 2,
      content: 'Download reports in PDF, Excel, or JSON format. Learn how to bulk export with filters.',
      link: 'https://docs.reportsforge.iamsreehari.in/export',
      views: 935,
      likes: 175
    },
    {
      title: 'Scheduling Bulk Reports Automatically',
      readTime: 4,
      content: 'Schedule daily, weekly, or monthly report generations. Supports custom cron expressions and data source bindings.',
      link: 'https://docs.reportsforge.iamsreehari.in/schedule',
      views: 843,
      likes: 198
    },
    {
      title: 'Managing Reports (Stop, Pause, Resume, Delete)',
      readTime: 3,
      content: 'Easily manage your generated or scheduled reports with one-click controls to pause, resume, or remove them.',
      link: 'https://docs.reportsforge.iamsreehari.in/manage-reports',
      views: 1194,
      likes: 209
    },
    {
      title: 'Understanding Report Status & Logs',
      readTime: 0,
      content: 'Check status like Running, Completed, Failed, or Paused. Logs give step-by-step trace of generation and errors.',
      link: 'https://docs.reportsforge.iamsreehari.in/logs',
      views: 723,
      likes: 142
    },
    {
      title: 'How to Share Reports Securely with Others',
      readTime: 2,
      content: 'Use public links, one-time passwords, or email integrations to safely share reports with stakeholders.',
      link: 'https://docs.reportsforge.iamsreehari.in/share',
      views: 598,
      likes: 121
    },
    {
      title: 'Integrating ReportsForge with Your App via API',
      readTime: 1,
      content: 'Use REST APIs to trigger report generation, fetch results, or embed templates into your existing workflow.',
      link: 'https://docs.reportsforge.iamsreehari.in/api',
      views: 455,
      likes: 97
    }
  ];


  filteredArticles() {
    if (!this.searchQuery?.trim()) return this.articles;
    return this.articles.filter(article =>
      article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
