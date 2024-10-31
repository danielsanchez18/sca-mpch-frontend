import { Component } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'admin-areas-add',
  templateUrl: './areas-add.component.html',
})
export class AdminAreasAddComponent {

  area: Area = {
    name: '',
    nro_vacancies: 0,
    hours_certified: 0,
    status: true
  };

  constructor(private areaService: AreaService, private router: Router) {}

  onSubmit() {
    this.areaService.addArea(this.area).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Área registrada',
          text: 'El área se ha registrado exitosamente.'
        });
      },
      error => {
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
            text: 'Ocurrió un error al registrar el área. Por favor, inténtalo nuevamente.'
          });
        }
      }
    );
  }
}
