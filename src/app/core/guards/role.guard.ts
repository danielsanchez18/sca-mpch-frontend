import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role']; // Obtiene el rol esperado de las rutas
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/ingresar']); // Redirige al login si no hay token
      return false;
    }

    this.authService.getCurrentUser(token).subscribe({
      next: (user) => {
        this.currentUser = user;
        if (this.currentUser.role.name !== expectedRole) {
          this.router.navigate(['/ingresar']); // Redirige si el rol no coincide
        }
      },
      error: () => {
        this.router.navigate(['/ingresar']); // Redirige si hay error
      }
    });

    return true; // Permite acceso si el rol coincide
  }
}
