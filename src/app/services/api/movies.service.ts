import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../utils/domains/URLs';
import { Movie } from '../../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl = `${API_URL}/movies`;

  constructor(private http: HttpClient) {}

  getMovies(limit: number = 10, offset: number = 0): Observable<Movie[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get<Movie[]>(this.baseUrl, { params });
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/getall`);
  }

  getMovie(idPelicula: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/get/${idPelicula}`);
  }

  addMovie(movie: Omit<Movie, 'idPelicula'>): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/add`, movie);
  }

  searchMovies(nombrePelicula: string): Observable<Movie[]> {
    const encodedSearch = encodeURIComponent(nombrePelicula);
    return this.http.get<Movie[]>(`${this.baseUrl}/search/${encodedSearch}`);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    const movieToUpdate = {
      ...movie,
      idPelicula: movie.idPelicula,
    };
    return this.http.put<Movie>(`${this.baseUrl}/update`, movieToUpdate);
  }

  deleteMovieById(idPelicula: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${idPelicula}`);
  }
}
