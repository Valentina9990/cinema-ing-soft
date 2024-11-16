import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../../interfaces/room';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  BASE_URL = API_URL + '/room';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.BASE_URL + '/getall');
  }
}
