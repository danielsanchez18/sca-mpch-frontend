import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedAssistances } from '../interfaces/assistance.interface';
import { HttpClient } from '@angular/common/http';
import { URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  private apiUrl = `${URL}/assistance`;

  constructor(private http: HttpClient) { }

  registerCheckIn(dni: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check-in?dni=${dni}`, {});
  }

  registerCheckOut(dni: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check-out?dni=${dni}`, {});
  }

  // getAssistancesByDate(date: string, page: number = 0, size: number = 10): Observable<PaginatedAssistances> {
  //   return this.http.get<PaginatedAssistances>(`${this.apiUrl}/date?date=${date}&page=${page}&size=${size}`);
  // }

  getAssistancesByDate(date: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/date?date=${date}&page=${page}&size=${size}`);
  }

  // getAssistancesByDateRange(startDate: string, endDate: string, page: number = 0, size: number = 10): Observable<PaginatedAssistances> {
  //   return this.http.get<PaginatedAssistances>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
  // }

  getAssistancesByDateRange(startDate: string, endDate: string, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/date-range?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
  }

  searchAssistancesByInternName(name: string, page: number = 0, size: number = 10): Observable<PaginatedAssistances> {
    return this.http.get<PaginatedAssistances>(`${this.apiUrl}/intern-name?name=${name}&page=${page}&size=${size}`);
  }

  findAssistancesByArea(areaName: string, page: number = 0, size: number = 10): Observable<PaginatedAssistances> {
    return this.http.get<PaginatedAssistances>(`${this.apiUrl}/area?areaName=${areaName}&page=${page}&size=${size}`);
  }

  getHoursWorkedByInternOnDate(dni: string, date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/hours-by-date?dni=${dni}&date=${date}`);
  }

}
