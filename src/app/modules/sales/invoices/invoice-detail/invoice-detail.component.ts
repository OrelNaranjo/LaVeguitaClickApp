import { Component, Signal } from '@angular/core';
import { CurrencyPipe, LoadInvoices } from '../../../../../@core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { DatePipe, NgIf } from '@angular/common';
import { Store } from '@ngxs/store';
import { Invoice } from '../../../../../@shared';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CurrencyPipe, NzCardComponent, NzTableComponent, NgIf, DatePipe, RouterLink],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss',
})
export class InvoiceDetailComponent {
  invoice$: Signal<Invoice>;

  constructor(private store: Store) {
    this.store.dispatch(new LoadInvoices());
    this.invoice$ = toSignal(this.store.select((state) => state.invoices.selectedInvoice));
  }
}
