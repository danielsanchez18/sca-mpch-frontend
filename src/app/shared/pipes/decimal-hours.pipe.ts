import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'DecimalHours',
})
export class DecimalHoursPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '0.00';
    return value.toFixed(2);  // Redondea a dos decimales
  }

}
