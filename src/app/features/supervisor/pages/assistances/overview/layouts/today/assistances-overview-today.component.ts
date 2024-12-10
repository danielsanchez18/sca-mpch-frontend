import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../../../../core/services/assistance.service';

@Component({
  selector: 'assistances-overview-today',
  templateUrl: './assistances-overview-today.component.html',
})
export class SupervisorAssistancesOverviewTodayComponent implements OnInit {

  assistances: any[] = []; // Lista de asistencias
  totalAssistances = 0; // Total de resultados
  pages: number[] = []; // Páginas disponibles
  currentPage = 0; // Página actual
  pageSize = 10; // Tamaño de página
  isLoading = false; // Indicador de carga
  searchName = ''; // Nombre para búsqueda

  constructor(private assistanceService: AssistanceService) {}

  ngOnInit(): void {
    this.loadAssistancesForToday();
  }

  // Cargar asistencias del día de hoy
  loadAssistancesForToday(): void {
    this.isLoading = true;
    const today = new Date(); // Fecha en formato yyyy-MM-dd
    const localDate = today.toLocaleDateString('en-CA');
    this.assistanceService.getAssistancesByDate(localDate, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.assistances = response.data.content || [];
        this.totalAssistances = response.data.totalElements || 0;
        this.pages = Array.from({ length: response.data.totalPages || 0 }, (_, i) => i);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando asistencias:', error);
        this.isLoading = false;
      },
    });
  }

  // Buscar asistencias por nombre de practicante
  searchAssistancesByName(): void {
    if (this.searchName.trim() === '') {
      this.loadAssistancesForToday();
      return;
    }

    this.isLoading = true;
    this.assistanceService.searchAssistancesByInternName(this.searchName, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.assistances = response.data.content || [];
        this.totalAssistances = response.data.totalElements || 0;
        this.pages = Array.from({ length: response.data.totalPages || 0 }, (_, i) => i);
        this.isLoading = false;
      },
      error: (error) => {
        //console.error('Error buscando asistencias:', error);
        this.isLoading = false;
      },
    });
  }

  // Cambiar a una página específica
  goToPage(page: number): void {
    if (page === this.currentPage) {
      return; // Evitar recarga innecesaria
    }

    this.currentPage = page;
    if (this.searchName.trim() === '') {
      this.loadAssistancesForToday();
    } else {
      this.searchAssistancesByName();
    }
  }

}
