import { Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
