import { Component } from '@angular/core';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { InternService } from '../../../../../core/services/intern.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-interns-overview',
  templateUrl: './interns-overview.component.html',
})
export class AdminInternsOverviewComponent {

  interns: Intern[] = [];
  totalinterns: number = 0;
  searchName: string = '';
  page: number = 1;
  size: number = 10;

  constructor(private internService: InternService) { }

  ngOnInit(): void {
    this.loadInterns();
    this.getTotalInterns();
  }

  loadInterns(): void {
    this.internService.getAllInterns(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.interns = data;
      }
    });
  }

  getTotalInterns(): void {
    this.internService.getTotalInterns().subscribe({
      next: (total) => {
        this.totalinterns = total;
      }
    });
  }

  searchIntern(): void {
    if (this.searchName.trim()) {
      this.internService.getInternsByName(this.searchName).subscribe({
        next: (interns) => {
          this.interns = interns;
          if (interns.length === 0) {
            Swal.fire('No encontrado', 'No se encontraron practicantes con ese nombre.', 'info');
          }
        },
        error: () => {
          Swal.fire('Error', 'Hubo un problema al buscar el practicante. Intente nuevamente.', 'error');
        }
      });
    } else {
      this.loadInterns();
    }
  }

  deleteinter(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar un practicante. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.internService.deleteIntern(id).subscribe({
          next: () => {
            this.loadInterns();
            this.getTotalInterns();
            Swal.fire('Eliminado', 'El practicante ha sido eliminada con éxito.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el practicante. Intente nuevamente.', 'error');
          }
        });
      }
    });
  }
}
