import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { PaginatedRoles, Role } from '../interfaces/role.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${URL}/role`;

  constructor(private http: HttpClient) { }

  addRole(role: Role): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, role);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${id}`);
  }

  getAllRoles(page: number = 0, size: number = 10): Observable<PaginatedRoles> {
    return this.http.get<PaginatedRoles>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getTotalRoles(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateRole(id: number, role: Role): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
