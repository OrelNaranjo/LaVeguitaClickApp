import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleService } from '@core/services';
import { CurrencyPipe } from '@core/pipes';
import { Order } from '@shared/interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { DeleteOrder, LoadOrders } from '@core/stores';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, NzIconDirective, DatePipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  orders$: Signal<Order[]>;

  constructor(
    private store: Store,
    private titleService: TitleService,
  ) {
    this.titleService.setTitle('Lista de pedidos');
    this.store.dispatch(new LoadOrders());
    this.orders$ = toSignal(this.store.select((state) => state.orders.orders));
  }

  deleteOrder(order: Order) {
    this.store.dispatch(new DeleteOrder(order));
  }
}
