import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../core/services/assistance.service';
import { AreaService } from '../../../../core/services/area.service';
import { UniversityService } from '../../../../core/services/university.service';
import { InternService } from '../../../../core/services/intern.service';

@Component({
  selector: 'admin-overview-page',
  templateUrl: './overview-page.component.html',
})
export class AdminOverviewPageComponent implements OnInit {

  // Variables para almacenar los datos
  todaysAttendances: number = 0;
  weeklyAttendances: number = 0;
  monthlyAttendances: number = 0;
  areasCount: number = 0;
  universitiesCount: number = 0;
  internsCount: number = 0;
  rangeAttendances: any[] = [];

  // Variables para los porcentajes
  todaysAttendancePercentage: number = 0;
  weeklyAttendancePercentage: number = 0;
  monthlyAttendancePercentage: number = 0;

  constructor(
    private assistanceService: AssistanceService,
    private areaService: AreaService, // Asegúrate de tener un servicio que devuelva el conteo de áreas
    private universityService: UniversityService,
    private internService: InternService // Para obtener los practicantes
  ) { }

  ngOnInit(): void {
    this.getAreaData();
    this.getUniversityData();
    this.getInternData();
    this.getTodaysAttendances();
    this.getWeeklyAttendances();
    this.getMonthlyAttendances();
  }

  // Obtener las áreas (aquí debemos definir cómo lo obtendremos)
  getAreaData(): void {
    this.areaService.getTotalAreas().subscribe(data => {
      this.areasCount = data;
    });
  }

  // Obtener el conteo de universidades
  getUniversityData(): void {
    this.universityService.getTotalUniversities().subscribe(data => {
      this.universitiesCount = data;
    });
  }

  // Obetener el conteo de practicantes
  getInternData(): void {
    this.internService.getTotalInterns().subscribe(data => {
      this.internsCount = data;
    });
  }

  // Obtener las asistencias de hoy
  getTodaysAttendances(): void {
    const today = new Date().toISOString().split('T')[0]; // Obtener solo la fecha
    this.assistanceService.getAssistancesByDate(today).subscribe(
      response => {
        console.log('Response de asistencias de hoy:', response);
        this.todaysAttendances = response.data.totalElements; // Total de asistencias
        this.calculateTodaysAttendancePercentage();
      },
      error => {
        console.error('Error fetching todays attendances', error);
      }
    );
  }

  // Obtener las asistencias de la semana
  getWeeklyAttendances(): void {
    const startOfWeek = this.getStartOfWeek();
    const endOfWeek = new Date().toISOString().split('T')[0]; // Fecha actual
    this.assistanceService.getAssistancesByDateRange(startOfWeek, endOfWeek).subscribe(
      response => {
        console.log('Response de asistencias de la semana:', response);
        this.weeklyAttendances = response.data.totalElements; // Total de asistencias de la semana
        this.calculateWeeklyAttendancePercentage();
      },
      error => {
        console.error('Error fetching weekly attendances', error);
      }
    );
  }

  // Obtener las asistencias del mes
  getMonthlyAttendances(): void {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date().toISOString().split('T')[0]; // Fecha actual
    this.assistanceService.getAssistancesByDateRange(startOfMonth, endOfMonth).subscribe(
      response => {
        console.log('Response de asistencias del mes:', response);
        this.monthlyAttendances = response.data.totalElements; // Total de asistencias del mes
        this.calculateMonthlyAttendancePercentage();
      },
      error => {
        console.error('Error fetching monthly attendances', error);
      }
    );
  }

  // Método para obtener el inicio de la semana (el lunes de la semana actual)
  getStartOfWeek(): string {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);  // Ajuste para el lunes
    date.setDate(diff);
    return date.toISOString().split('T')[0]; // Devuelve la fecha como 'YYYY-MM-DD'
  }

  // Calcular el porcentaje de asistencia de hoy
  calculateTodaysAttendancePercentage(): void {
    if (this.internsCount > 0) {
      this.todaysAttendancePercentage = (this.todaysAttendances / this.internsCount) * 100;
    } else {
      this.todaysAttendancePercentage = 0;
    }
  }

  // Calcular el porcentaje de asistencia de la semana
  calculateWeeklyAttendancePercentage(): void {
    if (this.internsCount > 0) {
      this.weeklyAttendancePercentage = (this.weeklyAttendances / this.internsCount) * 100;
    } else {
      this.weeklyAttendancePercentage = 0;
    }
  }

  // Calcular el porcentaje de asistencia del mes
  calculateMonthlyAttendancePercentage(): void {
    if (this.internsCount > 0) {
      this.monthlyAttendancePercentage = (this.monthlyAttendances / this.internsCount) * 100;
    } else {
      this.monthlyAttendancePercentage = 0;
    }
  }

}
