import { Product } from './product'

export interface OrderDetail {
  id?: number;
  product: Product;
  quantity: number;
  cost?: number;
  price?: number;
  subtotal?: number;
}
