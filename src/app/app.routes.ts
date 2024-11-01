import { Routes } from '@angular/router';
import { ErrorComponent } from './core/error/error.component';
import { LogoutComponent } from './core/logout/logout.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
