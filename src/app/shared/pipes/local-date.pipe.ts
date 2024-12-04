import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  transform(value: string): string {
    // Convertir la fecha a UTC
    const date = new Date(value);
    // Asegurarse de que la fecha está en formato UTC y luego formatearla
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

    // Formateamos la fecha como dd/MM/yyyy en UTC
    const day = String(utcDate.getUTCDate()).padStart(2, '0');
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
    const year = utcDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

}
