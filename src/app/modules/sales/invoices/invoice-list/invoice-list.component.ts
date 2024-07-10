import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Invoice } from '@shared/interfaces';
import { TitleService } from '@core/services';
import { Store } from '@ngxs/store';
import { LoadInvoices } from '@core/stores';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { NzColDirective, NzGridModule, NzRowDirective } from 'ng-zorro-antd/grid';
import { CurrencyPipe } from '../../../../../@core/pipes';
import { SelectInvoice } from '../../../../../@core/stores/actions/invoices.action';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    RouterLink,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    NzTableComponent,
    NzButtonComponent,
    MatIconModule,
    NzGridModule,
    NzRowDirective,
    NzColDirective,
    NgIf,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
  invoices$: Signal<Invoice[]>;

  constructor(
    private titleService: TitleService,
    private store: Store,
    private router: Router,
  ) {
    this.titleService.setTitle('Lista de Facturas');
    this.store.dispatch(new LoadInvoices());
    this.invoices$ = toSignal(this.store.select((state) => state.invoices.invoices));
  }

  navigateToDetail(id: number): void {
    this.store.dispatch(new SelectInvoice(id));
    this.router.navigate(['sales/invoices', id]);
  }
}
