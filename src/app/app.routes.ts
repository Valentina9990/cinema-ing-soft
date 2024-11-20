import { Routes } from '@angular/router';
import { CineComponent } from './components/cine/cine.component';
import { ComidaComponent } from './components/comida/comida.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowtimeComponent } from './components/showtimes/showtime/showtime.component';
import { ShowtimesComponent } from './components/showtimes/showtimes.component';
import { UsersComponent } from './components/users/users.component';
import { ErrorComponent } from './core/error/error.component';
import { LogoutComponent } from './core/logout/logout.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
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
        path: 'showtimes',
        component: ShowtimesComponent
    },
    {
        path: 'showtimes/:id',
        component: ShowtimeComponent
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
