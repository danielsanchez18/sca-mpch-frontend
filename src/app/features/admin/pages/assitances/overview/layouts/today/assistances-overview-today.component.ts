import { Component } from '@angular/core';
import { AssistanceService } from '../../../../../../../core/services/assistance.service';

@Component({
  selector: 'assistances-overview-today',
  templateUrl: './assistances-overview-today.component.html',
})
export class AssistancesOverviewTodayComponent {

  assistances: any[] = [];
  totalAssistances: number = 0;
  page: number = 0;
  size: number = 10;
  pages: number[] = [];
  currentPage: number = 1;
  searchName: string = '';
  isLoading: boolean = true;
  currentDate: string = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

  constructor(
    private assistanceService: AssistanceService
  ) { }

  ngOnInit(): void {
    this.getAssistances(); // Obtener las asistencias de hoy al iniciar el componente
  }

  // Método para obtener las asistencias del día actual
  getAssistances(): void {
    this.isLoading = true;
    this.assistanceService.getAssistancesByDate(this.currentDate, this.page, this.size).subscribe(
      response => {
        this.assistances = response.data.content;
        this.totalAssistances = response.data.totalElements;
        this.setPagination();
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener asistencias', error);
        this.isLoading = false;
      }
    );
  }

  // Método para buscar asistencias por nombre de practicante
  searchAssistancesByName(): void {
    if (this.searchName.trim() === '') {
      this.getAssistances();
    } else {
      this.isLoading = true;
      this.assistanceService.searchAssistancesByInternName(this.searchName, this.page, this.size).subscribe(
        response => {
          this.assistances = response.data.content;
          this.totalAssistances = response.data.totalElements;
          this.setPagination();
          this.isLoading = false;
        },
        error => {
          console.error('Error al buscar asistencias', error);
          this.isLoading = false;
        }
      );
    }
  }

  // Método para establecer la paginación
  setPagination(): void {
    this.pages = Array.from({ length: Math.ceil(this.totalAssistances / this.size) }, (_, i) => i + 1);
  }

  // Método para ir a una página específica
  goToPage(page: number): void {
    this.page = page - 1;
    this.currentPage = page;
    this.getAssistances();
  }
}
