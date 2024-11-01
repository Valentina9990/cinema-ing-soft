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
    { name: 'Dashboard', path: 'dashboard', icon: 'fas fa-home'},
    { name: 'Peliculas', path: 'movies', icon: 'fas fa-home'},
    { name: 'Salas', path: 'rooms', icon: 'fas fa-home'},
    { name: 'Comidas', path: 'foods', icon: 'fas fa-home'},
    { name: 'Funciones', path: 'functions', icon: 'fas fa-home'},
  ];
}
