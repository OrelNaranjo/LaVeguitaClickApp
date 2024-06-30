import { Product } from './product';

export interface InvoiceDetail {
  id: number;
  product: Product;
  quantity: number;
  cost: number;
  price: number;
  subtotal: number;
}

export interface CreateInvoiceDetail {
  product: Product;
  quantity: number;
  cost: number;
  price: number;
  subtotal: number;
}
