import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../../../core/services/assistance.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'assistances-register',
  templateUrl: './assistances-register.component.html',
})
export class AssistancesRegisterComponent implements OnInit {

  currentTime: string = ''; // Para almacenar la hora actual
  dni: string = ''; // Para almacenar el DNI ingresado

  constructor(
    private assistanceService: AssistanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateTime(); // Inicia la actualización de la hora
  }

  // Función para actualizar la hora en tiempo real
  updateTime(): void {
    setInterval(() => {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const time = new Date().toLocaleString('es-PE', options);
      this.currentTime = time;
    }, 1000); // Actualiza cada segundo
  }

  // Función para registrar la entrada
  registerCheckIn(): void {
    if (!this.dni) {
      Swal.fire('Error', 'Por favor ingresa el DNI del practicante.', 'error');
      return;
    }
    this.assistanceService.registerCheckIn(this.dni).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Entrada registrada correctamente.', 'success');
        this.router.navigate(['/admin/asistencias']);
      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo registrar la asistencia.';
        // console.error('Error al agregar el universidad', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

  // Función para registrar la salida
  registerCheckOut(): void {
    if (!this.dni) {
      Swal.fire('Error', 'Por favor ingresa el DNI del practicante.', 'error');
      return;
    }
    this.assistanceService.registerCheckOut(this.dni).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Salida registrada correctamente.', 'success');
        this.router.navigate(['/admin/asistencias']);

      },
      (error: HttpErrorResponse) => {
        // Revisar si el error tiene un mensaje de error desde el backend
        const errorMessage = error?.error?.error || 'No se pudo registrar la salida.';
        // console.error('Error al agregar el universidad', error);
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }

}
