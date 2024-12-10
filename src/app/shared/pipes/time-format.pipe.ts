import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'TimeFormat',
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    // console.log('Original value:', value);

    // Si el valor no existe, devolver vacío
    if (!value) return '';

    // Limpiar las fracciones de segundo (después de la primera 'T') para obtener solo la hora
    const cleanedValue = value.split('.')[0]; // Esto elimina los milisegundos
    const date = new Date(cleanedValue);  // Crear un objeto Date

    // console.log('Parsed date:', date);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return ''; // Si la fecha no es válida, devolver vacío
    }

    // Obtener las horas y minutos en hora local
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Devolver el formato HH:mm
    return `${hours}:${minutes}`;
  }


}
