import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number, currencySymbol = '$', space = ' '): string {
    const formattedNumber = value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${currencySymbol}${space}${formattedNumber}`;
  }
}
