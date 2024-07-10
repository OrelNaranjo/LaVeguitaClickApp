import { Invoice } from '@shared/interfaces';

export class LoadInvoices {
  static readonly type = '[Products] Load Products';
  constructor(public force = false) {}
}

export class CreateInvoice {
  static readonly type = '[Invoices] Create Invoice';
  constructor(public payload: Invoice) {}
}

export class SelectInvoice {
  static readonly type = '[Invoice] Select';
  constructor(public id: number) {}
}
