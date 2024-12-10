import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${URL}/auth`;

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<void> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.saveToken(response.token)), // Guardar el token
      switchMap(response => this.getCurrentUser(response.token)), // Obtener el usuario actual
      tap(user => localStorage.setItem('userRole', user.role.name)), // Guardar el rol
      map(() => { }) // Cambiar el observable para emitir `void`
    );
  }

  // Guardar token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Obtener token del localStorage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Eliminar token (logout)
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
  }

  getCurrentUser(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }

  // Obtener el rol guardado
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

}
