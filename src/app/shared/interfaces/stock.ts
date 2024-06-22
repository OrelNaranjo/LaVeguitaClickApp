import { Product } from './product';
import { Warehouse } from './warehouse';

export interface Stock {
  id: number;
  stock: number;
  min_stock: number;
  max_stock: number;
  warehouse: Warehouse;
  product: Product;
}
