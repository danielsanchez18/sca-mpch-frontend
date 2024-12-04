import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area, PaginatedAreas } from '../interfaces/area.interface';
import { HttpClient } from '@angular/common/http';
import { URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = `${URL}/area`;

  constructor(private http: HttpClient) { }

  addArea(area: Area): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, area);
  }

  getAreaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getAllAreas(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchAreaByName(name: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  getTotalAreas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateArea(id: number, area: Area): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, area);
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

}
