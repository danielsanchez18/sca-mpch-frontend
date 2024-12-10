import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AreaUniversity } from '../../../../../core/interfaces/area-university.interface';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { InternService } from '../../../../../core/services/intern.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'work-areas-details',
  templateUrl: './work-areas-details.component.html',
})
export class WorkAreasDetailsComponent {

  areaUniversity?: AreaUniversity; // Aquí guardaremos los detalles del área de universidad
  activeInterns: Intern[] = []; // Lista de practicantes activos

  currentPage: number = 0; // Página actual (comienza desde 0)
  pageSize: number = 5; // Cantidad de elementos por página
  totalPages: number = 0; // Total de páginas
  pages: number[] = []; // Números de las páginas disponibles


  constructor(
    private areaUniversityService: AreaUniversityService,
    private internService: InternService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Obtener el ID del AreaUniversity desde la URL
    const areaUniversityId = this.route.snapshot.paramMap.get('id');
    if (areaUniversityId) {
      this.loadAreaUniversityDetails(areaUniversityId);
    }
  }

  loadAreaUniversityDetails(id: string): void {
    this.areaUniversityService.getAreaUniversityById(id).subscribe({
      next: (response) => {
        this.areaUniversity = response.data; // Guardamos la información de AreaUniversity
        // Llamar a otro método si necesitas cargar los practicantes de esta área
        this.loadActiveInterns(id, this.currentPage);
      },
      error: (err) => console.error('Error al obtener los detalles del área de universidad:', err),
    });
  }


  loadActiveInterns(idAreaUniversity: string, page: number): void {
    console.log('AreaUniversity ID:', idAreaUniversity);  // Agrega este log para depurar
    this.internService.findInternsByAreaUniversity(idAreaUniversity, page, this.pageSize).subscribe({
      next: (response) => {
        console.log('Practicantes activos:', response);
        if (response && response.data && response.data.content.length > 0) {
          this.activeInterns = response.data.content.filter(
            (intern: Intern) => intern.user.status === true
          );
          this.totalPages = response.data.totalPages; // Total de páginas
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Crea un array de páginas
        } else {
          console.log('No se encontraron practicantes activos.');
          this.activeInterns = [];
        }
      },
      error: (err) => console.error('Error al obtener practicantes activos:', err),
    });
  }


  goToPage(page: number): void {
    this.currentPage = page - 1; // Ajusta la página (paginación en Java comienza en 0)
    this.loadActiveInterns(this.areaUniversity?.idAreaUniversity || '', this.currentPage);
  }

  // Método para eliminar una universidad
  deleteAreaUniversity(idAreaUniversity: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer, se eliminarán todos los registros relacionados',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaUniversityService.deleteAreaUniversity(idAreaUniversity).subscribe(
          response => {
            Swal.fire('¡Eliminado!', 'La relacion ha sido eliminada', 'success');
            this.router.navigate(['/admin/areas-laborales']);
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

}
