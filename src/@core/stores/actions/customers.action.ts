import { Customer } from '@shared/interfaces';

export class LoadCustomers {
  static readonly type = '[Customers] Load Customers';
}

export class CreateCustomer {
  static readonly type = '[Customers] Create Customer';
  constructor(public payload: Customer) {}
}

export class UpdateCustomer {
  static readonly type = '[Customers] Update Customer';
  constructor(public payload: Customer) {}
}

export class DeleteCustomer {
  static readonly type = '[Customers] Delete Customer';
  constructor(public payload: number) {}
}
