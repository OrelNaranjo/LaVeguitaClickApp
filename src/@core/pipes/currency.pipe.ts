import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true,
})
export class CurrencyPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any, currencySymbol = '$', space = ' '): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue) || typeof numericValue !== 'number') {
      return '';
    }
    const formattedNumber = numericValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${currencySymbol}${space}${formattedNumber}`;
  }
}
