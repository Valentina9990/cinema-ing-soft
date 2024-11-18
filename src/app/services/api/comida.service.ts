import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../utils/domains/URLs';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  private apiUrl = `${API_URL}/meal`;

  constructor(private http: HttpClient) {}

  // Obtener todas las comidas
  getAllComidas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getall`);
  }

  // Obtener comidas paginadas
  getComidasPaginadas(limit: number, offset: number): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get(`${this.apiUrl}/page`, { params });
  }

  // Agregar una comida
  addComida(comida: { nombreComida: string; precioComida: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, comida);
  }

  // Actualizar una comida
  updateComida(comida: { idComida: number; nombreComida: string; precioComida: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, comida);
  }

  // Actualizar varias comidas
  updateManyComidas(nombreComida: string, precioComida: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateMany`, { nombreComida, precioComida });
  }

  // Eliminar una comida por su ID
  deleteComida(idComida: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${idComida}`);
  }

  // Obtener una comida por su ID
  getComidaById(idComida: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${idComida}`);
  }
}

