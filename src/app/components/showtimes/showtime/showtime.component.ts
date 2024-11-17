import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Movie } from '../../../interfaces/movie';
import { DatePipe } from '../../../pipes/date.pipe';
import { MovieService } from '../../../services/api/movie.service';
import { ShowtimeService } from '../../../services/api/showtime.service';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, DatePipe],
  templateUrl: './showtime.component.html',
  styleUrl: './showtime.component.css',
})
export class ShowtimeComponent {
  movie: Movie | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private showtimeservice: ShowtimeService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (movieId) {
      this.loadshowtime(movieId);
    }
  }

  loadshowtime(movieId: number): void {
    this.movieService.getMovie(movieId).subscribe((data) => {
      data.funciones.sort((a, b) => {
        const dateWithTimeA = new Date(
          `${a.fechaFuncion.split('T')[0]}T${a.horaInicioFuncion}`
        );
        const dateWithTimeB = new Date(
          `${b.fechaFuncion.split('T')[0]}T${b.horaInicioFuncion}`
        );

        return dateWithTimeA.getTime() - dateWithTimeB.getTime();
      });

      this.movie = data;
    });
  }

  deleteShowtime(showtimeId: number): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    this.showtimeservice
      .deleteShowtime(showtimeId)
      .pipe(
        catchError((response) => {
          this.setErrorMessage(response.error.message);
          return of(null);
        })
      )
      .subscribe(() => {
        this.movie = this.movie && {
          ...this.movie,
          funciones: this.movie.funciones.filter(
            (funcion) => funcion.idFuncion !== showtimeId
          ),
        };
        this.setSuccessMessage('Showtime deleted successfully');
      });
    this.loading = false;
  }

  setErrorMessage(message: string): void {
    this.errorMessage = message;

    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  setSuccessMessage(message: string): void {
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}
