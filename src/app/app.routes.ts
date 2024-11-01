import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
