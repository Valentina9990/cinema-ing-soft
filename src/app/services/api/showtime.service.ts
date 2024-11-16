import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShowTime } from '../../interfaces/showTime';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {
  baseUrl = API_URL + '/shows';

  constructor(private http: HttpClient) { }

  saveShowtime(showtime: ShowTime) : Observable<ShowTime> {
    return this.http.post<ShowTime>(this.baseUrl, showtime);
  }
}
