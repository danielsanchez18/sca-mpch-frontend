import { ChangeDetectionStrategy, Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { InternService } from '../../../../../core/services/intern.service';

@Component({
  selector: 'univeristy-overview',
  templateUrl: './univeristy-overview.component.html',
})
export class SupervisorUniveristyOverviewComponent {

  universities: any[] = []; // Array para almacenar las universidades
  totalUniversities: number = 0; // Total de universidades
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchUniversities: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  countInterns: number = 0; // Número de practicantes

  constructor(
    private universityService: UniversityService,
    private internService: InternService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUniversities(); // Obtener universidades al iniciar el componente
  }

  // Método para obtener la lista de universidades
  getUniversities(): void {
    this.universityService.getAllUniversities(this.page, this.size).subscribe(
      response => {
        this.universities = response.data.content; // Asignar la lista de universidades
        this.totalUniversities = response.data.totalElements; // Total de universidades
        this.setPagination(); // Establecer la paginación

        // Inicializar internCount en 0 para cada universidad
        this.universities.forEach((university: any) => {
          university['internCount'] = 0; // Agregar internCount dinámicamente
        });

        // Obtener el número de practicantes por cada universidad
        this.universities.forEach((university) => {
          this.getInternsCount(university); // Obtener el número de practicantes para cada universidad
        });

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener las universidades', error);
        this.isLoading = false;
      }
    );
  }

  // Método para obtener el número de practicantes asociados a una universidad
  getInternsCount(university: any): void {
    this.internService.findInternsByUniversity(university.name, this.page, this.size).subscribe(
      response => {
        // Actualizar el número de practicantes para esta universidad
        const internCount = response.data.totalElements; // Número de practicantes
        university['internCount'] = internCount; // Establecer el valor en el objeto universidad

        // console.log('Practicantes para la universidad', university.name, university['internCount']);
      },
      error => {
        console.error('Error al obtener los practicantes', error);
      }
    );
  }

  // Método para buscar universidades por nombre
  searchUniversitiesByName(): void {
    if (this.searchUniversities.trim() === '') {
      this.getUniversities(); // Si no hay búsqueda, mostrar todos
    } else {
      this.universityService.searchUniversityByName(this.searchUniversities, this.page, this.size).subscribe(
        response => {
          this.universities = response.data.content;
          this.totalUniversities = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar universidades', error);
        }
      );
    }
  }

  // Método para establecer la paginación
  setPagination(): void {
    this.pages = Array.from({ length: Math.ceil(this.totalUniversities / this.size) }, (_, i) => i + 1);
  }

  // Método para eliminar una universidad
  deleteUniversity(idUniversity: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.universityService.deleteUniversity(idUniversity).subscribe(
          response => {
            Swal.fire('¡Eliminado!', 'La universidad ha sido eliminada', 'success');
            this.getUniversities(); // Actualizar la lista de universidades
            this.router.navigate(['/admin/universidades']);
          },
          (error: HttpErrorResponse) => {
            // Revisar si el error tiene un mensaje de error desde el backend
            const errorMessage = error?.error?.error || 'No se pudo eliminar la universidad.';
            // console.error('Error al agregar el administrador', error);
            Swal.fire('Error', errorMessage, 'error');
          }
        );
      }
    });
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getUniversities(); // Obtener las universidades para la nueva página
  }

}
