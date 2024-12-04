import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { PaginatedSupervisors, Supervisor } from '../interfaces/supervisor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  private apiUrl = `${URL}/supervisor`;

  constructor(private http: HttpClient) { }

  addSupervisor(supervisor: Supervisor): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, supervisor);
  }

  getSupervisorById(idSupervisor: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${idSupervisor}`);
  }

  getAllSupervisors(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchSupervisorsByName(name: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  searchSupervisorsByDni(dni: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dni/${dni}?page=${page}&size=${size}`);
  }

  searchSupervisorsByArea(area: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/area/${area}?page=${page}&size=${size}`);
  }

  getTotalSupervisors(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateSupervisor(idSupervisor: string, supervisor: Supervisor): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${idSupervisor}`, supervisor);
  }

  deleteSupervisor(idSupervisor: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idSupervisor}`);
  }
}
