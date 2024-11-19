import { NgFor, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieWithShowTimes as Movie, MovieWithShowTimes } from '../../interfaces/movieWithShowTimes';
import { ShowtimeService } from '../../services/api/showtime.service';
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
  
  constructor(private showtimeService: ShowtimeService) {}

  ngOnInit(): void {
    this.loadshowtimes();
  }

  loadshowtimes(): void {
    this.showtimeService.getMovies().subscribe((data) => {
      this.movies = data
      .filter((movie: MovieWithShowTimes) => movie.funciones.length > 0)
      .sort((a: MovieWithShowTimes, b: MovieWithShowTimes) => a.nombrePelicula.localeCompare(b.nombrePelicula));
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
