import { ChangeDetectionStrategy, Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univeristy-overview',
  templateUrl: './univeristy-overview.component.html',
})
export class UniveristyOverviewComponent {

  universities: University[] = []; // Array para almacenar las universidades
  totalUniversities: number = 0; // Total de universidades
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchUniversities: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(private universityService: UniversityService) { }

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

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener las universidades', error);
        this.isLoading = false;
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
          },
          error => {
            console.error('Error al eliminar la universidad', error);
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
