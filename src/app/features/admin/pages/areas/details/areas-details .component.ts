import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Area } from '../../../../../core/interfaces/area.interface';
import { AreaService } from '../../../../../core/services/area.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Supervisor } from '../../../../../core/interfaces/supervisor.interface';
import { Intern } from '../../../../../core/interfaces/intern.interface';
import { SupervisorService } from '../../../../../core/services/supervisor.service';
import { InternService } from '../../../../../core/services/intern.service';
import { UniversityService } from '../../../../../core/services/university.service';
import { AreaUniversityService } from '../../../../../core/services/area-university.service';
import { University } from '../../../../../core/interfaces/university.interface';
import { AssistanceService } from '../../../../../core/services/assistance.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'areas-details',
  templateUrl: './areas-details .component.html',
})
export class AreasDetailsComponent implements OnInit {

  area?: Area;
  universities: any[] = [];
  supervisor!: Supervisor;
  activeInterns: Intern[] = []; // Cambiado a lista de practicantes
  universitiesCount: number = 0;

  currentPage: number = 0; // Página actual (comienza desde 0)
  pageSize: number = 5; // Cantidad de elementos por página
  totalPages: number = 0; // Total de páginas
  pages: number[] = []; // Números de las páginas disponibles

  assistances: any[] = [];
  totalAssistances: number = 0; // Total de asistencias

  constructor(
    private areaService: AreaService,
    private supervisorService: SupervisorService,
    private internService: InternService,
    private areaUniversityService: AreaUniversityService,
    private assistanceService: AssistanceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const areaId = Number(this.route.snapshot.paramMap.get('id')); // Obtén el ID del área desde la URL
    this.loadAreaDetails(areaId);
  }

  loadAreaDetails(areaId: number): void {
    this.areaService.getAreaById(areaId).subscribe({
      next: (area) => {
        this.area = area.data;
        this.loadSupervisor(area.data.name);
        this.loadActiveInterns(area.data.name, this.currentPage);
        this.loadAssociatedUniversities(areaId);
        this.loadAssistances(area.data.name); // Llamar a loadAssistances
      },
      error: (err) => console.error('Error al obtener el área:', err),
    });
  }

  loadAssistances(areaName: string): void {
    this.assistanceService.findAssistancesByArea(areaName, this.currentPage).subscribe({
      next: (response) => {
        // Verificar que la respuesta contiene los datos esperados
        //console.log('Respuesta de asistencias:', response);

        if (response.data) {
          this.assistances = response.data.content;
          this.totalAssistances = response.data.totalElements; // Total de asistencias
          this.totalPages = response.data.totalPages; // Total de páginas
          this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1); // Crear arreglo de páginas

          // Imprimir el total de asistencias en consola
          // console.log('Total de asistencias:', this.totalAssistances);
        }
      },
      error: (err) => {
        // Mostrar error en caso de fallo en la llamada
        console.error('Error al obtener asistencias:', err);
      }
    });
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
            this.router.navigate(['/admin/areas']); // Redirigir a la lista de áreas
          },
          (error: HttpErrorResponse) => {
            // Revisar si el error tiene un mensaje de error desde el backend
            const errorMessage = error?.error?.error || 'No se pudo eliminar el área.';
            // console.error('Error al agregar el administrador', error);
            Swal.fire('Error', errorMessage, 'error');
          }
        );
      }
    });
  }

  loadSupervisor(areaName: string): void {
    this.supervisorService.searchSupervisorsByArea(areaName).subscribe({
      next: (response) => {
        if (response.data.content && response.data.content.length > 0) {
          this.supervisor = response.data.content[0]; // Asume que hay un supervisor por área
        }
      },
      error: (err) => console.error('Error al obtener el supervisor:', err),
    });
  }

  loadActiveInterns(areaName: string, page: number): void {
    this.internService.findInternsByArea(areaName, page, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.activeInterns = response.data.content.filter(
            (intern: Intern) => intern.user.status === true
          );
          this.totalPages = response.data.totalPages; // Total de páginas
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Crea un array de páginas
        } else {
          console.error('No se encontró la propiedad content en la respuesta.');
        }
      },
      error: (err) => console.error('Error al obtener practicantes activos:', err),
    });
  }

  goToPage(page: number): void {
    this.currentPage = page - 1; // Ajusta la página (paginación en Java comienza en 0)
    this.loadActiveInterns(this.area?.name || '', this.currentPage);
  }

  loadAssociatedUniversities(areaId: number): void {
    this.areaUniversityService.getUniversitiesByArea(areaId).subscribe({
      next: (response) => {
        this.universities = response.data.content;
        this.countUniversities();
      },
      error: (err) => console.error('Error al obtener universidades asociadas:', err),
    });
  }

  countUniversities(): void {
    this.universitiesCount = this.universities.length;
  }


}
