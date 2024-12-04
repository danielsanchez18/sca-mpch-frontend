import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { AreaUniversity, PaginatedAreaUniversities } from '../interfaces/area-university.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaUniversityService {

  private apiUrl = `${URL}/area-university`;

  constructor(private http: HttpClient) { }

  addAreaUniversity(areaUniversity: AreaUniversity): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, areaUniversity);
  }

  getAreaUniversityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getAllAreaUniversities(page: number = 0, size: number = 10): Observable<PaginatedAreaUniversities> {
    return this.http.get<PaginatedAreaUniversities>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchByAreaOrUniversity(areaName: string, universityName: string, page: number = 0, size: number = 10): Observable<PaginatedAreaUniversities> {
    return this.http.get<PaginatedAreaUniversities>(`${this.apiUrl}/search/${areaName}/${universityName}?page=${page}&size=${size}`);
  }

  deleteAreaUniversity(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  getAreasByUniversity(idUniversity: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/university/${idUniversity}?page=${page}&size=${size}`);
  }

  getUniversitiesByArea(idArea: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/area/${idArea}?page=${page}&size=${size}`);
  }

}
