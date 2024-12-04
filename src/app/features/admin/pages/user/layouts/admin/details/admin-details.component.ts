import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../../../../../../core/services/admin.service';

@Component({
  selector: 'admin-details',
  templateUrl: './admin-details.component.html',
})
export class AdminDetailsComponent implements OnInit {

  admin: any = {}; // Objeto para almacenar los datos del administrador

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del administrador desde la URL
    const idAdmin = this.route.snapshot.paramMap.get('id');
    if (idAdmin) {
      // Llamar al servicio para obtener el administrador por su ID
      this.adminService.getAdminById(idAdmin).subscribe(
        (response: any) => {
          this.admin = response.data; // Asignar los datos del administrador
        },
        (error: any) => {
          Swal.fire('Error', 'No se pudo cargar la información del administrador.', 'error');
        }
      );
    }
  }

  // Método para eliminar el administrador
  deleteAdmin(idAdmin: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteAdmin(idAdmin).subscribe(
          () => {
            Swal.fire('Eliminado', 'El administrador ha sido eliminado.', 'success');
            // Redirigir a la lista de administradores o a otra página
            this.router.navigate(['/admin/usuarios/administradores']);  // Redirigir a la lista de administradores
          },
          (error: any) => {
            console.error('Error al eliminar el administrador', error);
            Swal.fire('Error', 'No se pudo eliminar el administrador.', 'error');
          }
        );
      }
    });
  }

}
