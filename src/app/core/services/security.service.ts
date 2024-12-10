import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSecurities, Security } from '../interfaces/security.interface';
import { URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl = `${URL}/security`;

  constructor(private http: HttpClient) { }

  addSecurity(security: Security): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, security);
  }

  getSecurityById(idSecurity: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${idSecurity}`);
  }

  getAllSecurities(page: number = 0, size: number = 10): Observable<ResponseSecurities> {
    return this.http.get<ResponseSecurities>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchSecuritiesByName(name: string, page: number = 0, size: number = 10): Observable<ResponseSecurities> {
    return this.http.get<ResponseSecurities>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  searchSecuritiesByDni(dni: string, page: number = 0, size: number = 10): Observable<ResponseSecurities> {
    return this.http.get<ResponseSecurities>(`${this.apiUrl}/dni/${dni}?page=${page}&size=${size}`);
  }

  getTotalSecurities(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateSecurity(idSecurity: string, security: Security): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${idSecurity}`, security);
  }

  deleteSecurity(idSecurity: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idSecurity}`);
  }

}
