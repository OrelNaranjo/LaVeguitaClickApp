import { Product } from './product';

export interface ReceiptDetail {
  id: number;
  product: Product;
  quantity: number;
  cost: number;
  price: number;
  subtotal: number;
}
