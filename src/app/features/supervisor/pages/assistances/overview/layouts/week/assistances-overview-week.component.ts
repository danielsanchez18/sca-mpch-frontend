import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../../../../core/services/assistance.service';

@Component({
  selector: 'assistances-overview-week',
  templateUrl: './assistances-overview-week.component.html',
})
export class SupervisorAssistancesOverviewWeekComponent implements OnInit {

  assistances: any[] = [];
  totalAssistances = 0;
  pages: number[] = [];
  currentPage = 0;
  pageSize = 10;
  isLoading = false;
  searchName = '';
  startDate!: string;
  endDate!: string;

  constructor(private assistanceService: AssistanceService) {}

  ngOnInit(): void {
    this.calculateCurrentWeek();
    this.loadWeeklyAssistances();
  }

  calculateCurrentWeek(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Obtener el lunes de la semana
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);

    // Obtener el domingo de la semana
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    // Función para formatear las fechas a yyyy-MM-dd
    const formatDate = (date: Date) => date.toLocaleDateString('en-CA'); // Formato yyyy-MM-dd

    this.startDate = formatDate(monday);
    this.endDate = formatDate(sunday);
}


  loadWeeklyAssistances(): void {
    this.isLoading = true;
    this.assistanceService.getAssistancesByDateRange(this.startDate, this.endDate, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.assistances = response.data.content || [];
        this.totalAssistances = response.data.totalElements || 0;
        this.pages = Array.from({ length: response.data.totalPages || 0 }, (_, i) => i);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando asistencias semanales:', error);
        this.isLoading = false;
      },
    });
  }

  searchAssistancesByName(): void {
    if (this.searchName.trim() === '') {
      this.loadWeeklyAssistances();
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
        console.error('Error buscando asistencias:', error);
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page === this.currentPage) {
      return;
    }

    this.currentPage = page;
    if (this.searchName.trim() === '') {
      this.loadWeeklyAssistances();
    } else {
      this.searchAssistancesByName();
    }
  }

}
