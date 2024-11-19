import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/domains/URLs';
import { Observable } from 'rxjs';
import { Cine } from '../../core/models/Cine.model';
import { CineResponse } from '../../core/models/CineResponse.model';
@Injectable({
  providedIn: 'root'
})
export class CineService {
  private baseUrl = `${API_URL}/cines`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de cines con paginación.
   * @param limit Cantidad máxima de cines por página.
   * @param offset Inicio de la paginación.
   * @returns Observable con la respuesta de los cines.
   */
  getCines(limit: number = 10, offset: number = 0): Observable<CineResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get<CineResponse>(this.baseUrl, { params });
  }

  /**
   * Agrega un nuevo cine.
   * @param cine Datos del cine a agregar.
   * @returns Observable con el cine agregado.
   */
  addCine(cine: Omit<Cine, 'idCine'>): Observable<Cine> {
    return this.http.post<Cine>(`${this.baseUrl}/`, cine);
  }

  /**
   * Elimina un cine por su ID.
   * @param idCine Identificador del cine a eliminar.
   * @returns Observable con la respuesta de la operación.
   */
  deleteCine(idCine: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idCine}`);
  }

  /**
   * Actualiza la información de un cine.
   * @param cine Datos del cine a actualizar.
   * @returns Observable con la respuesta de la operación.
   */
  updateCine(cine: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, cine);
  }
}
