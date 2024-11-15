import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../interfaces/movie';
import { API_URL } from '../../utils/domains/URLs';

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
    return this.http.get<Movie[]>(`${this.baseUrl}/all`);
  }

  getMovie(idPelicula: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/${idPelicula}`);
  }


  addMovie(movie: Partial<Movie>): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie);
  }



  updateMovie(idPelicula: number, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${idPelicula}`, movie);
  }

  searchMovies(search: string): Observable<Movie[]> {
    const params = new HttpParams().set('search', search);

    return this.http.get<Movie[]>(this.baseUrl, { params });
  }

  updateMovieById(idPelicula: number, movie: Partial<Movie>): Observable<Movie> {
    return this.http.put<Movie>(`${this.baseUrl}/${idPelicula}`, movie);
  }

  deleteMovieById(idPelicula: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idPelicula}`);
  }
}
