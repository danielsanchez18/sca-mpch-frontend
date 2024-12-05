import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Intern } from '../../../../../../../core/interfaces/intern.interface';
import { InternService } from '../../../../../../../core/services/intern.service';
import { AssistanceService } from '../../../../../../../core/services/assistance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'intern-overview',
  templateUrl: './intern-overview.component.html',
})
export class InternOverviewComponent implements OnInit {

  interns: Intern[] = []; // Array para almacenar los practicantes
  totalInterns: number = 0; // Total de practicantes
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchInterns: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(private internService: InternService) { }

  ngOnInit(): void {
    this.getInterns(); // Obtener practicantes al iniciar el componente
  }

  // Método para obtener la lista de practicantes
  getInterns(): void {
    this.internService.getAllInterns(this.page, this.size).subscribe(
      response => {
        this.interns = response.data.content; // Asignar la lista de practicantes
        // console.log(this.interns);
        this.totalInterns = response.data.totalElements; // Total de practicantes
        this.setPagination(); // Establecer la paginación

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los practicantes', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar practicantes por nombre
  searchInternsByName(): void {
    if (this.searchInterns.trim() === '') {
      this.getInterns(); // Si no hay búsqueda, mostrar todos
    } else {
      this.internService.searchInternsByName(this.searchInterns, this.page, this.size).subscribe(
        response => {
          this.interns = response.data.content;
          this.totalInterns = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar practicantes', error);
        }
      );
    }
  }

  // Método para eliminar un practicante
  deleteIntern(idIntern: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.internService.deleteIntern(idIntern).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El practicante ha sido eliminado.', 'success');
            this.getInterns(); // Refrescar la lista después de eliminar
          },
          error => {
            console.error('Error al eliminar el practicante', error);
            Swal.fire('Error!', 'No se pudo eliminar el practicante.', 'error');
          }
        );
      } else {
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'error');
      }
    });
  }

  // Método para calcular la edad a partir de la fecha de nacimiento
  calculateAge(birthdate: string): number {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  // Método para actualizar la paginación
  setPagination(): void {
    const totalPages = Math.ceil(this.totalInterns / this.size);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getInterns(); // Obtener los practicantes para la nueva página
  }
}
