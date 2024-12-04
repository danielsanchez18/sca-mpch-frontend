import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../../../../core/services/admin.service';
import { Admin, PaginatedAdmins, ResponseAdmins } from '../../../../../../../core/interfaces/admin.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-overview',
  templateUrl: './admin-overview.component.html',
})
export class AdminOverviewComponent implements OnInit {

  admins: Admin[] = []; // Array para almacenar los administradores
  totalAdmins: number = 0; // Total de administradores
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchAdmins: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAdmins(); // Obtener administradores al iniciar el componente
  }

  // Método para obtener la lista de administradores
  getAdmins(): void {
    this.adminService.getAllAdmins(this.page, this.size).subscribe(
      response => {
        this.admins = response.data.content; // Asignar la lista de administradores
        this.totalAdmins = response.data.totalElements; // Total de administradores
        this.setPagination(); // Establecer la paginación

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener los administradores', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar administradores por nombre
  searchAdminsByName(): void {
    if (this.searchAdmins.trim() === '') {
      this.getAdmins(); // Si no hay búsqueda, mostrar todos
    } else {
      this.adminService.searchAdminsByName(this.searchAdmins, this.page, this.size).subscribe(
        response => {
          this.admins = response.data.content;
          this.totalAdmins = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar administradores', error);
        }
      );
    }
  }

  deleteAdmin(idAdmin: string): void {
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
        this.adminService.deleteAdmin(idAdmin).subscribe(
          () => {
            Swal.fire('Eliminado!', 'El administrador ha sido eliminado.', 'success');
            this.getAdmins(); // Refrescar la lista después de eliminar
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
    const totalPages = Math.ceil(this.totalAdmins / this.size);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getAdmins(); // Obtener los administradores para la nueva página
  }

}
