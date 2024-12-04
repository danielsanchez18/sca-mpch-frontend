import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { PaginatedUniversities, University } from '../interfaces/university.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private apiUrl = `${URL}/university`;

  constructor(private http: HttpClient) { }

  addUniversity(university: University): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, university);
  }

  getUniversityById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getAllUniversities(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchUniversityByName(name: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  getTotalUniversities(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateUniversity(id: number, university: University): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, university);
  }

  deleteUniversity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

}
