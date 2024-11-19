import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = `${API_URL}/movies`;

  constructor(private http: HttpClient) {}

  getMovies(limit: number|null = null, offset: number = 0): Observable<Movie[]> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit ? limit.toString() : '');

    return this.http.get<Movie[]>(this.baseUrl, { params });
  }

  getMovie(id_pelicula: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${id_pelicula}`);
  }

  addMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl + '/add', movie);
  }

  updateMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}`, movie);
  }
  
  deleteMovieById(idMovie: number) {
    return this.http.delete(`${this.baseUrl}/delete/${idMovie}`);
  }

  searchMovies(term: string) {
    return this.http.get<Movie[]>(`${this.baseUrl}/search/${term}`);
  }
}
