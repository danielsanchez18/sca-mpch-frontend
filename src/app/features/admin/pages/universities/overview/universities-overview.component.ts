import { Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-universities-overview',
  templateUrl: './universities-overview.component.html',
})
export class AdminUniversitiesOverviewComponent {

  universities: University[] = [];
  totalUniversities: number = 0;
  searchName: string = '';
  page: number = 1;
  size: number = 10;

  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.loadUniversities();
    this.getTotalUniversities();
  }

  loadUniversities(): void {
    this.universityService.getAllUniversities(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.universities = data;
      }
    });
  }

  getTotalUniversities(): void {
    this.universityService.getTotalUniversities().subscribe({
      next: (total) => {
        this.totalUniversities = total;
      }
    });
  }

  searchUniversity(): void {
    if (this.searchName.trim()) {
      this.universityService.searchUniversities(this.searchName).subscribe({
        next: (universities) => {
          this.universities = universities;
          if (universities.length === 0) {
            Swal.fire('No encontrado', 'No se encontraron universidades con ese nombre.', 'info');
          }
        },
        error: () => {
          Swal.fire('Error', 'Hubo un problema al buscar la universidad. Intente nuevamente.', 'error');
        }
      });
    } else {
      this.loadUniversities();
    }
  }

  deleteUniversity(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar una universidad. Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.universityService.deleteUniversity(id).subscribe({
          next: () => {
            this.loadUniversities();
            this.getTotalUniversities();
            Swal.fire('Eliminado', 'La universidad ha sido eliminada con éxito.', 'success');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la universidad. Intente nuevamente.', 'error');
          }
        });
      }
    });
  }
}
