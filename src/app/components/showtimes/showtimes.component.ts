import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/api/movie.service';
import { AddShowtimeComponent } from './add-showtime/add-showtime.component';

declare const bootstrap: any;
@Component({
  selector: 'app-showtimes',
  standalone: true,
  imports: [NgFor, SlicePipe, RouterModule, AddShowtimeComponent],
  templateUrl: './showtimes.component.html',
  styleUrl: './showtimes.component.css',
})
export class ShowtimesComponent {
  movies: Movie[] = [];
  
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadshowtimes();
  }

  loadshowtimes(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.filter((movie: Movie) => movie.funciones.length > 0);
    });
  }

  handleFormSubmission() {
    this.closeModal();
    this.loadshowtimes();
  }

  openModal() {
    const modal = bootstrap.Modal.getOrCreateInstance('#addShowtimeModal');
    modal.show();
  }

  closeModal() {
    const modal = bootstrap.Modal.getOrCreateInstance('#addShowtimeModal');
    modal.hide();
  }
}
