import { Category } from './category';
import { Product } from './product';

export interface Image {
  id: number;
  url: string;
  alt: string;
  product: Product;
  category: Category;
}
