import { Order } from '@shared/interfaces'
import { OrderRequest } from '../../../@definitions/requests/order-request'

export class LoadOrders{
  static readonly type = '[Orders] Load Orders';
  constructor(public force = false) {}
}

export class CreateOrder {
  static readonly type = '[Orders] Create Order';
  constructor(public payload: OrderRequest) {}
}

export class UpdateOrder {
  static readonly type = '[Orders] Update Order';
  constructor(public payload: Order) {}
}

export class DeleteOrder {
  static readonly type = '[Orders] Delete Order';
  constructor(public payload: Order) {}
}
