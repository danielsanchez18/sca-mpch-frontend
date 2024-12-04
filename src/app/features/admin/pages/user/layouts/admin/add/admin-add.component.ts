import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Admin } from '../../../../../../../core/interfaces/admin.interface';
import { AdminService } from '../../../../../../../core/services/admin.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-add',
  templateUrl: './admin-add.component.html',
})
export class AdminAddComponent {

  admin: Admin = {
    idAdmin: '',
    password: '',
    user: {
      idUser: '',
      role: { idRole: 1, name: 'ADMIN' }, // Cambia si tienes un sistema de roles
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
      private adminService: AdminService,
      private router: Router
    ) { }

  ngOnInit(): void {}

  // Método para agregar un administrador
  addAdmin(): void {
    this.adminService.addAdmin(this.admin).subscribe(
      (response: any) => {
        // Comprobar el estado de la respuesta
        if (response && response.message) {
          // Mostrar mensaje de éxito
          Swal.fire('Éxito', response.message, 'success');
          this.router.navigate(['/admin/usuarios/administradores']); // Redirigir a la lista de administradores
        } else {
          // Mostrar mensaje de error si la respuesta no tiene mensaje esperado
          Swal.fire('Error', 'No se pudo agregar el administrador.', 'error');
        }
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo agregar el administrador.';
        // console.error('Error al agregar el administrador', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }


}
