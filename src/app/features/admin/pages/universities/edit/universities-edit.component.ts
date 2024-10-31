import { Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-universities-edit',
  templateUrl: './universities-edit.component.html',
})
export class AdminUniversitiesEditComponent {

  university: University = {
    idUniversity: '',
    name: '',
    acronym: '',
    photo: '',
    status: true
  }

  constructor(
    private universityService: UniversityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const universityId = this.route.snapshot.paramMap.get('id');
    if (universityId) {
      this.universityService.getUniversityById(universityId).subscribe({
        next: (university) => this.university = university,
        error: () => Swal.fire('Error', 'No se pudo cargar la universidad', 'error')
      });
    }
  }

  updateUniversity(): void {
    this.universityService.updateUniversity(this.university.idUniversity!, this.university).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Universidad actualizada',
          text: 'La universidad se ha actualizado exitosamente.'
        });
        this.router.navigate(['/admin/universities/overview']);
      },
      error: (error) => {
        if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar la universidad. Por favor, inténtalo nuevamente.'
          });
        }
      }
    });
  }

}
