import { Injectable } from '@angular/core';
import { BASE_URL } from '../utils/helper';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Area } from '../interfaces/area.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url = `${BASE_URL}/area`;

  constructor(private http: HttpClient) { }

  addArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${this.url}/add`, area);
  }

  getAreaById(id: string): Observable<Area> {
    return this.http.get<Area>(`${this.url}/id/${id}`);
  }

  updateArea(id: string, area: Area): Observable<any> {
    return this.http.put(`${this.url}/update/${id}`, area);
  }

  getAllAreas(page: number, size: number): Observable<Area[]> {
    return this.http.get<{ content: Area[] }>(`${this.url}/all?page=${page}&size=${size}`)
      .pipe(
        map(response => response.content) // Extrae solo el array de áreas
      );
  }

  searchAreaByName(name: string): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.url}/search/${name}`);
  }

  getTotalAreas(): Observable<number> {
    return this.http.get<number>(`${this.url}/total`);
  }

  deleteArea(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

}
