import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Supervisor } from '../../../../../../../core/interfaces/supervisor.interface';
import { SupervisorService } from '../../../../../../../core/services/supervisor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'supervisor-overview',
  templateUrl: './supervisor-overview.component.html',
})
export class SupervisorOverviewComponent implements OnInit {

  supervisors: Supervisor[] = []; // Array para almacenar los supervisores
  totalSupervisors: number = 0; // Total de supervisores
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchSupervisors: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(private supervisorService: SupervisorService) { }

  ngOnInit(): void {
    this.getSupervisors(); // Obtener supervisores al iniciar el componente
  }

  // Método para obtener la lista de supervisores
  getSupervisors(): void {
    this.supervisorService.getAllSupervisors(this.page, this.size).subscribe(
      response => {
        this.supervisors = response.data.content; // Asignar la lista de supervisores
        this.totalSupervisors = response.data.totalElements; // Total de supervisores
        this.setPagination(); // Establecer la paginación

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los supervisores', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar supervisores por nombre
  searchSupervisorsByName(): void {
    if (this.searchSupervisors.trim() === '') {
      this.getSupervisors(); // Si no hay búsqueda, mostrar todos
    } else {
      this.supervisorService.searchSupervisorsByName(this.searchSupervisors, this.page, this.size).subscribe(
        response => {
          this.supervisors = response.data.content;
          this.totalSupervisors = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar supervisores', error);
        }
      );
    }
  }

  deleteSupervisor(idSupervisor: string): void {
    // Mostrar SweetAlert para confirmar la eliminación
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
        // Si el usuario confirma, proceder con la eliminación
        this.supervisorService.deleteSupervisor(idSupervisor).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El administrador ha sido eliminado.', 'success');
            this.getSupervisors(); // Refrescar la lista después de eliminar
          },
          error => {
            console.error('Error al eliminar el administrador', error);
            Swal.fire('Error!', 'No se pudo eliminar el administrador.', 'error');
          }
        );
      } else {
        // Si el usuario cancela, no hacer nada
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
    const totalPages = Math.ceil(this.totalSupervisors / this.size);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getSupervisors(); // Obtener los administradores para la nueva página
  }


}
