import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intern, PaginatedInterns } from '../interfaces/intern.interface';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private apiUrl = `${URL}/intern`;

  constructor(private http: HttpClient) { }

  addIntern(intern: Intern): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, intern);
  }

  getInternById(idIntern: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${idIntern}`);
  }

  getAllInterns(page: number = 0, size: number = 10): Observable<PaginatedInterns> {
    return this.http.get<PaginatedInterns>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchInternsByName(name: string, page: number = 0, size: number = 10): Observable<PaginatedInterns> {
    return this.http.get<PaginatedInterns>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  findInternsByArea(area: string, page: number = 0, size: number = 10): Observable<PaginatedInterns> {
    return this.http.get<PaginatedInterns>(`${this.apiUrl}/area/${area}?page=${page}&size=${size}`);
  }

  findInternsByUniversity(university: string, page: number = 0, size: number = 10): Observable<PaginatedInterns> {
    return this.http.get<PaginatedInterns>(`${this.apiUrl}/university/${university}?page=${page}&size=${size}`);
  }

  findInternsByAreaUniversity(idAreaUniversity: string, page: number = 0, size: number = 10): Observable<PaginatedInterns> {
    return this.http.get<PaginatedInterns>(`${this.apiUrl}/area-university/${idAreaUniversity}?page=${page}&size=${size}`);
  }

  getTotalInterns(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateIntern(idIntern: string, intern: Intern): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${idIntern}`, intern);
  }

  deleteIntern(idIntern: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idIntern}`);
  }
}
