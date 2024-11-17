import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowTimeRequest } from '../../interfaces/showTime';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  baseUrl = API_URL + '/shows';

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
}
