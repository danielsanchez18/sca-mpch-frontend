import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Security } from '../../../../../../../core/interfaces/security.interface';
import { SecurityService } from '../../../../../../../core/services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'security-add',
  templateUrl: './security-add.component.html',
})
export class SecurityAddComponent {

  security: Security = {
    idSecurity: '',
    password: '',
    user: {
      idUser: '',
      role: { idRole: 3, name: 'seguridad' }, // Cambia si tienes un sistema de roles
      name: '',
      lastname: '',
      dni: '',
      createdAt: '',
      updatedAt: '',
      birthdate: '',
      photo: '',
      status: true,
    }
  };

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  addSecurity(): void {
    this.securityService.addSecurity(this.security).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.log('Respuesta del servidor al agregar el seguridad', response);
          Swal.fire('Éxito', response.message, 'success');
          this.router.navigate(['/admin/usuarios/seguridad']); // Redirigir a la lista de administradores
        } else {
          console.log('Respuesta del servidor al agregar el seguridad', response);
          Swal.fire('Error', 'No se pudo agregar el seguridad.', 'error');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al registrar seguridad:', error);
        const errorMessage = error?.error?.error || 'No se pudo agregar el seguridad.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
