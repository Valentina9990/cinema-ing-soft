import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { Subject, Subscription } from 'rxjs';
import { MoviesService } from '../../services/api/movies.service';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];
  movies: Movie[];
  newMovie: Partial<Movie>;
  page = 1;
  pageSize = 15;
  totalMovies = 0;
  isEditing = false;
  isAdding = false;
  currentMovieId: number | null = null;
  searchSubject = new Subject<string>();
  searchTerm: string = '';

  constructor(private moviesService: MoviesService) {
    this.subscriptions = [];
    this.movies = [];
    this.newMovie = {};
  }

  ngOnInit(): void {
    this.getAllMovies();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public getAllMovies(): void {
    const moviesSub = this.moviesService.getAllMovies().subscribe({
      next: (response: Movie[]) => {
        this.movies = response;
        this.totalMovies = response.length;
        console.log('Users fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
    this.subscriptions.push(moviesSub);
  }

  confirmDelete(idMovie: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      this.deleteMovie(idMovie);
    }
  }

  addMovie(): void {
    this.moviesService
      .addMovie(this.newMovie as Omit<Movie, 'idPelicula'>)
      .subscribe({
        next: (createdMovie) => {
          this.movies.push(createdMovie);
          this.isAdding = false;
          this.newMovie = {};
          console.log('Movie added successfully:', createdMovie);
        },
        error: (error) => {
          console.error('Error adding user:', error);
        },
      });
  }

  updateMovie(idMovie: number): void {
    const updatedUser = this.newMovie as Omit<Movie, 'idPelicula'>;
    this.moviesService.updateMovieById(idMovie, updatedUser).subscribe({
      next: (user) => {
        const index = this.movies.findIndex(
          (p) => p.idPelicula === user.idPelicula
        );
        if (index !== -1) {
          this.movies[index] = user;
        }
        this.isEditing = false;
        this.newMovie = {};
        console.log('Movie updated successfully:', user);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      },
    });
  }

  deleteMovie(idMovie: number): void {
    this.moviesService.deleteMovieById(idMovie).subscribe({
      next: () => {
        this.movies = this.movies.filter((u) => u.idPelicula !== idMovie);
        console.log(`Movie with ID ${idMovie} deleted successfully`);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }

  searchMovies(search: string): void {
    this.moviesService.searchMovies(search).subscribe({
      next: ()=>{
        this.movies = this.movies.filter((u) => u.nombrePelicula === search);
        console.log(`Movie with title ${search} found successfully`);
      }, error: (error) => {
        console.error('No existe la pelicula:', error);
      }
    });
  }

  showAddMovieForm(): void {
    this.isAdding = true;
    this.isEditing = false;
    this.newMovie = {};
  }


  startEditing(movie: Movie): void {
    this.isEditing = true;
    this.isAdding = false;
    this.currentMovieId = movie.idPelicula;
    this.newMovie = { ...movie };
  }


  cancelEditing(): void {
    this.isEditing = false;
    this.isAdding = false;
    this.newMovie = {};
  }

  get paginatedMovies(): Movie[] {
    const startItem = (this.page - 1) * this.pageSize;
    const endItem = this.page * this.pageSize;
    return this.movies.slice(startItem, endItem);
  }

  onPageChange(page: number): void {
    this.page = page;
  }


  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
  }
}
