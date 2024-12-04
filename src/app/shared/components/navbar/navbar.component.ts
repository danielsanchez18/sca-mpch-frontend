import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user.interface';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  currentUser: User | null = null;
  userName: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el token del localStorage
    const token = this.authService.getToken();

    if (token) {
      // Si existe un token, obtener los datos del usuario
      this.authService.getCurrentUser(token).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.userName = `${user.name} ${user.lastname}`; // Nombre completo
          this.userRole = user.role.name; // Rol del usuario
        },
        error: (err) => {
          console.error('Error al obtener el usuario actual', err);
        }
      });
    }
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/ingresar']);
  }

}
