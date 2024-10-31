import { Component } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-areas-edit',
  templateUrl: './areas-edit.component.html',
})
export class AdminAreasEditComponent {

  area: Area = {
    idArea: '',
    name: '',
    nro_vacancies: 0,
    hours_certified: 0,
    status: true
  };

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const areaId = this.route.snapshot.paramMap.get('id');
    if (areaId) {
      this.areaService.getAreaById(areaId).subscribe({
        next: (area) => this.area = area,
        error: () => Swal.fire('Error', 'No se pudo cargar el área', 'error')
      });
    }
  }

  updateArea(): void {
    this.areaService.updateArea(this.area.idArea!, this.area).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Área actualizada',
          text: 'El área se ha actualizado exitosamente.'
        });
        this.router.navigate(['/admin/areas/overview']);
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
            text: 'Ocurrió un error al actualizar el área. Por favor, inténtalo nuevamente.'
          });
        }
      }
    });
  }

}
