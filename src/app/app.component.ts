import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgFor, NgClass, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Cine';
  pages = [
    { name: 'Funciones', path: 'functions', icon: 'fas fa-camera'},
    { name: 'Peliculas', path: 'movies', icon: 'fas fa-film'},
    { name: 'Salas', path: 'rooms', icon: 'fas fa-home'},
    { name: 'Comidas', path: 'foods', icon: 'fas fa-utensils'},
    { name: 'Usuarios', path: 'users', icon: 'fas fa-user'},
  ];
}
