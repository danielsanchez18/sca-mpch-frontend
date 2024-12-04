import { ChangeDetectionStrategy, Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'university-add',
  templateUrl: './university-add.component.html',
})
export class UniversityAddComponent {

  university: University = {
    idUniversity: 0,
    name: '',
    acronym: '',
    status: true
  }

  constructor(
    private universityService: UniversityService,
    private router: Router
  ) { }

  addUniversity(): void {
    this.universityService.addUniversity(this.university).subscribe(
      (response) => {
        Swal.fire('Éxito', 'La universidad fue registrada correctamente.', 'success');
        this.router.navigate(['/admin/universidades']);  // Redirigir a la lista de universidades
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo registrar la universidad.';
        // console.error('Error al agregar el universidad', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
