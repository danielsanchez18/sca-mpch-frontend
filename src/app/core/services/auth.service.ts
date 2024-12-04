import { Injectable } from '@angular/core';
import { URL } from '../utils/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../interfaces/login.interface';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${URL}/auth`;

  constructor(private http: HttpClient) { }

  // Método para hacer login
  // login(credentials: LoginRequest): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  // }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token); // Guarda el token en localStorage
      })
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
  }

  getCurrentUser(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }

}
