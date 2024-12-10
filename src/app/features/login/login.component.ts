import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/interfaces/login.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  dni: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Manejo del formulario de login
  onSubmit(): void {
    const credentials: LoginRequest = {
      dni: this.dni,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        // Obtener el rol guardado en el localStorage
        const userRole = this.authService.getUserRole();
        console.log(userRole);

        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Has iniciado sesión correctamente como ${userRole}.`,
          confirmButtonText: 'Aceptar',
        });

        // Redirigir según el rol
        if (userRole === 'administrador') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'supervisor') {
          this.router.navigate(['/supervisor']);
        } else if (userRole === 'seguridad') {
          this.router.navigate(['/seguridad']);
        } else {
          this.router.navigate(['/']); // Ruta por defecto
        }
      },
      error: (err) => {
        // Mostrar SweetAlert personalizado en caso de error
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Las credenciales proporcionadas son incorrectas. Intente nuevamente.',
          confirmButtonText: 'Reintentar',
        });
      }
    });
  }

}
