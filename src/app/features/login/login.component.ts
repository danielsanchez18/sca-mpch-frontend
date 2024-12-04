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
  ) { }

  // Manejo del formulario de login
  onSubmit(): void {
    const credentials: LoginRequest = {
      dni: this.dni,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Guardamos el token
        this.authService.saveToken(response.token);

        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          confirmButtonText: 'Aceptar',
        });

        // Redirigimos al usuario a la página principal o al destino que prefieras
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        // this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';

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
