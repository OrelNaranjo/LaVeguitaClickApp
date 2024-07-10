import { Injectable } from '@angular/core';
import { OrderService } from '@core/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadOrders, CreateOrder, UpdateOrder, DeleteOrder } from '../actions';
import { tap } from 'rxjs/operators';
import { Order, OrderStateModel } from '@shared/interfaces';
import { OrderRequest } from '../../../@definitions/requests/order-request'

@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: [],
  },
})
@Injectable()
export class OrdersState {
  constructor(private orderService: OrderService) {}

  @Selector()
  static getOrders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(LoadOrders)
  loadOrders(ctx: StateContext<OrderStateModel>) {
    console.log('Loading orders');
    const state = ctx.getState();
    if (state.orders.length > 0) {
      return;
    }
    return this.orderService.getOrders().pipe(
      tap((response: Order) => {
        if (Array.isArray(response) && response.length > 0) {
          ctx.patchState({
            orders: response,
          });
        }
        console.log('Orders loaded', response);
      }),
    );
  }

  @Action(CreateOrder)
  createOrder(ctx: StateContext<OrderStateModel>, action: CreateOrder) {
    return this.orderService.createOrder(action.payload).pipe(
      tap((response: OrderRequest) => {
        const order: Order = {
          id: 0,
          ...response,
        };
        ctx.patchState({
          orders: [...ctx.getState().orders, order],
        });
      }),
    );
  }

  @Action(UpdateOrder)
  updateOrder(ctx: StateContext<OrderStateModel>, action: UpdateOrder) {
    return this.orderService.updateOrder(action.payload).pipe(
      tap((response: Order) => {
        ctx.patchState({
          orders: ctx.getState().orders.map((order) => {
            if (order.id === response.id) {
              return response;
            }
            return order;
          }),
        });
      }),
    );
  }

  @Action(DeleteOrder)
  deleteOrder(ctx: StateContext<OrderStateModel>, action: DeleteOrder) {
    return this.orderService.deleteOrder(action.payload.id).pipe(
      tap(() => {
        ctx.patchState({
          orders: ctx.getState().orders.filter((order) => order.id !== action.payload.id),
        });
      }),
    );
  }
}
