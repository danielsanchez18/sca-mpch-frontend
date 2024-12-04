import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'areas-add',
  templateUrl: './areas-add.component.html',
})
export class AreasAddComponent {

  area: Area = {
    idArea: 0,
    name: '',
    nroVacancies: 0,
    status: true
  }

  constructor(
    private areaService: AreaService,
    private router: Router
  ) { }

  addArea(): void {
    this.areaService.addArea(this.area).subscribe(
      (response) => {
        Swal.fire('Éxito', 'El área fue registrada correctamente.', 'success');
        this.router.navigate(['/admin/areas']);  // Redirigir a la lista de supervisores
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo registrar el área.';
        // console.error('Error al agregar el administrador', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }


}
