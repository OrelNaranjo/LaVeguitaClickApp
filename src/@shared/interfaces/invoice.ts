import { InvoiceRequest } from '../../@definitions'
import { Customer } from './customer';
import { Product } from './product'

export interface Invoice {
  id?: number;
  date?: Date | string;
  customer: Customer;
  total: number;
  details: InvoiceDetail[];
}

export interface InvoiceDetail {
  id?: number;
  product: Product;
  quantity: number;
  price: number;
  cost: number;
  subtotal: number;
}

export interface InvoiceStateModel {
  invoices: Invoice[];
}

export interface InvoiceRequestStateModel {
  invoices: InvoiceRequest[];
}
