import { formatDate, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Movie } from '../../../interfaces/movie';
import { Room } from '../../../interfaces/room';
import { Show } from '../../../interfaces/show';
import { ShowTimeRequest } from '../../../interfaces/showTime';
import { MovieService } from '../../../services/api/movie.service';
import { RoomService } from '../../../services/api/room.service';
import { ShowtimeService } from '../../../services/api/showtime.service';

@Component({
  selector: 'app-add-showtime',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './add-showtime.component.html',
  styleUrl: './add-showtime.component.css',
})
export class AddShowtimeComponent {
  movies: Movie[] = [];
  rooms: Room[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  showtTime: ShowTimeRequest = {
    id_funcion: 0,
    id_sala: 0,
    id_pelicula: 0,
    fecha_funcion: '',
    hora_inicio_funcion: '',
  };

  constructor(
    private movieService: MovieService,
    private roomService: RoomService,
    private showTimeService: ShowtimeService
  ) {}

  @Output() formSubmitted = new EventEmitter<any>();
  @Input() showTime: Show | null = null;

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data.sort((a, b) =>
        a.nombrePelicula.localeCompare(b.nombrePelicula)
      );
    });

    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data.sort((a, b) =>
        a.nombreSala.localeCompare(b.nombreSala)
      );
    });
  }

  ngOnChanges(): void {
    if (this.showTime) {
      this.showtTime = {
        id_funcion: this.showTime.idFuncion,
        id_sala: this.showTime.idSala,
        id_pelicula: this.showTime.idPelicula,
        fecha_funcion: formatDate(this.showTime.fechaFuncion, 'yyyy-MM-dd', 'en'),
        hora_inicio_funcion: this.showTime.horaInicioFuncion,
      };
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    this.showTimeService
      .saveShowtime(this.showtTime)
      .pipe(
        catchError((response) => {
          this.errorMessage =
            response.error.message || 'An error occurred. Please try again.';
          return of(null);
        })
      )
      .subscribe((data) => {
        this.loading = false;
        if (data) {
          this.formSubmitted.emit();
        }
      });
  }
}
