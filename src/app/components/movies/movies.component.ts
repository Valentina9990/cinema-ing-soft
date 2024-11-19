import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/api/movie.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private searchSubject = new Subject<string>();
  
  movies: Movie[] = [];
  newMovie: Partial<Movie> = {};
  page = 1;
  pageSize = 15;
  totalMovies = 0;
  searchTerm = '';
  isLoading = false;
  errorMessage = '';

  constructor(private moviesService: MovieService) {
    const searchSubscription = this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.performSearch(term);
    });
    this.subscriptions.push(searchSubscription);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.searchSubject.complete();
  }

  loadMovies(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const moviesSub = this.moviesService.getMovies()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: Movie[]) => {
          this.movies = response;
          this.totalMovies = response.length;
          console.log('Movies fetched successfully:', response);
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar las películas. Por favor, inténtelo de nuevo.';
          console.error('Error fetching movies:', error);
        }
    });
    this.subscriptions.push(moviesSub);
  }

  addMovie(): void {
    if (!this.validateMovie(this.newMovie)) return;

    this.isLoading = true;
    this.errorMessage = '';

    const addSub = this.moviesService.addMovie(this.newMovie as Omit<Movie, 'idPelicula'>)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (createdMovie: Movie) => {
          this.movies = [...this.movies, createdMovie];
          this.totalMovies = this.movies.length;
          this.resetForm();
          alert('Película añadida correctamente');
        },
        error: (error) => {
          this.errorMessage = 'Error al añadir la película. Por favor, inténtelo de nuevo.';
          console.error('Error adding movie:', error);
        }
    });
    this.subscriptions.push(addSub);
  }

  updateMovie(movie: Movie): void {
    if (!this.validateMovie(movie)) return;

    this.isLoading = true;
    this.errorMessage = '';

    const updateSub = this.moviesService.updateMovie(movie)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (updatedMovie) => {
          this.movies = this.movies.map(m => 
            m.idPelicula === updatedMovie.idPelicula ? updatedMovie : m
          );
          this.resetForm();
          alert('Película actualizada correctamente');
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar la película. Por favor, inténtelo de nuevo.';
          console.error('Error updating movie:', error);
        }
    });
    this.subscriptions.push(updateSub);
  }

  deleteMovie(idMovie: number): void {
    if (!confirm('¿Está seguro de que desea eliminar esta película?')) return;

    this.isLoading = true;
    this.errorMessage = '';

    const deleteSub = this.moviesService.deleteMovieById(idMovie)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          this.movies = this.movies.filter(m => m.idPelicula !== idMovie);
          this.totalMovies = this.movies.length;
          alert('Película eliminada correctamente');
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar la película. Por favor, inténtelo de nuevo.';
          console.error('Error deleting movie:', error);
        }
    });
    this.subscriptions.push(deleteSub);
  }

  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  private performSearch(term: string): void {
    if (!term.trim()) {
      this.loadMovies();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const searchSub = this.moviesService.searchMovies(term)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (results) => {
          this.movies = results;
          this.totalMovies = results.length;
        },
        error: (error) => {
          this.errorMessage = 'Error en la búsqueda. Por favor, inténtelo de nuevo.';
          console.error('Error searching movies:', error);
        }
    });
    this.subscriptions.push(searchSub);
  }

  private validateMovie(movie: Partial<Movie>): boolean {
    if (!movie.nombrePelicula?.trim()) {
      this.errorMessage = 'El nombre de la película es requerido';
      return false;
    }
    return true;
  }

  get paginatedMovies(): Movie[] {
    const startItem = (this.page - 1) * this.pageSize;
    const endItem = this.page * this.pageSize;
    return this.movies.slice(startItem, endItem);
  }

  onPageChange(page: number): void {
    this.page = page;
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.idPelicula;
  }

  editMovie(movie: Movie): void {
    this.newMovie = { ...movie };
    this.errorMessage = '';
  }

  onSubmit(): void {
    if (this.newMovie.idPelicula) {
      this.updateMovie(this.newMovie as Movie);
    } else {
      this.addMovie();
    }
  }

  resetForm(): void {
    this.newMovie = {};
    this.errorMessage = '';
  }
}