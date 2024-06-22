import { Product } from './product';

export interface PackageType {
  id: number;
  name: string;
  created: Date;
  modified: Date;
  products: Product[];
}
