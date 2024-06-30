import { Customer } from './customer';
import { CreateInvoiceDetail, InvoiceDetail } from './invoice-detail';

export interface Invoice {
  id: number;
  customer: Customer;
  date: Date;
  total: number;
  details: InvoiceDetail[];
}

export interface CreateInvoice {
  customer: Customer;
  date: Date;
  total: number;
  details: CreateInvoiceDetail[];
}
