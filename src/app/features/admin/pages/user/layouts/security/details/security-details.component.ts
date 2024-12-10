import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../../../../../core/services/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'security-details',
  templateUrl: './security-details.component.html',
})
export class SecurityDetailsComponent implements OnInit {

  security: any = {};

  constructor(
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idSecurity = this.route.snapshot.paramMap.get('id');
    if (idSecurity) {
      this.securityService.getSecurityById(idSecurity).subscribe(
        (response: any) => {
          this.security = response.data;
        },
        (error: any) => {
          Swal.fire('Error', 'No se pudo cargar la información del seguridad.', 'error');
        }
      );
    }
  }

  // Método para eliminar el seguridad
  deleteSecurity(idSecurity: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.securityService.deleteSecurity(idSecurity).subscribe(
          () => {
            Swal.fire('Eliminado', 'El seguridad ha sido eliminado.', 'success');
            this.router.navigate(['/admin/usuarios/seguridad']);
          },
          (error: any) => {
            Swal.fire('Error', 'No se pudo eliminar el administrador.', 'error');
          }
        );
      }
    });
  }

}
