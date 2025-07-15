import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGaurd } from './gaurds/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGaurd]
    },
    {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [AuthGaurd]
    },
    {
        path: 'templates',
        component: TemplatesComponent,
        canActivate: [AuthGaurd]
    },
];
