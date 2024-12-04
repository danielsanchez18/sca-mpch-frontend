import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorService } from '../../../../../../../core/services/supervisor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'supervisor-details',
  templateUrl: './supervisor-details.component.html',
})
export class SupervisorDetailsComponent implements OnInit {

  supervisor: any = {}; // Objeto para almacenar los datos del supervisor

  constructor(
    private supervisorService: SupervisorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del supervisor desde la URL
    const idSupervisor = this.route.snapshot.paramMap.get('id');
    if (idSupervisor) {
      // Llamar al servicio para obtener el administrador por su ID
      this.supervisorService.getSupervisorById(idSupervisor).subscribe(
        (response: any) => {
          this.supervisor = response.data; // Asignar los datos del administrador
        },
        (error: any) => {
          Swal.fire('Error', 'No se pudo cargar la información del administrador.', 'error');
        }
      );
    }
  }

  // Método para eliminar el supervisor
  deleteSupervisor(idSupervisor: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supervisorService.deleteSupervisor(idSupervisor).subscribe(
          () => {
            Swal.fire('Eliminado', 'El supervisor ha sido eliminado.', 'success');
            // Redirigir a la lista de supervisores o a otra página
            this.router.navigate(['/admin/usuarios/supervisores']);  // Redirigir a la lista de supervisores
          },
          (error: any) => {
            console.error('Error al eliminar el supervisor', error);
            Swal.fire('Error', 'No se pudo eliminar el supervisor.', 'error');
          }
        );
      }
    });
  }

}
