import { InvoiceRequest } from '@definitions/requests'

export class LoadInvoices {
  static readonly type = '[Products] Load Products';
  constructor(public force = false) {}
}

export class CreateInvoice {
  static readonly type = '[Invoices] Create Invoice';
  constructor(public payload: InvoiceRequest) {}
}
