import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'areas-overview',
  templateUrl: './areas-overview.component.html',
})
export class AreasOverviewComponent implements OnInit {

  areas: Area[] = []; // Array para almacenar las áreas
  totalAreas: number = 0; // Total de áreas
  page: number = 0; // Página actual
  size: number = 10; // Tamaño de la página
  pages: number[] = []; // Páginas para la paginación
  currentPage: number = 1;
  searchAreas: string = ''; // Valor de búsqueda

  isLoading: boolean = true;

  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.getAreas(); // Obtener áreas al iniciar el componente
  }

  // Método para obtener la lista de áreas
  getAreas(): void {
    this.areaService.getAllAreas(this.page, this.size).subscribe(
      response => {
        this.areas = response.data.content; // Asignar la lista de áreas
        this.totalAreas = response.data.totalElements; // Total de áreas
        this.setPagination(); // Establecer la paginación

        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener las áreas', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar áreas por nombre
  searchAreasByName(): void {
    if (this.searchAreas.trim() === '') {
      this.getAreas(); // Si no hay búsqueda, mostrar todos
    } else {
      this.areaService.searchAreaByName(this.searchAreas, this.page, this.size).subscribe(
        response => {
          this.areas = response.data.content;
          this.totalAreas = response.data.totalElements;
          this.setPagination();
        },
        error => {
          console.error('Error al buscar áreas', error);
        }
      );
    }
  }

  // Método para establecer la paginación
  setPagination(): void {
    this.pages = Array.from({ length: this.areas.length }, (_, i) => i + 1);
  }

  // Método para eliminar un área
  deleteArea(idArea: number): void {
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
        this.areaService.deleteArea(idArea).subscribe(
          response => {
            Swal.fire('¡Eliminado!', 'El área ha sido eliminada', 'success');
            this.getAreas(); // Actualizar la lista de áreas
          },
          error => {
            console.error('Error al eliminar el área', error);
          }
        );
      }
    });
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getAreas(); // Obtener los administradores para la nueva página
  }


}
