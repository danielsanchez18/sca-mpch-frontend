import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, PaginatedAdmins, ResponseAdmins } from '../interfaces/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${URL}/admin`;

  constructor(private http: HttpClient) { }

  addAdmin(admin: Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, admin);
  }

  getAdminById(idAdmin: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${idAdmin}`);
  }

  getAllAdmins(page: number = 0, size: number = 10): Observable<ResponseAdmins> {
    return this.http.get<ResponseAdmins>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchAdminsByName(name: string, page: number = 0, size: number = 10): Observable<ResponseAdmins> {
    return this.http.get<ResponseAdmins>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  searchAdminsByDni(dni: string, page: number = 0, size: number = 10): Observable<ResponseAdmins> {
    return this.http.get<ResponseAdmins>(`${this.apiUrl}/dni/${dni}?page=${page}&size=${size}`);
  }

  getTotalAdmins(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateAdmin(idAdmin: string, admin: Admin): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${idAdmin}`, admin);
  }

  deleteAdmin(idAdmin: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idAdmin}`);
  }
}
