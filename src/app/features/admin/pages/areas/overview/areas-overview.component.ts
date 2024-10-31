import { Component } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-areas-overview',
  templateUrl: './areas-overview.component.html',
})
export class AdminAreasOverviewComponent {

  areas: Area[] = [];
  totalAreas: number = 0;
  searchName: string = '';
  page: number = 1;
  size: number = 10;

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.loadAreas();
    this.getTotalAreas();
  }

  loadAreas(): void {
    this.areaService.getAllAreas(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar las áreas. Intente nuevamente.', 'error');
      }
    });
  }

  getTotalAreas(): void {
    this.areaService.getTotalAreas().subscribe({
      next: (total) => {
        this.totalAreas = total;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo obtener el número total de áreas.', 'error');
      }
    });
  }

  searchArea(): void {
    if (this.searchName.trim()) {
      this.areaService.searchAreaByName(this.searchName).subscribe({
        next: (areas) => {
          this.areas = areas;
          if (areas.length === 0) {
            Swal.fire('No encontrado', 'No se encontraron áreas con ese nombre.', 'info');
          }
        },
        error: () => {
          Swal.fire('Error', 'Hubo un problema al buscar el área. Intente nuevamente.', 'error');
        }
      });
    } else {
      this.loadAreas(); // Volver a cargar todas las áreas si no hay búsqueda
    }
  }

  deleteArea(idArea: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaService.deleteArea(idArea).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El área ha sido eliminada correctamente.', 'success');
            this.loadAreas(); // Recargar la lista de áreas después de eliminar
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el área. Intente nuevamente.', 'error');
          }
        });
      }
    });
  }
}
