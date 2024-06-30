import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Invoice } from '@shared/interfaces';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NzTableComponent, NzButtonComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];

  ngOnInit(): void {
    // Cargar las facturas de ejemplo
    this.invoices = [];
  }

  viewInvoice(invoice: Invoice): void {
    // Lógica para ver la factura
    console.log('Ver factura', invoice);
  }

  editInvoice(invoice: Invoice): void {
    // Lógica para editar la factura
    console.log('Editar factura', invoice);
  }

  deleteInvoice(invoice: Invoice): void {
    // Lógica para eliminar la factura
    this.invoices = this.invoices.filter((i) => i.id !== invoice.id);
    console.log('Eliminar factura', invoice);
  }
}
