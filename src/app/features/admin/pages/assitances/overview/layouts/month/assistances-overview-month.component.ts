import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../../../../core/services/assistance.service';

@Component({
  selector: 'assistances-overview-month',
  templateUrl: './assistances-overview-month.component.html',
})
export class AssistancesOverviewMonthComponent implements OnInit {

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
    this.calculateCurrentMonth();
    this.loadMonthlyAssistances();
  }

  calculateCurrentMonth(): void {
    const today = new Date();

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.endDate = lastDay.toISOString().split('T')[0];

  }

  loadMonthlyAssistances(): void {
    this.isLoading = true;
    this.assistanceService.getAssistancesByDateRange(this.startDate, this.endDate, this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.assistances = response.data.content || [];
        this.totalAssistances = response.data.totalElements || 0;
        this.pages = Array.from({ length: response.data.totalPages || 0 }, (_, i) => i);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando asistencias mensuales:', error);
        this.isLoading = false;
      },
    });
  }

  searchAssistancesByName(): void {
    if (this.searchName.trim() === '') {
      this.loadMonthlyAssistances();
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
      this.loadMonthlyAssistances();
    } else {
      this.searchAssistancesByName();
    }
  }

}
