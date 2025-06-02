import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CanvasEditorComponent } from '../canvas-editor/canvas-editor.component';
import { ReportEditorComponent } from '../report-editor/report-editor.component';
import { OnlyofficeSuitComponent } from '../onlyoffice-suit/onlyoffice-suit.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'canva',
        component: CanvasEditorComponent
    },
    {
        path: 'reports',
        component: ReportEditorComponent
    },
    {
        path: 'office',
        component: OnlyofficeSuitComponent
    },
];
