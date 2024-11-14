import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Movie } from '../../../interfaces/movie';
import { DatePipe } from "../../../pipes/date.pipe";
import { MoviesService } from '../../../services/api/movies.service';

@Component({
  selector: 'app-showtime',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor, DatePipe],
  templateUrl: './showtime.component.html',
  styleUrl: './showtime.component.css',
})
export class ShowtimeComponent {
  movie: Movie | null = null;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (movieId) {
      this.loadshowtime(movieId);
    }
  }

  loadshowtime(movieId: number): void {
    this.moviesService.getMovie(movieId).subscribe(data => {
      data.funciones.sort((a, b) => {
        const dateWithTimeA = new Date(`${a.fechaFuncion.split('T')[0]}T${a.horaInicioFuncion}`);
        const dateWithTimeB = new Date(`${b.fechaFuncion.split('T')[0]}T${b.horaInicioFuncion}`);
        
        return dateWithTimeA.getTime() - dateWithTimeB.getTime();
      });
      
      this.movie = data;
    });
  }  
}
