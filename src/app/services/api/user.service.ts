import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/domains/URLs';
import { Observable } from 'rxjs';
import { User } from '../../core/models/User.model';
import { UsersResponse } from '../../core/models/UsersResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}


  getUsers(limit: number = 10, offset: number = 0): Observable<UsersResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<UsersResponse>(this.baseUrl, { params });
  }
  

  addUser(user: Omit<User, 'idUsuario' | 'fechaCreacion'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/`, user);
  }

  deleteUser(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idUsuario}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, user);
  }
}

