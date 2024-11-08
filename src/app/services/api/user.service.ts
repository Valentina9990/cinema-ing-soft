import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/domains/URLs';
import { Observable } from 'rxjs';
import { User } from '../../core/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  addUser(user: Omit<User, 'idUsuario' | 'fechaCreacion'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/`, user);
  }

  deleteUsers(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/`);
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  updateUserById(userId: number, user: Omit<User, 'idUsuario'>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user);
  }
}

