import { Component } from '@angular/core';
import { University } from '../../../../../core/interfaces/university.interface';
import { UniversityService } from '../../../../../core/services/university.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-universities-add',
  templateUrl: './universities-add.component.html',
})
export class AdminUniversitiesAddComponent {

  university: University = {
    idUniversity: '',
    name: '',
    acronym: '',
    photo: 'photo.png',
    status: true
  };

  constructor(private universityService: UniversityService) {}

  onSubmit() {
    this.universityService.saveUniversity(this.university).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Universidad registrada',
          text: 'La universidad se ha registrado exitosamente.'
        })
      },
      error => {
        if (error.error && error.error.message) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al registrar la universidad. Por favor, inténtalo nuevamente.'
          })
        }
      }
    )
  }
}
