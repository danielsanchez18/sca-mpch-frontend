import { Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from '../../../../../core/services/university.service';
import { InternService } from '../../../../../core/services/intern.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-universities-details',
  templateUrl: './universities-details.component.html',
})
export class AdminUniversitiesDetailsComponent {

  university: University | null = null;
  interns: Intern[] = [];
  totalResults: number = 0;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private universityService: UniversityService,
    private internService: InternService
  ) {}

  ngOnInit(): void {
    const idUniversity = this.route.snapshot.paramMap.get('idUniversity');
    if (idUniversity) {
      this.universityService.getUniversityById(idUniversity).subscribe(
        (universityData) => {
          this.university = universityData;
        },
        (error) => {
          console.error('Error al obtener los detalles de la universidad:', error);
        }
      );
    } else {
      console.error('ID de universidad no encontrado en la URL.');
    }
  }


  getInternsByUniversity(universityName: string): void {
    this.internService.getInternsByUniversity(universityName).subscribe({
      next: (response) => {
        this.interns = response;
        this.totalResults = response.length;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la lista de practicantes.', 'error');
      },
    });
  }

  searchInterns(): void {
    if (this.searchQuery.trim()) {
      this.internService.getInternsByName(this.searchQuery).subscribe({
        next: (response) => {
          // this.interns = response;
          // this.totalResults = response;
        },
        error: () => {
          Swal.fire('Error', 'No se pudo realizar la búsqueda.', 'error');
        },
      });
    } else {
      this.getInternsByUniversity(this.university?.name || '');
    }
  }

  editUniversity(): void {
    this.router.navigate(['../editar', this.university?.idUniversity], { relativeTo: this.route });
  }

  editIntern(id: string): void {
    this.router.navigate(['/admin/usuario/editar', id]);
  }

  deleteIntern(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el practicante de la universidad.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.internService.deleteIntern(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El practicante ha sido eliminado.', 'success');
            this.getInternsByUniversity(this.university?.name || '');
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el practicante.', 'error');
          },
        });
      }
    });
  }
}
