import { Component } from '@angular/core';
import { TitleService } from '@core/services';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss',
})
export class InvoiceComponent {
  constructor(private titleService: TitleService) {
    this.titleService.setTitle('Facturas');
  }
}
