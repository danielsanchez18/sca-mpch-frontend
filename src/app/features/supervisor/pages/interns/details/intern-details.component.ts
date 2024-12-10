import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InternService } from '../../../../../core/services/intern.service';

@Component({
  selector: 'intern-details',
  templateUrl: './intern-details.component.html',
})
export class SupervisorInternDetailsComponent implements OnInit {

  intern: any = {}; // Objeto para almacenar los datos del practicante

  constructor(
    private internService: InternService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del practicante desde la URL
    const idIntern = this.route.snapshot.paramMap.get('id');
    if (idIntern) {
      // Llamar al servicio para obtener el practicante por su ID
      this.internService.getInternById(idIntern).subscribe(
        (response: any) => {
          this.intern = response.data; // Asignar los datos del practicante
        },
        (error: any) => {
          Swal.fire('Error', 'No se pudo cargar la información del practicante.', 'error');
        }
      );
    }
  }

  // Método para eliminar el practicante
  deleteIntern(idIntern: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Todos los registros asociados al practicante serán eliminados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.internService.deleteIntern(idIntern).subscribe(
          () => {
            Swal.fire('Eliminado', 'El practicante ha sido eliminado.', 'success');
            // Redirigir a la lista de practicantes o a otra página
            this.router.navigate(['/admin/practicantes']);  // Redirigir a la lista de practicantes
          },
          (error: any) => {
            console.error('Error al eliminar el practicante', error);
            Swal.fire('Error', 'No se pudo eliminar el practicante.', 'error');
          }
        );
      }
    });
  }


}