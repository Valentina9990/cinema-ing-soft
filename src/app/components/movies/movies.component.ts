import { Component } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { Subscription } from 'rxjs';
import { MoviesService } from '../../services/api/movies.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  subscriptions:Subscription[];
movies: Movie[];
newMovie: Partial<Movie>;
page = 1;
pageSize = 15;
totalMovies = 0;
constructor(
  private moviesService: MoviesService
){
  this.subscriptions = [];
  this.movies = [];
  this.newMovie = {};
}

ngOnInit(): void {
  this.getMovie();
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

public getMovie(): void {
  const moviesSub = this.moviesService.getMovies().subscribe({
    next: (response: Movie[]) => {
      this.movies = response;
      this.totalMovies = response.length;
      console.log('Users fetched successfully:', response);
    },
    error: (error) => {
      console.error('Error fetching movies:', error);
    }
  });
  this.subscriptions.push(moviesSub);
}

addMovie(): void {
  this.moviesService.addMovie(this.newMovie as Omit<Movie, 'idPelicula'>).subscribe({
    next: (createdMovie) => {
      this.movies.push(createdMovie);
      console.log('Movie added successfully:', createdMovie);
    },
    error: (error) => {
      console.error('Error adding user:', error);
    }
  });
}

updateUser(idMovie: number): void {
  const updatedUser = this.newMovie as Omit<Movie, 'idPelicula'>;
  this.moviesService.updateMovieById(idMovie, updatedUser).subscribe({
    next: (user) => {
      const index = this.movies.findIndex(u => u.idPelicula === user.idPelicula);
      if (index !== -1) {
        this.movies[index] = user;
      }
      console.log('Movie updated successfully:', user);
    },
    error: (error) => {
      console.error('Error updating user:', error);
    }
  });
}

deleteUser(idMovie: number): void {
  this.moviesService.deleteMovieById(idMovie).subscribe({
    next: () => {
      this.movies = this.movies.filter(u => u.idPelicula !== idMovie);
      console.log(`Movie with ID ${idMovie} deleted successfully`);
    },
    error: (error) => {
      console.error('Error deleting user:', error);
    }
  });
}

get paginatedUsers(): Movie[] {
  const startItem = (this.page - 1) * this.pageSize;
  const endItem = this.page * this.pageSize;
  return this.movies.slice(startItem, endItem);
}

onPageChange(page: number): void {
  this.page = page;
}

}
