import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieWithShowTimes } from '../../../interfaces/movieWithShowTimes';
import { Show } from '../../../interfaces/show';
import { DatePipe } from '../../../pipes/date.pipe';
import { ShowtimeService } from '../../../services/api/showtime.service';
import { AddShowtimeComponent } from '../add-showtime/add-showtime.component';

declare const bootstrap: any;

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, DatePipe, AddShowtimeComponent],
  templateUrl: './showtime.component.html',
  styleUrl: './showtime.component.css',
})
export class ShowtimeComponent {
  movie: MovieWithShowTimes | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  loading: boolean = false;
  showtimeToEdit: Show | null = null;

  constructor(
    private route: ActivatedRoute,
    private showtimeservice: ShowtimeService
  ) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (movieId) {
      this.loadshowtime(movieId);
    }
  }

  loadshowtime(movieId: number): void {
    this.showtimeservice.getMovie(movieId).subscribe((data) => {
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
      .subscribe({
        next: () => {
          this.setSuccessMessage('Showtime deleted successfully');
          this.loadshowtime(Number(this.movie!.idPelicula));
        },
        error: (error) => {
          this.setErrorMessage('No se puede eliminar porque tiene reservas asociadas');
        },
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

  openModal(showTime: Show) {
    const modal = bootstrap.Modal.getOrCreateInstance('#addShowtimeModal');
    this.showtimeToEdit = showTime;
    modal.show();
  }

  closeModal() {
    const modal = bootstrap.Modal.getOrCreateInstance('#addShowtimeModal');
    modal.hide();
  }

  handleFormSubmitted() {
    this.closeModal();
    this.loadshowtime(Number(this.movie!.idPelicula));
  }
}
