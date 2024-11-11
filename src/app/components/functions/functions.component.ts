import { NgFor, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MoviesService } from '../../services/api/movies.service';

@Component({
  selector: 'app-functions',
  standalone: true,
  imports: [NgFor, SlicePipe, RouterModule],
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css',
})
export class FunctionsComponent {
  movies: Movie[] = [];

  constructor(private http: HttpClient, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadFunctions();
  }

  loadFunctions(): void {
    this.moviesService.getMovies().subscribe(data => {
      this.movies = data.filter((movie: Movie) => movie.funciones.length > 0);
    }); 
  }
}
