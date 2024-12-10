import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { University } from '../../../../../core/interfaces/university.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../../../../../core/services/university.service';
import { InternService } from '../../../../../core/services/intern.service';
import Swal from 'sweetalert2';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { AssistanceService } from '../../../../../core/services/assistance.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'university-details',
  templateUrl: './university-details.component.html',
})
export class UniversityDetailsComponent implements OnInit {

  university?: University;
  activeInterns: Intern[] = []; // Cambiado a lista de practicantes

  currentPage: number = 0; // Página actual (comienza desde 0)
  pageSize: number = 5; // Cantidad de elementos por página
  totalPages: number = 0; // Total de páginas
  pages: number[] = []; // Números de las páginas disponibles

  constructor(
    private internService: InternService,
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const universityId = Number(this.route.snapshot.paramMap.get('id')); // Obtén el ID de la universidad desde la URL
    this.loadUniversityDetails(universityId);
  }

  loadUniversityDetails(universityId: number): void {
    this.universityService.getUniversityById(universityId).subscribe({
      next: (university) => {
        this.university = university.data;
        this.loadActiveInterns(university.data.name, this.currentPage);
      },
      error: (err) => console.error('Error al obtener la universidad:', err),
    });
  }

  loadActiveInterns(universityName: string, page: number): void {
    this.internService.findInternsByUniversity(universityName, page, this.pageSize).subscribe({
      next: (response) => {
        // console.log('Practicantes activos:', response);
        if (response && response.data) {
          this.activeInterns = response.data.content.filter(
            (intern: Intern) => intern.user.status === true
          );
          this.totalPages = response.data.totalPages; // Total de páginas
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Crea un array de páginas
        } else {
          console.error('No se encontró la propiedad content en la respuesta.');
        }
      },
      error: (err) => console.error('Error al obtener practicantes activos:', err),
    });
  }


  goToPage(page: number): void {
    this.currentPage = page - 1; // Ajusta la página (paginación en Java comienza en 0)
    this.loadActiveInterns(this.university?.name || '', this.currentPage);
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
}
