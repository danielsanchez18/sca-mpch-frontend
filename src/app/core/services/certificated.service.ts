import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedCertificateds } from '../interfaces/certificated.interface';

@Injectable({
  providedIn: 'root'
})
export class CertificatedService {

  private apiUrl = `${URL}/certificated`;

  constructor(private http: HttpClient) { }

  generateCertificate(dni: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate?dni=${dni}`, {});
  }

  getCertificateByDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${dni}`);
  }

  getAllCertificates(page: number = 0, size: number = 10): Observable<PaginatedCertificateds> {
    return this.http.get<PaginatedCertificateds>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
}
