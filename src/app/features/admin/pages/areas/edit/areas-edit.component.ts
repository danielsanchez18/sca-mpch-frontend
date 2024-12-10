import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../../../core/services/area.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'areas-edit',
  templateUrl: './areas-edit.component.html',
})
export class AreasEditComponent implements OnInit {

  area: any = {
    name: '',
    nroVacancies: 0,
    status: true
  }

  idArea!: number;

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Obtener el idArea de la URL
    const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.idArea = Number(id); // O usar parseInt(id, 10);
    }

    // Obtener los datos del área por su ID
    this.areaService.getAreaById(this.idArea).subscribe(
      response => {
        this.area = response.data; // Cargar los datos del área en el formulario
      },
      error => {
        console.error('Error al cargar los datos del área', error);
      }
    )
  }

  updateArea(): void {
    // Convertir el estado de booleano a 1 o 0 si es necesario
    const updatedArea = {
      ...this.area,
      status: this.area.status ? 1 : 0 // Convertir a 1 o 0
    }

    this.areaService.updateArea(this.idArea, updatedArea).subscribe(
      response => {
        Swal.fire('Éxito', 'El área ha sido actualizada correctamente.', 'success');
        this.router.navigate(['/admin/areas']);
      },
      (error: HttpErrorResponse) => {
        const errorMessage = error?.error?.error || 'No se actulaizar el área.';
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
