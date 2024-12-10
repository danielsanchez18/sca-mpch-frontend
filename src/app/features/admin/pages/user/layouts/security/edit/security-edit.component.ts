import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../../../../../core/services/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'security-edit',
  templateUrl: './security-edit.component.html',
})
export class SecurityEditComponent implements OnInit {

  security: any = {
    user: {
      name: '',
      lastname: '',
      dni: '',
      birthdate: '',
      status: false
    },
    password: ''
  };

  idSecurity!: string;

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el idSecurity de la URL
    this.idSecurity = this.route.snapshot.paramMap.get('id')!;

    // Obtener los datos del seguridad por su ID
    this.securityService.getSecurityById(this.idSecurity).subscribe(
      response => {
        this.security = response.data;

        if (this.security.user.birthdate) {
          // Convertir la fecha a formato "yyyy-MM-dd"
          this.security.user.birthdate = this.security.user.birthdate.split('T')[0];
        }
      },
      error => {
        console.error('Error al cargar los datos del seguridad', error);
      }
    );
  }

  updatedSecurity(): void {
    // Convertir el estado de booleano a 1 o 0 si es necesario
    const updatedSecurity = {
      ...this.security,
      user: {
        ...this.security.user,
        status: this.security.user.status ? 1 : 0 // Convertir a 1 o 0
      }
    };

    this.securityService.updateSecurity(this.idSecurity, updatedSecurity).subscribe(
      response => {
        Swal.fire('Éxito', 'El seguridad ha sido actualizado correctamente.', 'success');
        this.router.navigate(['/admin/usuarios/seguridad']); // Redirigir a la lista de seguridad
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo agregar el seguridad.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }


}
