import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../../../interfaces/movie';
import { DatePipe } from "../../../pipes/date.pipe";
import { MovieService } from '../../../services/api/movie.service';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, DatePipe],
  templateUrl: './showtime.component.html',
  styleUrl: './showtime.component.css',
})
export class ShowtimeComponent {
  movie: Movie | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (movieId) {
      this.loadshowtime(movieId);
    }
  }

  loadshowtime(movieId: number): void {
    this.movieService.getMovie(movieId).subscribe(data => {
      data.funciones.sort((a, b) => {
        const dateWithTimeA = new Date(`${a.fecha_funcion.split('T')[0]}T${a.hora_inicio_funcion}`);
        const dateWithTimeB = new Date(`${b.fecha_funcion.split('T')[0]}T${b.hora_inicio_funcion}`);
        
        return dateWithTimeA.getTime() - dateWithTimeB.getTime();
      });
      
      this.movie = data;
    });
  }  
}
