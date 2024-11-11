import { Routes } from '@angular/router';
import { CineComponent } from './components/cine/cine.component';
import { ComidaComponent } from './components/comida/comida.component';
import { FunctionComponent } from './components/functions/function/function.component';
import { FunctionsComponent } from './components/functions/functions.component';
import { MoviesComponent } from './components/movies/movies.component';
import { UsersComponent } from './components/users/users.component';
import { ErrorComponent } from './core/error/error.component';
import { LogoutComponent } from './core/logout/logout.component';

export const routes: Routes = [
    {
        path: '',
        component: CineComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'cine',
        component: CineComponent
    },
    {
        path: 'functions',
        component: FunctionsComponent
    },
    {
        path: 'functions/:id',
        component: FunctionComponent
    },
    {
        path: 'comida',
        component: ComidaComponent

    },
    {
        path: 'movies',
        component: MoviesComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
