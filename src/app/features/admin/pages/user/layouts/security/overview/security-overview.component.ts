import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Security } from '../../../../../../../core/interfaces/security.interface';
import { SecurityService } from '../../../../../../../core/services/security.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'security-overview',
  templateUrl: './security-overview.component.html',
})
export class SecurityOverviewComponent {

  securities: Security[] = []; // Array para almacenar los administradores
  totalSecurities: number = 0; // Total de administradores
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchSecurities: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSecurities(); // Obtener administradores al iniciar el componente
  }

  // Método para obtener la lista de administradores
  getSecurities(): void {
    this.securityService.getAllSecurities(this.page, this.size).subscribe(
      response => {
        this.securities = response.data.content; // Asignar la lista de administradores
        this.totalSecurities = response.data.totalElements; // Total de administradores
        this.setPagination(); // Establecer la paginación

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los seguridades', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar administradores por nombre
  searchSecuritiesByName(): void {
    if (this.searchSecurities.trim() === '') {
      this.getSecurities(); // Si no hay búsqueda, mostrar todos
    } else {
      this.securityService.searchSecuritiesByName(this.searchSecurities, this.page, this.size).subscribe(
        response => {
          this.securities = response.data.content;
          this.totalSecurities = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar seguridad', error);
        }
      );
    }
  }

  deleteSecurity(idSecurity: string): void {
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
        this.securityService.deleteSecurity(idSecurity).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El seguridad ha sido eliminado.', 'success');
            this.getSecurities(); // Refrescar la lista después de eliminar
            this.router.navigate(['/admin/usuarios/seguridad']);
          },
          error => {
            console.error('Error al eliminar el seguridad', error);
            Swal.fire('Error!', 'No se pudo eliminar el seguridad.', 'error');
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
    const totalPages = Math.ceil(this.totalSecurities / this.size);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getSecurities(); // Obtener los administradores para la nueva página
  }

}
