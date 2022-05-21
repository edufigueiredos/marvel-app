import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { APIResponse } from '../../models/api-response.model';

@Injectable()
export class CharactersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(offset = 0, limit = 20): Observable<APIResponse> {
    const params = new HttpParams()
      .set('offset', offset)
      .set('limit', limit);
    return this.http.get<APIResponse>(`${this.apiUrl}/characters`, { params: params });
  }

  getById(id: number): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${this.apiUrl}/characters/${id}`)
  }

  getByName(name: string): Observable<APIResponse> {
    const params = new HttpParams().set('nameStartsWith', name);
    return this.http.get<APIResponse>(`${this.apiUrl}/characters`, { params: params })
  }
}
