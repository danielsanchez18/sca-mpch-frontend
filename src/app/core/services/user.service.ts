import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient } from '@angular/common/http';
import { PaginatedUsers, User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${URL}/user`;

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, user);
  }

  getUserById(idUser: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/id/${idUser}`);
  }

  getAllUsers(page: number = 0, size: number = 10): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  searchByFullName(name: string, page: number = 0, size: number = 10): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}/name/${name}?page=${page}&size=${size}`);
  }

  getUsersByRole(idRole: number, page: number = 0, size: number = 10): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}/role/${idRole}?page=${page}&size=${size}`);
  }

  searchByDni(dni: string, page: number = 0, size: number = 10): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}/dni/${dni}?page=${page}&size=${size}`);
  }

  getUsersByStatus(status: boolean, page: number = 0, size: number = 10): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(`${this.apiUrl}/status/${status}?page=${page}&size=${size}`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  updateUser(idUser: string, user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${idUser}`, user);
  }

  deleteUser(idUser: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${idUser}`);
  }
}
