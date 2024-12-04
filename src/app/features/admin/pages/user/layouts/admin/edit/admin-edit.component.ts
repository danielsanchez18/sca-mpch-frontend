import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Admin } from '../../../../../../../core/interfaces/admin.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html',
})
export class AdminEditComponent implements OnInit {

  admin: any = {
    user: {
      name: '',
      lastname: '',
      dni: '',
      birthdate: '',
      status: false
    },
    password: ''
  };

  idAdmin!: string;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el idAdmin de la URL
    this.idAdmin = this.route.snapshot.paramMap.get('id')!;

    // Obtener los datos del administrador por su ID
    this.adminService.getAdminById(this.idAdmin).subscribe(
      response => {
        this.admin = response.data; // Cargar los datos del admin en el formulario

        // Si el backend devuelve la fecha en un formato completo, la convertimos al formato requerido
        if (this.admin.user.birthdate) {
          // Convertir la fecha a formato "yyyy-MM-dd"
          this.admin.user.birthdate = this.admin.user.birthdate.split('T')[0];
        }
      },
      error => {
        console.error('Error al cargar los datos del administrador', error);
      }
    );
  }

  updateAdmin(): void {
    // Convertir el estado de booleano a 1 o 0 si es necesario
    const updatedAdmin = {
      ...this.admin,
      user: {
        ...this.admin.user,
        status: this.admin.user.status ? 1 : 0 // Convertir a 1 o 0
      }
    };

    this.adminService.updateAdmin(this.idAdmin, updatedAdmin).subscribe(
      response => {
        Swal.fire('Éxito', 'El administrador ha sido actualizado correctamente.', 'success');
        this.router.navigate(['/admin/usuarios/administradores']); // Redirigir a la lista de administradores
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
