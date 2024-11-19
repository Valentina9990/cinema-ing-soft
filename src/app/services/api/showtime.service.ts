import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieWithShowTimes } from '../../interfaces/movieWithShowTimes';
import { ShowTimeRequest } from '../../interfaces/showTime';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  baseUrl = API_URL + '/shows';
  movieBaseUrl = `${API_URL}/movies`;

  constructor(private http: HttpClient) { }

  saveShowtime(showtime: ShowTimeRequest) : Observable<ShowTimeRequest> {
    if (showtime.id_funcion) {
      return this.http.put<ShowTimeRequest>(`${this.baseUrl}`, showtime);
    } else {
      return this.http.post<ShowTimeRequest>(this.baseUrl, showtime);
    }
  }

  deleteShowtime(showtimeId: number) : Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${showtimeId}`);
  }

  getMovies(limit: number|null = null, offset: number = 0): Observable<MovieWithShowTimes[]> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit ? limit.toString() : '');

    return this.http.get<MovieWithShowTimes[]>(this.movieBaseUrl, { params });
  }

  getMovie(id_pelicula: number): Observable<MovieWithShowTimes> {
    return this.http.get<MovieWithShowTimes>(`${this.movieBaseUrl}/get/${id_pelicula}`);
  }
}
