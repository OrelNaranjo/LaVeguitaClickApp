import { TitleService } from '@core/services';
import { Component, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { Customer } from '@shared/interfaces';
import { LoadCustomers } from '@core/stores/actions';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  customers$!: Signal<Customer[]>;

  constructor(
    private titleService: TitleService,
    private store: Store,
  ) {
    this.titleService.setTitle('Lista de Clientes');
    this.store.dispatch(new LoadCustomers());
    this.customers$ = toSignal(this.store.select((state) => state.customers.customers));
  }

  editCustomer(customer: Customer) {
    console.log('edit customer', customer);
  }
}
