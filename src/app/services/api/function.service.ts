import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  private baseUrl = `${API_URL}/shows`;

  constructor(private http: HttpClient) {}

  getFunctions(): any {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
}
